<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FishMortalityRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'recorded_date', 'count', 'species',
        'probable_cause', 'disease_outbreak', 'recorded_by', 'notes',
    ];

    protected $casts = ['recorded_date' => 'date', 'disease_outbreak' => 'boolean'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
