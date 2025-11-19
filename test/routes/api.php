<?php

use App\Http\Controllers\Api\CategorieProductController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductVariantController;
// use App\Http\Controllers\ProductController;
use App\Http\Controllers\VendorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('/v1')->group(function(){
    // Route::resource('/vendor', VendorController::class);
    Route::resource('/product',ProductController::class);
    Route::resource('/categorie-product',CategorieProductController::class);
    Route::resource('/product-variant',ProductVariantController::class);


    Route::get('/helo', function(){
        return "Hello, Laravel";
    });
});


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
