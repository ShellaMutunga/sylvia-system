<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animal;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index(Request $request)
    {
        $query = Animal::with('species', 'group', 'zone');

        if ($request->has('species_id')) {
            $query->where('animal_species_id', $request->species_id);
        }

        if ($request->has('group_id')) {
            $query->where('animal_group_id', $request->group_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->latest()->paginate(50));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'tag_number'        => 'required|string|unique:animals',
            'animal_species_id' => 'required|exists:animal_species,id',
            'animal_group_id'   => 'nullable|exists:animal_groups,id',
            'zone_id'           => 'nullable|exists:zones,id',
            'name'              => 'nullable|string|max:255',
            'sex'               => 'required|in:male,female',
            'dob'               => 'nullable|date',
            'weight'            => 'nullable|numeric|min:0',
            'breed'             => 'nullable|string|max:255',
            'purchase_price'    => 'nullable|numeric|min:0',
            'purchased_at'      => 'nullable|date',
            'notes'             => 'nullable|string',
        ]);

        $data['status'] = 'active';

        return response()->json(Animal::create($data)->load('species', 'group', 'zone'), 201);
    }

    public function show(Animal $animal)
    {
        return response()->json(
            $animal->load('species', 'group', 'zone', 'healthRecords', 'productions')
        );
    }

    public function update(Request $request, Animal $animal)
    {
        $data = $request->validate([
            'animal_group_id' => 'nullable|exists:animal_groups,id',
            'zone_id'         => 'nullable|exists:zones,id',
            'weight'          => 'nullable|numeric|min:0',
            'status'          => 'sometimes|in:active,sold,deceased,transferred',
            'notes'           => 'nullable|string',
        ]);

        $animal->update($data);
        return response()->json($animal->load('species', 'group', 'zone'));
    }

    public function destroy(Animal $animal)
    {
        $animal->delete();
        return response()->json(['message' => 'Animal record deleted.']);
    }
}
