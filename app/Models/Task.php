<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    // Les champs qui peuvent être assignés en masse
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
    ];
}