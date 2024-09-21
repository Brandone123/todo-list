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
        // Récupère les tâches de l'utilisateur connecté
        $tasks = Task::where('user_id', Auth::id())->get();
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
        $task->user_id = Auth::id();  // Associe la tâche à l'utilisateur connecté
        $task->save();

        return response()->json($task, 201);
    }

    // Affiche une tâche spécifique
    public function show(Task $task)
    {
        // Autorise seulement l'affichage si l'utilisateur en est propriétaire
        // $this->authorize('view', $task);
        return response()->json($task);
    }

    // Met à jour une tâche existante
    public function update(Request $request, Task $task)
    {
        // Vérifie si l'utilisateur a le droit de modifier cette tâche
        // $this->authorize('update', $task);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:Pending,In Progress,Completed',
        ]);

        // Met à jour les champs demandés
        $task->update($request->only(['title', 'description', 'status']));

        return response()->json($task);
    }

    // Supprime une tâche
    public function destroy(Task $task)
    {
        // Autorise seulement la suppression si l'utilisateur en est propriétaire
        // $this->authorize('delete', $task);
        $task->delete();

        return response()->json(null, 204);
    }
}
