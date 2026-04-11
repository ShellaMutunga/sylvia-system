<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishGrowthSample;
use Illuminate\Http\Request;

class FishGrowthController extends Controller
{
    public function index(Request $request)
    {
        $query = FishGrowthSample::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        return response()->json($query->latest('sampled_at')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'         => 'required|exists:animal_groups,id',
            'sampled_at'      => 'required|date',
            'sample_size'     => 'required|integer|min:1',
            'avg_weight_g'    => 'required|numeric|min:0',
            'avg_length_cm'   => 'nullable|numeric|min:0',
            'target_weight_g' => 'nullable|numeric|min:0',
            'notes'           => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(FishGrowthSample::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function show(FishGrowthSample $fishGrowthSample)
    {
        return response()->json($fishGrowthSample->load('pond', 'recordedBy'));
    }

    public function destroy(FishGrowthSample $fishGrowthSample)
    {
        $fishGrowthSample->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
