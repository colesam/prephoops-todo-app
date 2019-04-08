<?php

use Illuminate\Database\Seeder;

class TodosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $todos = [
            [
                'user_id' => 1, // cole.samuel21@gmail.com
                'name' => 'Walk my dog',
                'is_checked' => false,
                'created_at' => Carbon\Carbon::now(),
                'updated_at' => Carbon\Carbon::now()
            ],
            [
                'user_id' => 1,
                'name' => 'Take out the trash',
                'is_checked' => false,
                'created_at' => Carbon\Carbon::now(),
                'updated_at' => Carbon\Carbon::now()
            ],
            [
                'user_id' => 1,
                'name' => 'Finish todo app',
                'is_checked' => true,
                'created_at' => Carbon\Carbon::now(),
                'updated_at' => Carbon\Carbon::now()
            ],
        ];

        foreach ($todos as $todo)
        {
            DB::table('todos')->insert($todo);
        }
    }
}
