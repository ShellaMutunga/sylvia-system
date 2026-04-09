<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FarmController;
use App\Http\Controllers\Api\FieldController;
use App\Http\Controllers\Api\ZoneController;
use App\Http\Controllers\Api\CropTypeController;
use App\Http\Controllers\Api\CropSeasonController;
use App\Http\Controllers\Api\CropActivityController;
use App\Http\Controllers\Api\CropHarvestController;
use App\Http\Controllers\Api\AnimalSpeciesController;
use App\Http\Controllers\Api\AnimalController;
use App\Http\Controllers\Api\AnimalGroupController;
use App\Http\Controllers\Api\AnimalHealthRecordController;
use App\Http\Controllers\Api\AnimalProductionController;
use App\Http\Controllers\Api\SupplierController;
use App\Http\Controllers\Api\InventoryItemController;
use App\Http\Controllers\Api\PurchaseOrderController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Api\PayrollController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\DashboardController;

// Public routes
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });

    // Dashboard
    Route::get('dashboard/stats', [DashboardController::class, 'stats']);

    // Users
    Route::apiResource('users', UserController::class);

    // Farm structure
    Route::apiResource('farms', FarmController::class);
    Route::apiResource('fields', FieldController::class);
    Route::apiResource('zones', ZoneController::class);

    // Crops
    Route::apiResource('crop-types', CropTypeController::class);
    Route::apiResource('crop-seasons', CropSeasonController::class);
    Route::get('crop-seasons/{cropSeason}/activities', [CropActivityController::class, 'index']);
    Route::post('crop-seasons/{cropSeason}/activities', [CropActivityController::class, 'store']);
    Route::get('crop-seasons/{cropSeason}/harvests', [CropHarvestController::class, 'index']);
    Route::post('crop-seasons/{cropSeason}/harvests', [CropHarvestController::class, 'store']);

    // Animals
    Route::apiResource('animal-species', AnimalSpeciesController::class);
    Route::apiResource('animal-groups', AnimalGroupController::class);
    Route::apiResource('animals', AnimalController::class);
    Route::get('animals/{animal}/health-records', [AnimalHealthRecordController::class, 'index']);
    Route::post('animals/{animal}/health-records', [AnimalHealthRecordController::class, 'store']);
    Route::get('animals/{animal}/productions', [AnimalProductionController::class, 'index']);
    Route::post('animals/{animal}/productions', [AnimalProductionController::class, 'store']);

    // Inventory
    Route::apiResource('suppliers', SupplierController::class);
    Route::apiResource('inventory-items', InventoryItemController::class);
    Route::get('purchase-orders', [PurchaseOrderController::class, 'index']);
    Route::post('purchase-orders', [PurchaseOrderController::class, 'store']);
    Route::get('purchase-orders/{purchaseOrder}', [PurchaseOrderController::class, 'show']);
    Route::post('purchase-orders/{purchaseOrder}/approve', [PurchaseOrderController::class, 'approve']);
    Route::post('purchase-orders/{purchaseOrder}/deliver', [PurchaseOrderController::class, 'deliver']);
    Route::post('purchase-orders/{purchaseOrder}/cancel', [PurchaseOrderController::class, 'cancel']);

    // HR & Payroll
    Route::apiResource('employees', EmployeeController::class);
    Route::get('attendance', [AttendanceController::class, 'index']);
    Route::post('attendance/bulk', [AttendanceController::class, 'bulkStore']);
    Route::get('attendance/{attendance}', [AttendanceController::class, 'show']);
    Route::get('leave-requests', [LeaveRequestController::class, 'index']);
    Route::post('leave-requests', [LeaveRequestController::class, 'store']);
    Route::post('leave-requests/{leaveRequest}/approve', [LeaveRequestController::class, 'approve']);
    Route::post('leave-requests/{leaveRequest}/reject', [LeaveRequestController::class, 'reject']);
    Route::get('payroll', [PayrollController::class, 'index']);
    Route::post('payroll/generate', [PayrollController::class, 'generate']);
    Route::patch('payroll/{payrollRecord}', [PayrollController::class, 'update']);
    Route::post('payroll/{payrollRecord}/approve', [PayrollController::class, 'approve']);
    Route::post('payroll/{payrollRecord}/mark-paid', [PayrollController::class, 'markPaid']);

    // Finance
    Route::get('transactions', [TransactionController::class, 'index']);
    Route::post('transactions', [TransactionController::class, 'store']);
    Route::get('transactions/summary', [TransactionController::class, 'summary']);
    Route::get('transactions/{transaction}', [TransactionController::class, 'show']);
});
