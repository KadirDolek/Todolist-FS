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
        // Apparait sous l'input marqué et non complété
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
    // Une autre fonction pour effacer toutes les tâches faites en one click
    public function clearCompleted(){
        Todo::where('completed', true)->delete();
        return redirect()->back();
    }
}