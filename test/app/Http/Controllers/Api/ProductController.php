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
        try{
            $products = Product::with('categorie_product','product_variant')->get();  //ini mengambil relasi ke category_product dulu. yg product variant itu dipisahkan
            return response()->json([
                'type'=>'Succes',
                'data'=>$products,
            ],201);

        } catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'data'=>null
            ],501);
        }
        
        
    }

    // menyimpan
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                "product_category_id" => "required|exists:categorie_products,id", //exists nama tabel
                "name" => "required|max:255",
                "code" => "required",
            ]);
            $product = Product::create($validatedData);
            $product->load('categorie_product'); //function model
            return response()->json([
                'status' => 'Success',
                'data' => $product,
                'message' => 'Berhasil ditambahkan'
            ], 201);
    
        } catch(\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null
            ], 501);
        }
    }

    // menampilkan berdasarkan id
    public function show($id){
        try{
            $product = Product::with('categorie_product')->find($id); 
            return response()->json($product);

        } catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'data'=>null
            ],501);
        }
    }

    // mengedit
    public function update(Request $request,$id){
        try{
            $product = Product::findOrFail($id);
            $validate = $request->validate([
               "product_category_id" => "required|exists:categorie_products,id",
                "name" => "required|max:255",
                "code" => "required", 
            ]);
            $product->load('categorie_product');
            $product->update([
                "product_category_id"=>$validate['product_category_id'],
                "name"=>$validate['name'],
                "code"=>$validate['code']
            ]);
            return response()->json([
                'status'=>'Berhasil diubah',
                'data'=>$product,
            ],201);

        } catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'data'=>null
            ],501);
        }
    }

    // menghapus
    public function destroy($id){
        try{
            $product = Product::findOrFail($id);
            $product->delete();
            return response()->json([
                'type'=>'succes',
                'data'=>$product,
                'message'=>'Berhasil dihapus'
            ],201);
        } catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'data'=>null,
                'notif'=>'tdk ada'
            ],501);
        }
    }


}
