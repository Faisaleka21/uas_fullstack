<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $guarded = ['id'];

    public function Categorie_product(){
        return $this->hasMany(related: Categorie_product::class);
    }
}
