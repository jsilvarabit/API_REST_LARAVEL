<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Produto;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Produto>
 */
class ProdutoFactory extends Factory
{

    protected $model = Produto::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nome' => fake()->word(),
            'descricao' => fake()->sentence(),
            'preco' => fake()->randomFloat(2, 1, 1000),
            'quantidade_estoque' => fake()->numberBetween(0, 100),
        ];
    }
}
