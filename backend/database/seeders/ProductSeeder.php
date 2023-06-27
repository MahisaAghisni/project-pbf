<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            [
                "name" => "Rexus",
                "color" => "Black",
                "price" => 100000,
                "stock" => 10,
            ],
            [
                "name" => "Logitech",
                "color" => "White",
                "price" => 200000,
                "stock" => 20,
            ],
            [
                "name" => "Steelseries",
                "color" => "Red",
                "price" => 300000,
                "stock" => 30,
            ],
        ]);
    }
}
