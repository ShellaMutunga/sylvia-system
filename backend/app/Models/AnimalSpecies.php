<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnimalSpecies extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'category', 'avg_lifespan', 'notes',
    ];

    public function animals()
    {
        return $this->hasMany(Animal::class);
    }

    public function groups()
    {
        return $this->hasMany(AnimalGroup::class);
    }
}
