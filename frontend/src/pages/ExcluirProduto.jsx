import { Button } from "../components/common/Button";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function ExcluirProduto() {
  const [isLoading, setIsLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtoId, setProdutoId] = useState("");

  // Carrega os produtos ao montar
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get("/listaProdutos");
        setProdutos(response.data);
      } catch (error) {
        toast.error("Erro ao carregar produtos.");
      }
    };

    fetchProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!produtoId) {
      toast.warning("Selecione um produto para excluir.");
      setIsLoading(false);
      return;
    }

    try {
      await api.delete(`/produtos/${produtoId}`);
      toast.success("Produto excluído com sucesso!");
      setProdutoId("");
      // Atualiza a lista após exclusão
      setProdutos(produtos.filter((p) => p.id !== parseInt(produtoId)));
    } catch (error) {
      toast.error("Erro ao excluir produto.");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Excluir produto</h1>
          <p>Selecione um produto para excluir do estoque.</p>

          <form onSubmit={handleSubmit}>
            <select
              name="produtoId"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                marginBottom: "20px",
                width: "100%",
              }}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.name}
                </option>
              ))}
            </select>

            <Button type="submit">
              {isLoading ? "Excluindo..." : "Excluir"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExcluirProduto;
