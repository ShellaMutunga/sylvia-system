<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Animal;
use App\Models\CropSeason;
use App\Models\Employee;
use App\Models\InventoryItem;
use App\Models\Transaction;
use App\Models\AnimalHealthRecord;
use App\Models\LeaveRequest;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $now = now();

        // Core KPIs
        $activeSeasons   = CropSeason::where('status', 'active')->count();
        $totalAnimals    = Animal::where('status', 'active')->count();
        $activeEmployees = Employee::where('status', 'active')->count();
        $lowStockItems   = InventoryItem::whereColumn('quantity', '<=', 'min_stock_level')->count();

        // Finance this month
        $monthlyIncome  = Transaction::where('type', 'income')
            ->whereMonth('date', $now->month)->whereYear('date', $now->year)
            ->sum('amount');
        $monthlyExpense = Transaction::where('type', 'expense')
            ->whereMonth('date', $now->month)->whereYear('date', $now->year)
            ->sum('amount');

        // Alerts
        $upcomingCheckups = AnimalHealthRecord::where('next_checkup_at', '<=', now()->addDays(7))
            ->where('next_checkup_at', '>=', now())
            ->count();

        $upcomingHarvests = CropSeason::where('status', 'active')
            ->where('expected_harvest_at', '<=', now()->addDays(7))
            ->count();

        $pendingLeaves = LeaveRequest::where('status', 'pending')->count();

        // Monthly income trend (last 6 months)
        $incomeTrend = Transaction::where('type', 'income')
            ->where('date', '>=', now()->subMonths(6)->startOfMonth())
            ->selectRaw("DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total")
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Animal production this week
        $weeklyProduction = DB::table('animal_productions')
            ->where('recorded_at', '>=', now()->startOfWeek())
            ->selectRaw('production_type, SUM(quantity) as total, unit')
            ->groupBy('production_type', 'unit')
            ->get();

        return response()->json([
            'kpis' => [
                'active_crop_seasons' => $activeSeasons,
                'total_animals'       => $totalAnimals,
                'active_employees'    => $activeEmployees,
                'low_stock_items'     => $lowStockItems,
                'monthly_income'      => $monthlyIncome,
                'monthly_expense'     => $monthlyExpense,
                'monthly_profit'      => $monthlyIncome - $monthlyExpense,
            ],
            'alerts' => [
                'upcoming_checkups'  => $upcomingCheckups,
                'upcoming_harvests'  => $upcomingHarvests,
                'pending_leaves'     => $pendingLeaves,
                'low_stock_count'    => $lowStockItems,
            ],
            'charts' => [
                'income_trend'       => $incomeTrend,
                'weekly_production'  => $weeklyProduction,
            ],
        ]);
    }
}
