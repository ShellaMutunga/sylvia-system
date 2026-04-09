<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnimalProduction extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id', 'production_type', 'quantity', 'unit',
        'recorded_at', 'quality_grade', 'notes',
    ];

    protected $casts = [
        'recorded_at' => 'date',
        'quantity'    => 'decimal:2',
    ];

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}
