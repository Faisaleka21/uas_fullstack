<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
            'name' => 'required|max:255',
            'code' => 'required',
        ]);
        $product = product::create($validatedData);
        return response()->json($product, 201);
    }

}
