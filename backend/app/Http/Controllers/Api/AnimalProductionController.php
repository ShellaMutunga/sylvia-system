<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animal;
use App\Models\AnimalProduction;
use Illuminate\Http\Request;

class AnimalProductionController extends Controller
{
    public function index(Animal $animal)
    {
        return response()->json(
            $animal->productions()->latest('recorded_at')->get()
        );
    }

    public function store(Request $request, Animal $animal)
    {
        $data = $request->validate([
            'production_type' => 'required|in:milk,eggs,wool,honey,meat,other',
            'quantity'        => 'required|numeric|min:0',
            'unit'            => 'required|string|max:20',
            'recorded_at'     => 'required|date',
            'quality_grade'   => 'nullable|string|max:10',
            'notes'           => 'nullable|string',
        ]);

        $data['animal_id'] = $animal->id;

        $production = AnimalProduction::create($data);
        return response()->json($production, 201);
    }
}
