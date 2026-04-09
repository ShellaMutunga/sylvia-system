<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Farm;
use Illuminate\Http\Request;

class FarmController extends Controller
{
    public function index()
    {
        return response()->json(Farm::with('fields')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'           => 'required|string|max:255',
            'location'       => 'required|string',
            'total_area'     => 'required|numeric|min:0',
            'established_at' => 'nullable|date',
            'description'    => 'nullable|string',
            'contact_info'   => 'nullable|string',
        ]);

        return response()->json(Farm::create($data), 201);
    }

    public function show(Farm $farm)
    {
        return response()->json($farm->load('fields.zones'));
    }

    public function update(Request $request, Farm $farm)
    {
        $data = $request->validate([
            'name'           => 'sometimes|string|max:255',
            'location'       => 'sometimes|string',
            'total_area'     => 'sometimes|numeric|min:0',
            'established_at' => 'nullable|date',
            'description'    => 'nullable|string',
            'contact_info'   => 'nullable|string',
        ]);

        $farm->update($data);
        return response()->json($farm);
    }

    public function destroy(Farm $farm)
    {
        $farm->delete();
        return response()->json(['message' => 'Farm deleted.']);
    }
}
