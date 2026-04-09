<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnimalGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'animal_species_id', 'zone_id', 'description',
    ];

    public function species()
    {
        return $this->belongsTo(AnimalSpecies::class, 'animal_species_id');
    }

    public function zone()
    {
        return $this->belongsTo(Zone::class);
    }

    public function animals()
    {
        return $this->hasMany(Animal::class);
    }
}
