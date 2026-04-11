<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FishGrowthSample extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'sampled_at', 'sample_size', 'avg_weight_g',
        'avg_length_cm', 'target_weight_g', 'recorded_by', 'notes',
    ];

    protected $casts = ['sampled_at' => 'date', 'avg_weight_g' => 'decimal:2', 'avg_length_cm' => 'decimal:2', 'target_weight_g' => 'decimal:2'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
