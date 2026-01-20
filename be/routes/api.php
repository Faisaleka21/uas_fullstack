<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategorieProductController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductVariantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('/v1')->group(function () {

    Route::prefix('auth')->group(function () {
        Route::post('signup', [AuthController::class, 'register']);
        Route::post('signin', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

    // Route::resource('/vendor', VendorController::class);
    Route::resource('/categorie-product', CategorieProductController::class);
    Route::resource('/product', ProductController::class);
    Route::resource('/product-variant', ProductVariantController::class);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);



    Route::get('/helo', function () {
        return "Hello, Laravel";
    });
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
