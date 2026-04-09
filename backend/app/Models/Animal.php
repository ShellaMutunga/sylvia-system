<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Animal extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag_number', 'animal_species_id', 'animal_group_id', 'zone_id',
        'name', 'sex', 'dob', 'weight', 'breed', 'status',
        'purchase_price', 'purchased_at', 'notes',
    ];

    protected $casts = [
        'dob'            => 'date',
        'purchased_at'   => 'date',
        'weight'         => 'decimal:2',
        'purchase_price' => 'decimal:2',
    ];

    public function species()
    {
        return $this->belongsTo(AnimalSpecies::class, 'animal_species_id');
    }

    public function group()
    {
        return $this->belongsTo(AnimalGroup::class, 'animal_group_id');
    }

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function healthRecords()
    {
        return $this->hasMany(AnimalHealthRecord::class);
    }

    public function productions()
    {
        return $this->hasMany(AnimalProduction::class);
    }
}
