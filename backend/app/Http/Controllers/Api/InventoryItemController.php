<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use Illuminate\Http\Request;

class InventoryItemController extends Controller
{
    public function index(Request $request)
    {
        $query = InventoryItem::with('category', 'warehouse');

        if ($request->has('warehouse_id')) {
            $query->where('warehouse_id', $request->warehouse_id);
        }

        if ($request->boolean('low_stock')) {
            $query->whereColumn('quantity', '<=', 'min_stock_level');
        }

        return response()->json($query->get()->map(function ($item) {
            $item->is_low_stock = $item->isLowStock();
            return $item;
        }));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'inventory_category_id' => 'required|exists:inventory_categories,id',
            'warehouse_id'          => 'nullable|exists:warehouses,id',
            'name'                  => 'required|string|max:255',
            'sku'                   => 'nullable|string|max:100|unique:inventory_items',
            'unit'                  => 'required|string|max:30',
            'quantity'              => 'required|numeric|min:0',
            'min_stock_level'       => 'required|numeric|min:0',
            'unit_price'            => 'nullable|numeric|min:0',
            'expiry_date'           => 'nullable|date',
            'notes'                 => 'nullable|string',
        ]);

        return response()->json(InventoryItem::create($data)->load('category', 'warehouse'), 201);
    }

    public function show(InventoryItem $inventoryItem)
    {
        return response()->json($inventoryItem->load('category', 'warehouse'));
    }

    public function update(Request $request, InventoryItem $inventoryItem)
    {
        $data = $request->validate([
            'warehouse_id'    => 'nullable|exists:warehouses,id',
            'name'            => 'sometimes|string|max:255',
            'unit'            => 'sometimes|string|max:30',
            'quantity'        => 'sometimes|numeric|min:0',
            'min_stock_level' => 'sometimes|numeric|min:0',
            'unit_price'      => 'nullable|numeric|min:0',
            'expiry_date'     => 'nullable|date',
            'notes'           => 'nullable|string',
        ]);

        $inventoryItem->update($data);
        return response()->json($inventoryItem->load('category', 'warehouse'));
    }

    public function destroy(InventoryItem $inventoryItem)
    {
        $inventoryItem->delete();
        return response()->json(['message' => 'Item deleted.']);
    }
}
