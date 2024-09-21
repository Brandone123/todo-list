<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    // Liste toutes les tâches de l'utilisateur connecté
    public function index()
    {
        $tasks = Auth::user()->tasks;
        return response()->json($tasks);
    }

    // Crée une nouvelle tâche
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->user_id = Auth::id();
        $task->save();

        return response()->json($task, 201);
    }

    // Affiche une tâche spécifique
    public function show(Task $task)
    {
        $this->authorize('view', $task);
        return response()->json($task);
    }

    // Met à jour une tâche existante
    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'Pending',
        ]);

        $task->update($request->only(['title', 'description', 'status']));

        return response()->json($task);
    }

    // Supprime une tâche
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();

        return response()->json(null, 204);
    }
}