<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategorieProduct;
use Exception;
use Illuminate\Http\Request;

class CategorieProductController extends Controller
{
    //Menampilkan
    public function index(){

        try{
            $categorie_product = CategorieProduct::all();
            return response()->json([
                'message'=>'Ditampilkan',
                'data'=>$categorie_product 
            ],201);
       
        } catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                    'data'=>null
            ],501);
        }
    }

    // Menyimpan
    public function store(Request $request){
        try{
            $validateData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string',
            ]);
            $categorie_product = CategorieProduct::create($validateData);
            return response()->json([
                "message" => "Berhasil Ditambahkan",
                "data" => $categorie_product
            ], 201);
       
        } catch(\Exception $e){
            return response()->json([
                'message'=>$e->getMessage(),
                'data'=>null
            ],501);
        }

    }


    // Mencari data dulu
    public function show($id){
            // cari di database berdasarkan Modelnya
            $categorie_product = CategorieProduct::find($id); 
            return response()->json($categorie_product);
            
            if(!$categorie_product){
                return response()->json([
                    'message'=>'Data tidak ditemukan'],401);
            }

    }

    //Mengedit 
    public function update(Request $request,$id){
        try{
            $categorie_product = CategorieProduct::find($id);
            // validasi
            $validate=$request->validate([
                'name' => 'required|max:255',
                'description' => 'nullable|string',
            ]);
            $categorie_product->update([
                'name'=>$validate['name'],
                'description'=>$validate['description']
            ]);
    
            return response()->json([
                'status'=>'Berhasil diubah',
                'data'=>$categorie_product,
            ],201);

        } catch(\Exception $e){
             return response()->json([
                'message' => $e->getMessage(),
                'data' => null,
            ]);
        }
    }

    // Menghapus
    public function destroy($id){
        try{
            $categorie_product = CategorieProduct::find($id);
            $categorie_product->delete();

            return response()->json([
                'status' => 'Succes',
                'data' => $categorie_product,
                'message' => 'Data Berhasil Dihapus!!!',
            ],201);
        
        } catch(\Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
                'data' => null,
            ],401);
        }

        
        
    }


}
