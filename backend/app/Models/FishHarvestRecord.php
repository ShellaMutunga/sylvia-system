<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FishHarvestRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'harvest_date', 'species', 'fish_count',
        'total_biomass_kg', 'avg_weight_kg', 'survival_rate', 'recorded_by', 'notes',
    ];

    protected $casts = ['harvest_date' => 'date', 'total_biomass_kg' => 'decimal:2', 'avg_weight_kg' => 'decimal:3', 'survival_rate' => 'decimal:2'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
