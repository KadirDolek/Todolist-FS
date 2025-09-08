<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TodoController::class, 'index'])->name('home');
Route::post('/todos', [TodoController::class, 'store'])->name('todo.store');
Route::put('/todos/{todo}', [TodoController::class, 'update'])->name('todo.update');
Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todo.destroy');
Route::post('/todos/clear-completed', [TodoController::class, 'clearCompleted'])->name('todo.clearCompleted');