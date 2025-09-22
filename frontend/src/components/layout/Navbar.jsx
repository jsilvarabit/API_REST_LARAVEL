import { Link } from "react-router-dom";
import "./Navbar.css"; // Opcional: para estilização
import Logo from "../../assets/images/logo_joao.png"; // Certifique-se de que o caminho está correto

function Navbar() {
  return (
    <nav className="menu">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="clhtech" title="clhtech" />
        </Link>
      </div>

      <ul>
        <li>
          <Link to="/">Listagem de Usuários</Link>
        </li>
        <li>
          <Link to="/cadastrar">Cadastrar Usuário</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
