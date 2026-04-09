<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CropActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        'crop_season_id', 'activity_type', 'date',
        'workers_involved', 'cost', 'notes', 'recorded_by',
    ];

    protected $casts = [
        'date' => 'date',
        'cost' => 'decimal:2',
    ];

    public function cropSeason()
    {
        return $this->belongsTo(CropSeason::class);
    }

    public function recordedBy()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
