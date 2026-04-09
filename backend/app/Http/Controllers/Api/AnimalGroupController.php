<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnimalGroup;
use Illuminate\Http\Request;

class AnimalGroupController extends Controller
{
    public function index(Request $request)
    {
        $query = AnimalGroup::with('species', 'zone');

        if ($request->has('species_id')) {
            $query->where('animal_species_id', $request->species_id);
        }

        return response()->json($query->withCount('animals')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'              => 'required|string|max:255',
            'animal_species_id' => 'required|exists:animal_species,id',
            'zone_id'           => 'nullable|exists:zones,id',
            'description'       => 'nullable|string',
        ]);

        return response()->json(AnimalGroup::create($data)->load('species', 'zone'), 201);
    }

    public function show(AnimalGroup $animalGroup)
    {
        return response()->json($animalGroup->load('species', 'zone', 'animals'));
    }

    public function update(Request $request, AnimalGroup $animalGroup)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'zone_id'     => 'nullable|exists:zones,id',
            'description' => 'nullable|string',
        ]);

        $animalGroup->update($data);
        return response()->json($animalGroup->load('species', 'zone'));
    }

    public function destroy(AnimalGroup $animalGroup)
    {
        $animalGroup->delete();
        return response()->json(['message' => 'Group deleted.']);
    }
}
