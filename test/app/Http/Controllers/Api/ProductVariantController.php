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
            $variant = ProductVariant::with('product.categorie_product')->get(); //ini mengambil dari induknya kemudian menyelam lagi ambil dari induknya jg, pooko anak terakhir ambil yg belongsTo
            return response()->json([
                'type'=>'Succes',
                'data'=>$variant
            ],201);

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
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        try{
            $variant=ProductVariant::with('product')->findOrFail($id);
            return response()->json([
                'type'=>'Succes',
                'data'=>$variant,
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
            $variant = ProductVariant::findOrFail($id);
            $validate = $request->validate([
                "variant_product_id"=>'required|exists:products,id',
                'name'=>'required',
                'price'=>'required',
                'stock'=>'required',
            ]);
            $variant->load('product');
            $variant->update([
                'variant_product_id'=>$validate['variant_product_id'],
                'name'=>$validate['name'],
                'price'=>$validate['price'],
                'stock'=>$validate['stock']
            ]);
            return response()->json([
                'type'=>'Succes',
                'data'=>$variant,
                'message'=>'Berhasil diubah'
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try{
            $variant = ProductVariant::findOrFail($id);
            $variant->delete();
            return response()->json([
                'type'=>'succes',
                'data'=>$variant,
                'message'=>'Berhasil dihapus'
            ],201);

        } catch(\Exception $e){
            return response()->json([
                'type'=>'Error/Gagal',
                'message'=>$e->getMessage(),
                'data'=>null
            ],501);
        }
    }


}
