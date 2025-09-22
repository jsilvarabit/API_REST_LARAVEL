<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPage = $request->get('current_page' ??  1);
        $regPerPage = 3;

        $skip = ($currentPage - 1) * $regPerPage; //1=0 ------- 2=3

        $users =  User::skip($skip)->take($regPerPage)->orderByDesc('id')->get();

        return response()->json($users->toResourceCollection(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        try {
            $user = new User();
            $user->fill($data);
            $user->save();
            return response()->json($user->toResource(), 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Falha ao inserir usuário!'
            ], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user->toResource(), 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Usuário não encontrado!'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $user = User::firstOrFail($id);
            $user->update($data);

            return response()->json($user->toResource(), 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Falha ao alterar os dados de usuário!'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // $user = User::findOrFail($id);
            // $user->delete();

            // return response()->json([
            //     'message' => 'Usuário deletado com sucesso!'
            // ], 200);
            $removed =  User::destroy($id);
            if (!$removed) {
                throw new Exception();
            }
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Falha ao deletar usuário!'
            ], 404);
        }
    }
}
