<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Farm extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'location', 'total_area', 'established_at', 'description', 'contact_info',
    ];

    protected $casts = [
        'established_at' => 'date',
        'total_area'     => 'decimal:2',
    ];

    public function fields()
    {
        return $this->hasMany(Field::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
