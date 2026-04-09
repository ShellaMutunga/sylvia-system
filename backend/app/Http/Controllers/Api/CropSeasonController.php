<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CropSeason;
use Illuminate\Http\Request;

class CropSeasonController extends Controller
{
    public function index(Request $request)
    {
        $query = CropSeason::with('field', 'cropType');

        if ($request->has('field_id')) {
            $query->where('field_id', $request->field_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'field_id'              => 'required|exists:fields,id',
            'crop_type_id'          => 'required|exists:crop_types,id',
            'planted_at'            => 'required|date',
            'expected_harvest_at'   => 'required|date|after:planted_at',
            'area_planted'          => 'required|numeric|min:0',
            'seed_quantity_used'    => 'nullable|numeric|min:0',
            'status'                => 'sometimes|in:planned,active,harvested,failed',
            'notes'                 => 'nullable|string',
        ]);

        $season = CropSeason::create($data);
        return response()->json($season->load('field', 'cropType'), 201);
    }

    public function show(CropSeason $cropSeason)
    {
        return response()->json(
            $cropSeason->load('field', 'cropType', 'activities', 'harvests', 'inputs')
        );
    }

    public function update(Request $request, CropSeason $cropSeason)
    {
        $data = $request->validate([
            'status'              => 'sometimes|in:planned,active,harvested,failed',
            'actual_harvest_at'   => 'nullable|date',
            'area_planted'        => 'sometimes|numeric|min:0',
            'seed_quantity_used'  => 'nullable|numeric|min:0',
            'notes'               => 'nullable|string',
        ]);

        $cropSeason->update($data);
        return response()->json($cropSeason->load('field', 'cropType'));
    }

    public function destroy(CropSeason $cropSeason)
    {
        $cropSeason->delete();
        return response()->json(['message' => 'Crop season deleted.']);
    }
}
