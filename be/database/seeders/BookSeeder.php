<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $author=Author::findOrFail(5); //mengedit
        //
        Book::create([
        'title' => 'PLagiat',
        'author' => 'okokok',
        'author_id' => 1,
        'published_year' => 2001,
        ]);
    }
}
