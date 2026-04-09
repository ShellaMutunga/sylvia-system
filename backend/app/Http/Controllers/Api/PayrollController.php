<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\PayrollRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PayrollController extends Controller
{
    public function index(Request $request)
    {
        $query = PayrollRecord::with('employee.department', 'approvedBy');

        if ($request->has('month') && $request->has('year')) {
            $query->where('month', $request->month)->where('year', $request->year);
        }

        if ($request->has('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        return response()->json($query->latest()->get());
    }

    // Generate payroll for all active employees for a given month/year
    public function generate(Request $request)
    {
        $data = $request->validate([
            'month' => 'required|integer|between:1,12',
            'year'  => 'required|integer|min:2020',
        ]);

        $employees = Employee::where('status', 'active')->get();
        $created = [];

        DB::transaction(function () use ($employees, $data, &$created) {
            foreach ($employees as $employee) {
                $record = PayrollRecord::firstOrCreate(
                    ['employee_id' => $employee->id, 'month' => $data['month'], 'year' => $data['year']],
                    [
                        'basic_salary' => $employee->base_salary,
                        'deductions'   => 0,
                        'bonuses'      => 0,
                        'status'       => 'draft',
                    ]
                );
                $created[] = $record;
            }
        });

        return response()->json(['generated' => count($created), 'records' => $created]);
    }

    public function update(Request $request, PayrollRecord $payrollRecord)
    {
        $data = $request->validate([
            'basic_salary' => 'sometimes|numeric|min:0',
            'deductions'   => 'sometimes|numeric|min:0',
            'bonuses'      => 'sometimes|numeric|min:0',
            'notes'        => 'nullable|string',
        ]);

        $payrollRecord->update($data);
        return response()->json($payrollRecord->load('employee'));
    }

    public function approve(Request $request, PayrollRecord $payrollRecord)
    {
        $payrollRecord->update([
            'status'      => 'approved',
            'approved_by' => $request->user()->id,
        ]);
        return response()->json($payrollRecord->load('employee', 'approvedBy'));
    }

    public function markPaid(PayrollRecord $payrollRecord)
    {
        $payrollRecord->update(['status' => 'paid', 'paid_at' => now()]);
        return response()->json($payrollRecord->load('employee'));
    }
}
