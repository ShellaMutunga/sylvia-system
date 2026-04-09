<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
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
use App\Http\Controllers\Api\UserController;

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

    // Users
    Route::apiResource('users', UserController::class);

    // Farm structure
    Route::apiResource('farms', FarmController::class);
    Route::apiResource('fields', FieldController::class);
    Route::apiResource('zones', ZoneController::class);

    // Crops
    Route::apiResource('crop-types', CropTypeController::class);
    Route::apiResource('crop-seasons', CropSeasonController::class);
    Route::post('crop-seasons/{cropSeason}/activities', [CropActivityController::class, 'store']);
    Route::get('crop-seasons/{cropSeason}/activities', [CropActivityController::class, 'index']);
    Route::post('crop-seasons/{cropSeason}/harvests', [CropHarvestController::class, 'store']);
    Route::get('crop-seasons/{cropSeason}/harvests', [CropHarvestController::class, 'index']);

    // Animals
    Route::apiResource('animal-species', AnimalSpeciesController::class);
    Route::apiResource('animal-groups', AnimalGroupController::class);
    Route::apiResource('animals', AnimalController::class);
    Route::post('animals/{animal}/health-records', [AnimalHealthRecordController::class, 'store']);
    Route::get('animals/{animal}/health-records', [AnimalHealthRecordController::class, 'index']);
    Route::post('animals/{animal}/productions', [AnimalProductionController::class, 'store']);
    Route::get('animals/{animal}/productions', [AnimalProductionController::class, 'index']);
});
