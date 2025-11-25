<?php

namespace App\Models;

use App\Http\Controllers\ProductController;
use Illuminate\Database\Eloquent\Model;

class CategorieProduct extends Model
{
    //
    protected $guarded = ['id'];

    public function product()
    {
        return $this->hasMany(Product::class,'product_category_id');
    }
    // public function product_variant()
    // {
    //     return $this->hasMany(ProductVariant::class,'variant_product_id');
    // }
}
