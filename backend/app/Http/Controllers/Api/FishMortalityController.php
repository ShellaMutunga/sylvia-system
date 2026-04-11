<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishMortalityRecord;
use Illuminate\Http\Request;

class FishMortalityController extends Controller
{
    public function index(Request $request)
    {
        $query = FishMortalityRecord::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        if ($request->from) $query->where('recorded_date', '>=', $request->from);
        if ($request->to)   $query->where('recorded_date', '<=', $request->to);
        return response()->json($query->latest('recorded_date')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'          => 'required|exists:animal_groups,id',
            'recorded_date'    => 'required|date',
            'count'            => 'required|integer|min:1',
            'species'          => 'nullable|string|max:100',
            'probable_cause'   => 'nullable|string|max:255',
            'disease_outbreak' => 'boolean',
            'notes'            => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(FishMortalityRecord::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function show(FishMortalityRecord $fishMortalityRecord)
    {
        return response()->json($fishMortalityRecord->load('pond', 'recordedBy'));
    }

    public function destroy(FishMortalityRecord $fishMortalityRecord)
    {
        $fishMortalityRecord->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
