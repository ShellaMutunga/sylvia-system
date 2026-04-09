<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Zone extends Model
{
    use HasFactory;

    protected $fillable = [
        'field_id', 'name', 'type', 'gps_coordinates',
    ];

    public function field()
    {
        return $this->belongsTo(Field::class);
    }

    public function animals()
    {
        return $this->hasMany(Animal::class);
    }

    public function animalGroups()
    {
        return $this->hasMany(AnimalGroup::class);
    }
}
