<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CropType;
use Illuminate\Http\Request;

class CropTypeController extends Controller
{
    public function index()
    {
        return response()->json(CropType::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'                   => 'required|string|max:255',
            'variety'                => 'nullable|string|max:255',
            'category'               => 'nullable|string|max:100',
            'growth_duration_days'   => 'nullable|integer|min:1',
            'planting_density'       => 'nullable|string|max:100',
            'expected_yield_per_ha'  => 'nullable|numeric|min:0',
            'notes'                  => 'nullable|string',
        ]);

        return response()->json(CropType::create($data), 201);
    }

    public function show(CropType $cropType)
    {
        return response()->json($cropType->load('cropSeasons'));
    }

    public function update(Request $request, CropType $cropType)
    {
        $data = $request->validate([
            'name'                  => 'sometimes|string|max:255',
            'variety'               => 'nullable|string|max:255',
            'category'              => 'nullable|string|max:100',
            'growth_duration_days'  => 'nullable|integer|min:1',
            'planting_density'      => 'nullable|string|max:100',
            'expected_yield_per_ha' => 'nullable|numeric|min:0',
            'notes'                 => 'nullable|string',
        ]);

        $cropType->update($data);
        return response()->json($cropType);
    }

    public function destroy(CropType $cropType)
    {
        $cropType->delete();
        return response()->json(['message' => 'Crop type deleted.']);
    }
}
