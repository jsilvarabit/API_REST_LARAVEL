import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import BoxProduto from "../components/layout/BoxProduto";
import Loader from "../components/common/Loader";
import api from "../services/api";
import "./Home.css";

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/produtos-baixo-estoque");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Produtos com estoque baixo</h1>
          <p>Listagem de produtos com menos de 50 unidades em estoque.</p>

          {isLoading ? (
            <Loader />
          ) : produtos.length === 0 ? (
            <p>Nenhum produto com estoque baixo.</p>
          ) : (
            <div className="produtos-grid">
              {produtos.map((produto) => (
                <BoxProduto key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
