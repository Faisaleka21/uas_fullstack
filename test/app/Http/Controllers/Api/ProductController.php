<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function index(){
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            "product_category_id"=>" "
        ]);
        $product = product::create($validatedData);
        return response()->json($product, 201);
    }
}
