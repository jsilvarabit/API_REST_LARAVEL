import { Routes as RoutesManager, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import AdicionarProduto from "../pages/AdicionarProduto";
import BaixaProduto from "../pages/BaixaProduto";
import ExcluirProduto from "../pages/ExcluirProduto";
import CadastrarProduto from "../pages/CadastrarProduto";
import Estoque from "../pages/Estoque";

function Routes() {
  return (
    <>
      <RoutesManager>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<Register />} />
        <Route path="/alterar/:userId" element={<Register />} />
        <Route path="/adicionarProduto" element={<AdicionarProduto />} />
        <Route path="/baixaProduto" element={<BaixaProduto />} />
        <Route path="/excluirProduto" element={<ExcluirProduto />} />
        <Route path="/cadastrarProduto" element={<CadastrarProduto />} />
        <Route path="/acompanharEstoque" element={<Estoque />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </RoutesManager>
    </>
  );
}

export default Routes;
