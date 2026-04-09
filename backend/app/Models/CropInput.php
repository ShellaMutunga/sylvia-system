<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CropInput extends Model
{
    use HasFactory;

    protected $fillable = [
        'crop_season_id', 'input_type', 'product_name',
        'quantity_used', 'unit', 'cost', 'applied_at', 'applied_by',
    ];

    protected $casts = [
        'applied_at'    => 'date',
        'quantity_used' => 'decimal:2',
        'cost'          => 'decimal:2',
    ];

    public function cropSeason()
    {
        return $this->belongsTo(CropSeason::class);
    }

    public function appliedBy()
    {
        return $this->belongsTo(User::class, 'applied_by');
    }
}
