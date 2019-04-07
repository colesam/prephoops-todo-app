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
}
