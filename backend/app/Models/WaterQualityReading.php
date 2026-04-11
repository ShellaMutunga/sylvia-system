<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WaterQualityReading extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'recorded_at', 'dissolved_oxygen', 'temperature_c',
        'ph_level', 'ammonia', 'nitrite', 'turbidity', 'recorded_by', 'notes',
    ];

    protected $casts = ['recorded_at' => 'datetime'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
