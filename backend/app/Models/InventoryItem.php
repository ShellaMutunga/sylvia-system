<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'inventory_category_id', 'warehouse_id', 'name', 'sku',
        'unit', 'quantity', 'min_stock_level', 'unit_price', 'expiry_date', 'notes',
    ];

    protected $casts = [
        'quantity'        => 'decimal:2',
        'min_stock_level' => 'decimal:2',
        'unit_price'      => 'decimal:2',
        'expiry_date'     => 'date',
    ];

    public function category()
    {
        return $this->belongsTo(InventoryCategory::class, 'inventory_category_id');
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function isLowStock(): bool
    {
        return $this->quantity <= $this->min_stock_level;
    }
}
