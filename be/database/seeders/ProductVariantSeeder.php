<?php

namespace Database\Seeders;

use App\Models\ProductVariant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $variants = [
            // Produk 1: Smartphone Samsung A34
            [
                'variant_product_id' => 1,
                'name' => 'Warna Hitam 128GB',
                'price' => '3499000',
                'stock' => '25'
            ],
            [
                'variant_product_id' => 1,
                'name' => 'Warna Ungu 256GB',
                'price' => '3999000',
                'stock' => '15'
            ],
    
            // Produk 2: Laptop Asus VivoBook 15
            [
                'variant_product_id' => 2,
                'name' => 'RAM 8GB SSD 256GB',
                'price' => '6599000',
                'stock' => '10'
            ],
            [
                'variant_product_id' => 2,
                'name' => 'RAM 16GB SSD 512GB',
                'price' => '7999000',
                'stock' => '7'
            ],
    
            // Produk 3: Headset Bluetooth JBL Tune
            [
                'variant_product_id' => 3,
                'name' => 'Warna Hitam',
                'price' => '499000',
                'stock' => '40'
            ],
            [
                'variant_product_id' => 3,
                'name' => 'Warna Putih',
                'price' => '499000',
                'stock' => '35'
            ],
    
            // Produk 4: Kemeja Lengan Panjang Pria
            [
                'variant_product_id' => 4,
                'name' => 'Size M',
                'price' => '149000',
                'stock' => '30'
            ],
            [
                'variant_product_id' => 4,
                'name' => 'Size L',
                'price' => '149000',
                'stock' => '25'
            ],
    
            // Produk 5: Celana Jeans Slim Fit
            [
                'variant_product_id' => 5,
                'name' => 'Size 30',
                'price' => '199000',
                'stock' => '20'
            ],
            [
                'variant_product_id' => 5,
                'name' => 'Size 32',
                'price' => '199000',
                'stock' => '18'
            ],
    
            // Produk 6: Jaket Hoodie Pria
            [
                'variant_product_id' => 6,
                'name' => 'Hitam XL',
                'price' => '179000',
                'stock' => '22'
            ],
    
            // Produk 7: Blouse Wanita Casual
            [
                'variant_product_id' => 7,
                'name' => 'Pink Size M',
                'price' => '129000',
                'stock' => '25'
            ],
            [
                'variant_product_id' => 7,
                'name' => 'Cream Size L',
                'price' => '129000',
                'stock' => '20'
            ],
    
            // Produk 8: Dress Midi Floral
            [
                'variant_product_id' => 8,
                'name' => 'Size S',
                'price' => '189000',
                'stock' => '15'
            ],
            [
                'variant_product_id' => 8,
                'name' => 'Size M',
                'price' => '189000',
                'stock' => '10'
            ],
        ];
    
        foreach ($variants as $v) {
            ProductVariant::create($v);
        }
    }
}
