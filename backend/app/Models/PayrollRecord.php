<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PayrollRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id', 'month', 'year', 'basic_salary',
        'deductions', 'bonuses', 'status', 'approved_by', 'paid_at', 'notes',
    ];

    protected $casts = [
        'basic_salary' => 'decimal:2',
        'deductions'   => 'decimal:2',
        'bonuses'      => 'decimal:2',
        'net_salary'   => 'decimal:2',
        'paid_at'      => 'datetime',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
