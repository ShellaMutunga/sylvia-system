<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with('department');

        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name'       => 'required|string|max:255',
            'last_name'        => 'required|string|max:255',
            'national_id'      => 'required|string|max:20|unique:employees',
            'department_id'    => 'nullable|exists:departments,id',
            'job_title'        => 'required|string|max:255',
            'salary_type'      => 'required|in:monthly,daily,piece_rate',
            'base_salary'      => 'required|numeric|min:0',
            'hire_date'        => 'required|date',
            'phone'            => 'nullable|string|max:20',
            'emergency_contact'=> 'nullable|string|max:255',
            'bank_account'     => 'nullable|string|max:255',
        ]);

        $data['status'] = 'active';
        return response()->json(Employee::create($data)->load('department'), 201);
    }

    public function show(Employee $employee)
    {
        return response()->json($employee->load('department', 'leaveRequests', 'payrollRecords'));
    }

    public function update(Request $request, Employee $employee)
    {
        $data = $request->validate([
            'department_id' => 'nullable|exists:departments,id',
            'job_title'     => 'sometimes|string|max:255',
            'base_salary'   => 'sometimes|numeric|min:0',
            'status'        => 'sometimes|in:active,inactive,terminated',
            'phone'         => 'nullable|string|max:20',
            'bank_account'  => 'nullable|string|max:255',
        ]);

        $employee->update($data);
        return response()->json($employee->load('department'));
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(['message' => 'Employee deleted.']);
    }
}
