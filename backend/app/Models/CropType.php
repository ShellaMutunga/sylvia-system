<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CropType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'variety', 'category', 'growth_duration_days',
        'planting_density', 'expected_yield_per_ha', 'notes',
    ];

    protected $casts = [
        'expected_yield_per_ha' => 'decimal:2',
    ];

    public function cropSeasons()
    {
        return $this->hasMany(CropSeason::class);
    }
}
