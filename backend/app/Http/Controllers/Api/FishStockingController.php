<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishStockingRecord;
use Illuminate\Http\Request;

class FishStockingController extends Controller
{
    public function index(Request $request)
    {
        $query = FishStockingRecord::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        return response()->json($query->latest('stocked_at')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'         => 'required|exists:animal_groups,id',
            'stocked_at'      => 'required|date',
            'source'          => 'required|string|max:255',
            'species'         => 'required|string|max:100',
            'fingerling_count'=> 'required|integer|min:1',
            'avg_weight_g'    => 'nullable|numeric|min:0',
            'purchase_cost'   => 'nullable|numeric|min:0',
            'notes'           => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(FishStockingRecord::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function show(FishStockingRecord $fishStockingRecord)
    {
        return response()->json($fishStockingRecord->load('pond', 'recordedBy'));
    }

    public function destroy(FishStockingRecord $fishStockingRecord)
    {
        $fishStockingRecord->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
