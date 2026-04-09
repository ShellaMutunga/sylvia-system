<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Zone;
use Illuminate\Http\Request;

class ZoneController extends Controller
{
    public function index(Request $request)
    {
        $query = Zone::with('field');

        if ($request->has('field_id')) {
            $query->where('field_id', $request->field_id);
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'field_id'        => 'required|exists:fields,id',
            'name'            => 'required|string|max:255',
            'type'            => 'required|in:crop,animal,mixed',
            'gps_coordinates' => 'nullable|string',
        ]);

        return response()->json(Zone::create($data), 201);
    }

    public function show(Zone $zone)
    {
        return response()->json($zone->load('field', 'animals'));
    }

    public function update(Request $request, Zone $zone)
    {
        $data = $request->validate([
            'name'            => 'sometimes|string|max:255',
            'type'            => 'sometimes|in:crop,animal,mixed',
            'gps_coordinates' => 'nullable|string',
        ]);

        $zone->update($data);
        return response()->json($zone);
    }

    public function destroy(Zone $zone)
    {
        $zone->delete();
        return response()->json(['message' => 'Zone deleted.']);
    }
}
