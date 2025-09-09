<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $todo = Todo::all();
        return Inertia::render('Home', [
            'todos' => $todo
        ]);
    }  
    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        Todo::create([
            'title' => $request->title,
            'completed' => false
        ]);
        return redirect()->back();
    }
    public function update(Request $request, Todo $todo){
        $request->validate([
            'completed' => 'boolean',
            'title' => 'sometimes|string|max:255'
        ]);

        $todo->update($request->only('completed','title'));
        return redirect()->back();
    }
    public function destroy(Todo $todo){
        $todo->delete();
        return redirect()->back();
    }
    public function clearCompleted(){
        Todo::where('completed', true)->delete();
        return redirect()->back();
    }
}