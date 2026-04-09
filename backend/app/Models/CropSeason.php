<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CropSeason extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_id', 'crop_type_id', 'planted_at', 'expected_harvest_at',
        'actual_harvest_at', 'area_planted', 'seed_quantity_used', 'status', 'notes',
    ];

    protected $casts = [
        'planted_at'          => 'date',
        'expected_harvest_at' => 'date',
        'actual_harvest_at'   => 'date',
        'area_planted'        => 'decimal:2',
        'seed_quantity_used'  => 'decimal:2',
    ];

    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function cropType()
    {
        return $this->belongsTo(CropType::class);
    }

    public function activities()
    {
        return $this->hasMany(CropActivity::class);
    }

    public function harvests()
    {
        return $this->hasMany(CropHarvest::class);
    }

    public function inputs()
    {
        return $this->hasMany(CropInput::class);
    }
}
