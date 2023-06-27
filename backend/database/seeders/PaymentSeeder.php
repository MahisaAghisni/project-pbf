<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('payments')->insert([
            [
                "name" => "BNI",
                "card_number" => "1234567890",
            ],
            [
                "name" => "BCA",
                "card_number" => "0987654321",
            ],
            [
                "name" => "BRI",
                "card_number" => "1234509876",
            ]
        ]);
    }
}
