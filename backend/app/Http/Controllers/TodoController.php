<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
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

    public function update(Request $request, $todo_id)
    {
        $allowedFields = ['is_checked'];
        $request->validate([
            'is_checked' => ['boolean']
        ]);
        $todo = Todo::where('id', $todo_id)->first();

        foreach ($request->all() as $key => $value)
        {
            if (in_array($key, $allowedFields))
            {
                $todo->$key = $value;
            }
        }

        $todo->save();

        return response()->json([
            'id' => $todo->id,
            'name' => $todo->name,
            'is_checked' => filter_var($todo->is_checked, FILTER_VALIDATE_BOOLEAN)
        ], 200);
    }
}
