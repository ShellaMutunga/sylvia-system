<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishFeedRecord;
use Illuminate\Http\Request;

class FishFeedController extends Controller
{
    public function index(Request $request)
    {
        $query = FishFeedRecord::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        if ($request->from)    $query->where('feed_date', '>=', $request->from);
        if ($request->to)      $query->where('feed_date', '<=', $request->to);
        return response()->json($query->latest('feed_date')->paginate(50));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'              => 'required|exists:animal_groups,id',
            'feed_date'            => 'required|date',
            'feed_type'            => 'required|string|max:100',
            'feed_size_mm'         => 'nullable|numeric|min:0',
            'quantity_kg'          => 'required|numeric|min:0',
            'feedings_per_day'     => 'integer|min:1|max:10',
            'supplementary_feed'   => 'nullable|string|max:100',
            'supplementary_qty_kg' => 'nullable|numeric|min:0',
            'feed_cost'            => 'nullable|numeric|min:0',
            'notes'                => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(FishFeedRecord::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function show(FishFeedRecord $fishFeedRecord)
    {
        return response()->json($fishFeedRecord->load('pond', 'recordedBy'));
    }

    public function destroy(FishFeedRecord $fishFeedRecord)
    {
        $fishFeedRecord->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
