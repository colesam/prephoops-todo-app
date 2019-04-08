<?php

use Illuminate\Database\Seeder;

class TagTodoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $associations = [
            [
                'tag_id' => 1,
                'todo_id' => 1
            ],
            [
                'tag_id' => 2,
                'todo_id' => 2
            ],
            [
                'tag_id' => 3,
                'todo_id' => 3
            ],
        ];
        foreach($associations as $association)
        {
            DB::connection()->table('tag_todo')->insert($association);
        }
    }
}
