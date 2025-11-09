<?php

namespace App\Models;

use App\Http\Controllers\ProductController;
use Illuminate\Database\Eloquent\Model;

class Categorie_product extends Model
{
    //
    protected $guarded = ('id');

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
