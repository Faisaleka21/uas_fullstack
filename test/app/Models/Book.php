<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    //
    protected $guarded = ['id'];

    public function author()
    {
        return $this->hasMany(Author::class);
    }
}
