<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnimalHealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'animal_id', 'record_type', 'date', 'diagnosis',
        'treatment', 'medication', 'cost', 'vet_id', 'next_checkup_at', 'notes',
    ];

    protected $casts = [
        'date'            => 'date',
        'next_checkup_at' => 'date',
        'cost'            => 'decimal:2',
    ];

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    public function vet()
    {
        return $this->belongsTo(User::class, 'vet_id');
    }
}
