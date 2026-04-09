<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Employee;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $query = Attendance::with('employee');

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        if ($request->has('employee_id')) {
            $query->where('employee_id', $request->employee_id);
        }

        if ($request->has('month') && $request->has('year')) {
            $query->whereMonth('date', $request->month)->whereYear('date', $request->year);
        }

        return response()->json($query->latest('date')->get());
    }

    // Bulk attendance entry for a day
    public function bulkStore(Request $request)
    {
        $data = $request->validate([
            'date'       => 'required|date',
            'attendance' => 'required|array',
            'attendance.*.employee_id' => 'required|exists:employees,id',
            'attendance.*.status'      => 'required|in:present,absent,leave,half_day',
            'attendance.*.check_in'    => 'nullable|date_format:H:i',
            'attendance.*.check_out'   => 'nullable|date_format:H:i',
            'attendance.*.hours_worked'=> 'nullable|numeric|min:0',
        ]);

        $records = [];
        foreach ($data['attendance'] as $entry) {
            $records[] = Attendance::updateOrCreate(
                ['employee_id' => $entry['employee_id'], 'date' => $data['date']],
                [
                    'status'       => $entry['status'],
                    'check_in'     => $entry['check_in'] ?? null,
                    'check_out'    => $entry['check_out'] ?? null,
                    'hours_worked' => $entry['hours_worked'] ?? null,
                ]
            );
        }

        return response()->json(['saved' => count($records), 'records' => $records]);
    }

    public function show(Attendance $attendance)
    {
        return response()->json($attendance->load('employee'));
    }
}
