<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categorie_product;
use Illuminate\Http\Request;

class CategorieProductController extends Controller
{
    //Menampilkan
    public function index(){
        $categorie_product = Categorie_product::all();
        return response()->json([
            'message'=>'Ditampilkan',
            'data'=>$categorie_product
        ],201);

        if(!$categorie_product){
            return response()->json([
                'message'=>'Gagal Menampilkan',
                'data'=>null
            ],501);
        }
    }

    // Menyimpan
    public function store(Request $request){
        $validateData = $request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string',
        ]);
        $categorie_product = Categorie_product::create($validateData);
        return response()->json([
            "message" => "Berhasil Ditambahkan",
            "data" => $categorie_product], 201);
    }


    // Mencari data dulu
    public function show($id){
        // cari di database berdasarkan Modelnya
        $categorie_product = Categorie_product::find($id);
        if(!$categorie_product){
            return response()->json([
                'message'=>'Data tidak ditemukan'],401);
        }
        return response()->json($categorie_product);
    }

    //Mengedit 
    public function update(Request $request,$id){
        $categorie_product = Categorie_product::find($id);
        // validasi
        $validate=$request->validate([
            'name' => 'required|max:255',
            'description' => 'nullable|string',
        ]);

        if(!$categorie_product){
            return response()->json([
                'status' => 'Dicari',
                'data' => null,
                'message' => 'Data tidak ada dan belum diubah',
            ]);
        }

        $categorie_product->update([
            'name'=>$validate['name'],
            'description'=>$validate['description']
        ]);

        return response()->json([
            'status'=>'Berhasil diubah',
            'data'=>$categorie_product,
        ],201);
    }

    // Menghapus
    public function destroy($id){
        $categorie_product = Categorie_product::find($id);

        if(!$categorie_product){
            return response()->json([
                'status' => 'Hapus',
                'data' => null,
                'message' => 'Data tidak ada dan Tidak bisa Dihapus!!!',
            ],401);
        }

        $categorie_product->delete();

        return response()->json([
            'status' => 'Dicari',
            'data' => $categorie_product,
            'message' => 'Data Berhasil Dihapus!!!',
        ],201);
        
    }


}
