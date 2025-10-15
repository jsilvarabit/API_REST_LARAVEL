import "./BoxProduto.css";

function BoxProduto({ produto }) {
  return (
    <div className="produto-box">
      <h3>{produto.nome}</h3>
      <p>Estoque: {produto.quantidade_estoque}</p>
      {produto.quantidade_estoque <= 50 && (
        <div className="alerta-estoque">⚠️ Produto com estoque baixo!</div>
      )}
    </div>
  );
}

export default BoxProduto;
