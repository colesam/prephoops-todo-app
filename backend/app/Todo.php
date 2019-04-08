<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $table = 'todos';

    public function tags() {
        return $this->hasMany('App\Tag');
    }
}
