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
        return $this->hasMany(Product::class);
    }
}
