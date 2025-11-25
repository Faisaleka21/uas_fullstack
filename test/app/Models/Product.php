<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $guarded = ['id'];

    public function categorie_product()
    {
        return $this->belongsTo(related: CategorieProduct::class, foreignKey:'product_category_id');
    }
    public function product_variant()
    {
        return $this->hasMany(ProductVariant::class,'variant_product_id');
    }

}
