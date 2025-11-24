<?php

namespace Database\Seeders;

use App\Models\CategorieProduct;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorieProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories = [
            [
                'name' => 'Elektronik',
                'description' => 'Produk elektronik seperti smartphone, laptop, dan aksesoris digital.'
            ],
            [
                'name' => 'Fashion Pria',
                'description' => 'Beragam pakaian dan aksesoris khusus pria.'
            ],
            [
                'name' => 'Fashion Wanita',
                'description' => 'Koleksi pakaian dan aksesoris khusus wanita.'
            ],
            [
                'name' => 'Makanan & Minuman',
                'description' => 'Produk makanan kemasan, minuman, dan kebutuhan konsumsi harian.'
            ],
            [
                'name' => 'Peralatan Rumah Tangga',
                'description' => 'Perlengkapan dapur, kebersihan, dan kebutuhan rumah lainnya.'
            ],
        ];
        
        
        foreach ($categories as $cat) {
            CategorieProduct::create($cat);
        }
        
    }
}
