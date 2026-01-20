<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategorieProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        try {
            $totalCategories = CategorieProduct::count();
            $totalProducts = Product::count();
            $totalVariants = ProductVariant::count();

            return response()->json([
                'status' => 'Success',
                'data' => [
                    'totalCategories' => $totalCategories,
                    'totalProducts' => $totalProducts,
                    'totalVariants' => $totalVariants,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'Error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
