import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/images/logo_joao.png";
import "./Navbar.css";

function Sidebar() {
  const [isUsuariosOpen, setIsUsuariosOpen] = useState(false);
  const [isEstoqueOpen, setIsEstoqueOpen] = useState(false);  
  return (
    <aside className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="clhtech" title="clhtech" />
        </Link>
      </div>
      <ul className="sidebarMenu">
        <li>
          <button
            className="menuToggle"
            onClick={() => setIsEstoqueOpen(!isEstoqueOpen)}
          >
            Estoque
          </button>
          {isEstoqueOpen && (
            <ul className="submenu">
              <li>
                <Link to="/adicionarProduto">Adicionar Produtos</Link>
              </li>
              <li>
                <Link to="/baixaProduto">Dar Baixa em Produtos</Link>
              </li>
              <li>
                <Link to="/excluirProduto">Excluir Produtos</Link>
              </li>
              <li>
                <Link to="/cadastrarProduto">Cadastrar novo Produto</Link>
              </li>
              <li>
                <Link to="/acompanharEstoque">Acompanhar Estoque</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <ul className="sidebarMenu">
        <li>
          <button
            className="menuToggle"
            onClick={() => setIsUsuariosOpen(!isUsuariosOpen)}
          >
            Usuários
          </button>
          {isUsuariosOpen && (
            <ul className="submenu">
              <li>
                <Link to="/listarUsuarios">Listar Usuários</Link>
              </li>
              <li>
                <Link to="/cadastrar">Cadastrar Novo Usuário</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
