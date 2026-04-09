<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Field extends Model
{
    use HasFactory;

    protected $fillable = [
        'farm_id', 'name', 'area', 'soil_type', 'irrigation_type', 'status',
    ];

    protected $casts = [
        'area' => 'decimal:2',
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }

    public function zones()
    {
        return $this->hasMany(Zone::class);
    }

    public function cropSeasons()
    {
        return $this->hasMany(CropSeason::class);
    }
}
