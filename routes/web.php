<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('project', ProjectController::class);

    // Route::get('/task/my-projects', [ProjectController::class, 'myProjects'])
    //     ->name('task.myProjects');
    Route::resource('user', UserController::class)->middleware('admin');
});


require __DIR__ . '/auth.php';
