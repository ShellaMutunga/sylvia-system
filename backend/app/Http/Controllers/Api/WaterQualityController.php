<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WaterQualityReading;
use Illuminate\Http\Request;

class WaterQualityController extends Controller
{
    public function index(Request $request)
    {
        $query = WaterQualityReading::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        if ($request->from)    $query->where('recorded_at', '>=', $request->from);
        if ($request->to)      $query->where('recorded_at', '<=', $request->to . ' 23:59:59');
        return response()->json($query->latest('recorded_at')->paginate(50));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'          => 'required|exists:animal_groups,id',
            'recorded_at'      => 'required|date',
            'dissolved_oxygen' => 'nullable|numeric|min:0',
            'temperature_c'    => 'nullable|numeric',
            'ph_level'         => 'nullable|numeric|min:0|max:14',
            'ammonia'          => 'nullable|numeric|min:0',
            'nitrite'          => 'nullable|numeric|min:0',
            'turbidity'        => 'nullable|numeric|min:0',
            'notes'            => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(WaterQualityReading::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function show(WaterQualityReading $waterQualityReading)
    {
        return response()->json($waterQualityReading->load('pond', 'recordedBy'));
    }

    public function latest(Request $request)
    {
        $readings = WaterQualityReading::with('pond')
            ->when($request->pond_id, fn($q) => $q->where('pond_id', $request->pond_id))
            ->latest('recorded_at')
            ->first();
        return response()->json($readings);
    }

    public function destroy(WaterQualityReading $waterQualityReading)
    {
        $waterQualityReading->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
