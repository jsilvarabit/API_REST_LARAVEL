<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/users', [UserController::class, 'index']);

//Esse comando cria todas as rotas automaticamente (index, show, store, update, destroy)
Route::apiResource('users', UserController::class);
