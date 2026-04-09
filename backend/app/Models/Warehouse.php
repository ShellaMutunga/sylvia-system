<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Warehouse extends Model
{
    use HasFactory;

    protected $fillable = [
        'farm_id', 'name', 'location', 'capacity', 'type',
    ];

    protected $casts = [
        'capacity' => 'decimal:2',
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }

    public function items()
    {
        return $this->hasMany(InventoryItem::class);
    }
}
