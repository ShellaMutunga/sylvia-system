<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WaterExchangeRecord;
use Illuminate\Http\Request;

class WaterExchangeController extends Controller
{
    public function index(Request $request)
    {
        $query = WaterExchangeRecord::with('pond', 'recordedBy');
        if ($request->pond_id) $query->where('pond_id', $request->pond_id);
        return response()->json($query->latest('date')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'pond_id'              => 'required|exists:animal_groups,id',
            'date'                 => 'required|date',
            'volume_in_liters'     => 'nullable|numeric|min:0',
            'volume_out_liters'    => 'nullable|numeric|min:0',
            'treatment_applied'    => 'nullable|string|max:255',
            'treatment_quantity'   => 'nullable|numeric|min:0',
            'treatment_unit'       => 'nullable|string|max:20',
            'notes'                => 'nullable|string',
        ]);
        $data['recorded_by'] = $request->user()->id;
        return response()->json(WaterExchangeRecord::create($data)->load('pond', 'recordedBy'), 201);
    }

    public function destroy(WaterExchangeRecord $waterExchangeRecord)
    {
        $waterExchangeRecord->delete();
        return response()->json(['message' => 'Deleted.']);
    }
}
