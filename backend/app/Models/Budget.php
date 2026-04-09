<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Budget extends Model
{
    use HasFactory;

    protected $fillable = [
        'module', 'period', 'year', 'month', 'amount', 'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];
}
