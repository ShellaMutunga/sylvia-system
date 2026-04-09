<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CropSeason;
use App\Models\CropHarvest;
use Illuminate\Http\Request;

class CropHarvestController extends Controller
{
    public function index(CropSeason $cropSeason)
    {
        return response()->json($cropSeason->harvests()->latest('harvest_date')->get());
    }

    public function store(Request $request, CropSeason $cropSeason)
    {
        $data = $request->validate([
            'quantity'          => 'required|numeric|min:0',
            'unit'              => 'required|string|max:20',
            'quality_grade'     => 'nullable|string|max:10',
            'storage_location'  => 'nullable|string|max:255',
            'harvest_date'      => 'required|date',
            'notes'             => 'nullable|string',
        ]);

        $data['crop_season_id'] = $cropSeason->id;

        $harvest = CropHarvest::create($data);

        // Update season status to harvested
        $cropSeason->update(['status' => 'harvested', 'actual_harvest_at' => $data['harvest_date']]);

        return response()->json($harvest, 201);
    }
}
