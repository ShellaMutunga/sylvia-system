<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FishSalesRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'sale_date', 'buyer_name', 'buyer_contact', 'species',
        'fish_count', 'total_weight_kg', 'price_per_kg', 'recorded_by', 'notes',
    ];

    protected $casts = ['sale_date' => 'date', 'total_weight_kg' => 'decimal:2', 'price_per_kg' => 'decimal:2', 'total_amount' => 'decimal:2'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
