import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import api from "../services/api";
import "./Home.css";

function Estoque() {
  const numProductsPerPage = 10;
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const loadProducts = async (page) => {
    setIsLoading(true);

    await api
      .get("/acompanharEstoque", {
        params: {
          current_page: page,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
        setTotalProducts(response.data.infos.total_products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setIsLoading(false);
      });
  };

  const totalPages = Math.ceil(totalProducts / numProductsPerPage);

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Controle de Estoque</h1>
          <p>Listagem de todos os produtos disponíveis no estoque.</p>

          {isLoading ? (
            <Loader />
          ) : products.length <= 0 ? (
            <p>Nenhum produto cadastrado até o momento!</p>
          ) : (
            <>
              <table className="table-products">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.nome}</td>
                      <td>R$ {parseFloat(product.preco).toFixed(2)}</td>
                      <td>{product.quantidade_estoque}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </button>

                <span>
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Próxima
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Estoque;
