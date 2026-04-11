<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FishStockingRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'stocked_at', 'source', 'species',
        'fingerling_count', 'avg_weight_g', 'purchase_cost', 'recorded_by', 'notes',
    ];

    protected $casts = ['stocked_at' => 'date', 'avg_weight_g' => 'decimal:2', 'purchase_cost' => 'decimal:2'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
