<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AnimalSpecies;
use Illuminate\Http\Request;

class AnimalSpeciesController extends Controller
{
    public function index()
    {
        return response()->json(AnimalSpecies::withCount('animals')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'         => 'required|string|max:255',
            'category'     => 'required|in:livestock,poultry,aquatic,other',
            'avg_lifespan' => 'nullable|integer|min:0',
            'notes'        => 'nullable|string',
        ]);

        return response()->json(AnimalSpecies::create($data), 201);
    }

    public function show(AnimalSpecies $animalSpecies)
    {
        return response()->json($animalSpecies->load('animals'));
    }

    public function update(Request $request, AnimalSpecies $animalSpecies)
    {
        $data = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'category'     => 'sometimes|in:livestock,poultry,aquatic,other',
            'avg_lifespan' => 'nullable|integer|min:0',
            'notes'        => 'nullable|string',
        ]);

        $animalSpecies->update($data);
        return response()->json($animalSpecies);
    }

    public function destroy(AnimalSpecies $animalSpecies)
    {
        $animalSpecies->delete();
        return response()->json(['message' => 'Species deleted.']);
    }
}
