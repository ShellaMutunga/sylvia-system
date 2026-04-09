<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderItem;
use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = PurchaseOrder::with('supplier', 'orderedBy', 'items.inventoryItem');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'supplier_id' => 'required|exists:suppliers,id',
            'expected_at' => 'nullable|date',
            'notes'       => 'nullable|string',
            'items'       => 'required|array|min:1',
            'items.*.inventory_item_id' => 'required|exists:inventory_items,id',
            'items.*.quantity'          => 'required|numeric|min:0.01',
            'items.*.unit_price'        => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($data, $request, &$order) {
            $total = collect($data['items'])->sum(fn($i) => $i['quantity'] * $i['unit_price']);

            $order = PurchaseOrder::create([
                'supplier_id'  => $data['supplier_id'],
                'ordered_by'   => $request->user()->id,
                'expected_at'  => $data['expected_at'] ?? null,
                'notes'        => $data['notes'] ?? null,
                'total_amount' => $total,
                'status'       => 'draft',
            ]);

            foreach ($data['items'] as $item) {
                PurchaseOrderItem::create([
                    'purchase_order_id' => $order->id,
                    'inventory_item_id' => $item['inventory_item_id'],
                    'quantity'          => $item['quantity'],
                    'unit_price'        => $item['unit_price'],
                ]);
            }
        });

        return response()->json($order->load('supplier', 'items.inventoryItem', 'orderedBy'), 201);
    }

    public function show(PurchaseOrder $purchaseOrder)
    {
        return response()->json($purchaseOrder->load('supplier', 'orderedBy', 'approvedBy', 'items.inventoryItem'));
    }

    public function approve(Request $request, PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->update([
            'status'      => 'approved',
            'approved_by' => $request->user()->id,
        ]);
        return response()->json($purchaseOrder->load('supplier', 'approvedBy'));
    }

    public function deliver(Request $request, PurchaseOrder $purchaseOrder)
    {
        DB::transaction(function () use ($purchaseOrder) {
            $purchaseOrder->update([
                'status'       => 'delivered',
                'delivered_at' => now(),
            ]);

            // Auto-update stock quantities
            foreach ($purchaseOrder->items as $item) {
                $item->inventoryItem->increment('quantity', $item->quantity);
            }
        });

        return response()->json($purchaseOrder->load('supplier', 'items.inventoryItem'));
    }

    public function cancel(PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->update(['status' => 'cancelled']);
        return response()->json($purchaseOrder);
    }
}
