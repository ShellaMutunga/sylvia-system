<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CropHarvest extends Model
{
    use HasFactory;

    protected $fillable = [
        'crop_season_id', 'quantity', 'unit', 'quality_grade',
        'storage_location', 'harvest_date', 'notes',
    ];

    protected $casts = [
        'harvest_date' => 'date',
        'quantity'     => 'decimal:2',
    ];

    public function cropSeason()
    {
        return $this->belongsTo(CropSeason::class);
    }
}
