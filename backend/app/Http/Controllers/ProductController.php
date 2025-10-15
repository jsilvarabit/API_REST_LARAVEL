<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Exception;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Listagem paginada de produtos (estoque).
     */
    public function acompanharEstoque(Request $request)
    {
        $currentPage = $request->get('current_page', 1);
        $regPerPage = 10;

        $skip = ($currentPage - 1) * $regPerPage;

        $products = Produto::orderBy('id')->skip($skip)->take($regPerPage)->get();


        $totalProducts = Produto::count();

        return response()->json([
            'data' => $products, // se quiser, pode usar toResourceCollection igual em User
            'infos' => [
                'total_products' => $totalProducts,
                'per_page' => (int) $regPerPage,
                'current_page' => (int) $currentPage,
                'last_page' => ceil($totalProducts / $regPerPage)
            ]
        ], 200);
    }

    /**
     * Criar novo produto.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        try {
            $product = new Produto();
            $product->fill($data);
            $product->save();

            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Falha ao inserir produto!'
            ], 404);
        }
    }

    /**
     * Exibir produto por ID.
     */
    public function show(string $id)
    {
        try {
            $product = Produto::findOrFail($id);
            return response()->json($product, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Produto não encontrado!'
            ], 404);
        }
    }

    /**
     * Atualizar produto.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name'  => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'stock' => 'sometimes|required|integer|min:0',
        ]);

        try {
            $product = Produto::findOrFail($id);
            $product->update($data);

            return response()->json($product, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Falha ao alterar os dados do produto!'
            ], 404);
        }
    }

    /**
     * Remover produto.
     */
    public function destroy(string $id)
    {
        try {
            $removed = Produto::destroy($id);
            if (!$removed) {
                throw new Exception();
            }
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Falha ao deletar produto!'
            ], 404);
        }
    }

    /** Pegar todos os produtos que estão com quantidade menor que 50 */
    public function getEstoqueBaixo()
    {
        $produtos = Produto::where('quantidade_estoque', '<=', 50)->get(['id', 'nome', 'quantidade_estoque']);
        return response()->json($produtos, 200);
    }

   public function listaProdutos()
    {
        $produtos = Produto::select('id', 'nome')->get();

        // Renomeia os campos para o frontend
        $produtos = $produtos->map(function ($produto) {
            return [
                'id' => $produto->id,
                'name' => $produto->nome,
            ];
        });

        return response()->json($produtos, 200);
    }
}
