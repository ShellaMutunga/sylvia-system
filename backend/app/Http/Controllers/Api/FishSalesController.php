<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishSalesRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FishSalesController extends Controller
{
    public function index(Request $request)
    {
        $query = FishSalesRecord::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        if ($request->from)    $query->where('sale_date', '>=', $request->from);
        if ($request->to)      $query->where('sale_date', '<=', $request->to);
        return response()->json($query->latest('sale_date')->paginate(50));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'         => 'required|exists:animal_groups,id',
            'sale_date'       => 'required|date',
            'buyer_name'      => 'required|string|max:255',
            'buyer_contact'   => 'nullable|string|max:100',
            'species'         => 'required|string|max:100',
            'fish_count'      => 'nullable|integer|min:1',
            'total_weight_kg' => 'required|numeric|min:0',
            'price_per_kg'    => 'required|numeric|min:0',
            'notes'           => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(FishSalesRecord::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function show(FishSalesRecord $fishSalesRecord)
    {
        return response()->json($fishSalesRecord->load('pond', 'recordedBy'));
    }

    // P&L summary per pond or overall
    public function summary(Request $request)
    {
        $pondId = $request->pond_id;

        $sales = FishSalesRecord::when($pondId, fn($q) => $q->where('pond_id', $pondId))
            ->selectRaw('SUM(total_amount) as total_revenue, SUM(total_weight_kg) as total_kg, COUNT(*) as sales_count')
            ->first();

        $feedCosts = \App\Models\FishFeedRecord::when($pondId, fn($q) => $q->where('pond_id', $pondId))
            ->sum('feed_cost');

        $stockCosts = \App\Models\FishStockingRecord::when($pondId, fn($q) => $q->where('pond_id', $pondId))
            ->sum('purchase_cost');

        $totalExpenses = $feedCosts + $stockCosts;
        $totalRevenue  = $sales->total_revenue ?? 0;

        return response()->json([
            'total_revenue'   => $totalRevenue,
            'total_expenses'  => $totalExpenses,
            'net_profit'      => $totalRevenue - $totalExpenses,
            'total_kg_sold'   => $sales->total_kg ?? 0,
            'sales_count'     => $sales->sales_count ?? 0,
            'feed_costs'      => $feedCosts,
            'stocking_costs'  => $stockCosts,
        ]);
    }

    public function destroy(FishSalesRecord $fishSalesRecord)
    {
        $fishSalesRecord->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
