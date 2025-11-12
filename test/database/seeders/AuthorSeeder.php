<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // //
        // Author::create([
        //     'name'=> 'Yanto',
        //     'birthdate'=> '2005-3-12',
        // ]);
        
        // looping
        $names=['Titi','Nurmala','Santi','Febri'];
        for($i=0;$i<4;$i++){
            Author::create([
                'name'=> $names[$i],
                'birthdate'=> '2005-3-12',
            ]);
        }
    }
}
