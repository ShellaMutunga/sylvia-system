<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishHarvestRecord;
use Illuminate\Http\Request;

class FishHarvestController extends Controller
{
    public function index(Request $request)
    {
        $query = FishHarvestRecord::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        return response()->json($query->latest('harvest_date')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'          => 'required|exists:animal_groups,id',
            'harvest_date'     => 'required|date',
            'species'          => 'required|string|max:100',
            'fish_count'       => 'required|integer|min:1',
            'total_biomass_kg' => 'required|numeric|min:0',
            'avg_weight_kg'    => 'required|numeric|min:0',
            'survival_rate'    => 'nullable|numeric|min:0|max:100',
            'notes'            => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(FishHarvestRecord::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function show(FishHarvestRecord $fishHarvestRecord)
    {
        return response()->json($fishHarvestRecord->load('pond', 'recordedBy'));
    }

    public function destroy(FishHarvestRecord $fishHarvestRecord)
    {
        $fishHarvestRecord->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
