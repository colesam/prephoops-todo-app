<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use Auth;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Auth::user()->todos->map(function($todo) {
            $tags = $todo->tags->map(function($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name
                ];
            });

            return [
                'id' => $todo->id,
                'name' => $todo->name,
                'isChecked' => $todo->is_checked,
                'tags' => $tags
            ];
        }), 200);
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
            'isChecked' => $todo->is_checked,
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
            'isChecked' => filter_var($todo->is_checked, FILTER_VALIDATE_BOOLEAN)
        ], 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:100']
        ]);

        $todo = new Todo;
        $todo->name = $request->name;
        $todo->user_id = Auth::user()->id;
        $todo->save();

        return response()->json([
            'id' => $todo->id,
            'name' => $todo->name,
            'isChecked' => false
        ], 200);
    }
}
