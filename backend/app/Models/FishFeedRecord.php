<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FishFeedRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'feed_date', 'feed_type', 'feed_size_mm', 'quantity_kg',
        'feedings_per_day', 'supplementary_feed', 'supplementary_qty_kg',
        'feed_cost', 'recorded_by', 'notes',
    ];

    protected $casts = ['feed_date' => 'date', 'quantity_kg' => 'decimal:2', 'feed_cost' => 'decimal:2'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
