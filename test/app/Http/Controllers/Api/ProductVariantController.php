<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try{
            $variant = ProductVariant::with('product')->get();
            return response()->json($variant);

        } catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'data'=>null
            ],501);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // 
        try{
            $validate = $request->validate([
                "variant_product_id"=>'required|exists:products,id',
                'name'=>'required',
                'price'=>'required',
                'stock'=>'required',
            ]);
            $variant = ProductVariant::create($validate);
            $variant->load('product');
            return response()->json([
                'type'=>'succes',
                'data'=>$variant,
                'message'=>'Berhasil ditambahkan'
            ],201);

        } catch(\Exception $e){
            return response()->json([
                'type'=>'Error/Gagal',
                'message'=>$e->getMessage(),
                'data'=>null
            ],501);
        }
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try{

        } catch(\Exception $e){
            
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        try{

        } catch(\Exception $e){
            
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        try{

        } catch(\Exception $e){
            
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try{

        } catch(\Exception $e){
            
        }
    }


}
