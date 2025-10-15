<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/users', [UserController::class, 'index']);

//Esse comando cria todas as rotas automaticamente (index, show, store, update, destroy)
Route::apiResource('users', UserController::class);
Route::apiResource('produtos', ProductController::class);

Route::get('/acompanharEstoque', [ProductController::class, 'acompanharEstoque']);
Route::get('/produtos-baixo-estoque', [ProductController::class, 'getEstoqueBaixo']);
Route::get('/listaProdutos', [ProductController::class, 'listaProdutos']);




