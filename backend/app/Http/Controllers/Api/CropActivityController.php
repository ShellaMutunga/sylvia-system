<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CropSeason;
use App\Models\CropActivity;
use Illuminate\Http\Request;

class CropActivityController extends Controller
{
    public function index(CropSeason $cropSeason)
    {
        return response()->json($cropSeason->activities()->with('recordedBy')->latest('date')->get());
    }

    public function store(Request $request, CropSeason $cropSeason)
    {
        $data = $request->validate([
            'activity_type'      => 'required|in:planting,fertilizing,weeding,spraying,irrigation,harvesting,other',
            'date'               => 'required|date',
            'workers_involved'   => 'nullable|integer|min:0',
            'cost'               => 'nullable|numeric|min:0',
            'notes'              => 'nullable|string',
        ]);

        $data['crop_season_id']  = $cropSeason->id;
        $data['recorded_by']     = $request->user()->id;

        $activity = CropActivity::create($data);
        return response()->json($activity->load('recordedBy'), 201);
    }
}
