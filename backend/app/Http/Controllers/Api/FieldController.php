<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Field;
use Illuminate\Http\Request;

class FieldController extends Controller
{
    public function index(Request $request)
    {
        $query = Field::with('farm', 'zones');

        if ($request->has('farm_id')) {
            $query->where('farm_id', $request->farm_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'farm_id'          => 'required|exists:farms,id',
            'name'             => 'required|string|max:255',
            'area'             => 'required|numeric|min:0',
            'soil_type'        => 'nullable|string|max:100',
            'irrigation_type'  => 'nullable|string|max:100',
            'status'           => 'sometimes|in:active,fallow,resting',
        ]);

        return response()->json(Field::create($data), 201);
    }

    public function show(Field $field)
    {
        return response()->json($field->load('farm', 'zones', 'cropSeasons.cropType'));
    }

    public function update(Request $request, Field $field)
    {
        $data = $request->validate([
            'name'            => 'sometimes|string|max:255',
            'area'            => 'sometimes|numeric|min:0',
            'soil_type'       => 'nullable|string|max:100',
            'irrigation_type' => 'nullable|string|max:100',
            'status'          => 'sometimes|in:active,fallow,resting',
        ]);

        $field->update($data);
        return response()->json($field);
    }

    public function destroy(Field $field)
    {
        $field->delete();
        return response()->json(['message' => 'Field deleted.']);
    }
}
