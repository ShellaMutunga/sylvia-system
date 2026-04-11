<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WaterExchangeRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'pond_id', 'date', 'volume_in_liters', 'volume_out_liters',
        'treatment_applied', 'treatment_quantity', 'treatment_unit', 'recorded_by', 'notes',
    ];

    protected $casts = ['date' => 'date'];

    public function pond() { return $this->belongsTo(AnimalGroup::class, 'pond_id'); }
    public function recordedBy() { return $this->belongsTo(User::class, 'recorded_by'); }
}
