<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $products = [
            // Kategori 1: Elektronik
            [
                'product_category_id' => 1,
                'name' => 'Smartphone Samsung A34',
                'code' => '1001',
            ],
            [
                'product_category_id' => 1,
                'name' => 'Laptop Asus VivoBook 15',
                'code' => '1002',
            ],
            [
                'product_category_id' => 1,
                'name' => 'Headset Bluetooth JBL Tune',
                'code' => '1003',
            ],
    
            // Kategori 2: Fashion Pria
            [
                'product_category_id' => 2,
                'name' => 'Kemeja Lengan Panjang Pria',
                'code' => '2001',
            ],
            [
                'product_category_id' => 2,
                'name' => 'Celana Jeans Slim Fit',
                'code' => '2002',
            ],
            [
                'product_category_id' => 2,
                'name' => 'Jaket Hoodie Pria',
                'code' => '2003',
            ],
    
            // Kategori 3: Fashion Wanita
            [
                'product_category_id' => 3,
                'name' => 'Blouse Wanita Casual',
                'code' => '3001',
            ],
            [
                'product_category_id' => 3,
                'name' => 'Dress Midi Floral',
                'code' => '3002',
            ],
            [
                'product_category_id' => 3,
                'name' => 'Cardigan Rajut Wanita',
                'code' => '3003',
            ],
            // Kategori 4: Makanan & Minuman
        [
            'product_category_id' => 4,
            'name' => 'Keripik Kentang Original 150g',
            'code' => '4001',
        ],
        [
            'product_category_id' => 4,
            'name' => 'Kopi Arabica 250g',
            'code' => '4002',
        ],
        [
            'product_category_id' => 4,
            'name' => 'Teh Celup Premium 25pcs',
            'code' => '4003',
        ],

        // Kategori 5: Peralatan Rumah Tangga
        [
            'product_category_id' => 5,
            'name' => 'Set Panci Stainless 5in1',
            'code' => '5001',
        ],
        [
            'product_category_id' => 5,
            'name' => 'Sapu Lantai Serbaguna',
            'code' => '5002',
        ],
        [
            'product_category_id' => 5,
            'name' => 'Dispenser Sabun Otomatis',
            'code' => '5003',
        ],
    ];

    foreach ($products as $p) {
        Product::create($p);
    }

    }
}
