<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animal;
use App\Models\AnimalHealthRecord;
use Illuminate\Http\Request;

class AnimalHealthRecordController extends Controller
{
    public function index(Animal $animal)
    {
        return response()->json($animal->healthRecords()->with('vet')->latest('date')->get());
    }

    public function store(Request $request, Animal $animal)
    {
        $data = $request->validate([
            'record_type'    => 'required|in:vaccination,treatment,checkup,deworming,other',
            'date'           => 'required|date',
            'diagnosis'      => 'nullable|string',
            'treatment'      => 'nullable|string',
            'medication'     => 'nullable|string',
            'cost'           => 'nullable|numeric|min:0',
            'next_checkup_at'=> 'nullable|date',
            'notes'          => 'nullable|string',
        ]);

        $data['animal_id'] = $animal->id;
        $data['vet_id']    = $request->user()->id;

        $record = AnimalHealthRecord::create($data);
        return response()->json($record->load('vet'), 201);
    }
}
