<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Auth::user()->todos, 200);
    }

    public function find($todo_id)
    {
        $todo = Auth::user()->todos()->where('id', $todo_id)->first();

        $tags = $todo->tags->map(function ($tag) {
            return [
                'id' => $tag->id,
                'name' => $tag->name
            ];
        });

        if (is_null($todo))
        {
            return response()->json('Todo not found.', 400);
        }

        return response()->json([
            'id' => $todo->id,
            'name' => $todo->name,
            'is_checked' => $todo->is_checked,
            'tags' => $tags
        ], 200);
    }
}
