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

    public function find(Request $request)
    {
        $todo = Auth::user()->todos()->where('id', $request->todo_id);

        if (is_null($todo))
        {
            return response()->json('Todo not found.', 400);
        }

        return response()->json($todo, 200);
    }
}
