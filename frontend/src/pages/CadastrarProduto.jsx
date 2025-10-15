import { Button } from "../components/common/Button";
import Input from "../components/common/Input";
import Form from "../components/common/Form";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function CadastrarProduto() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
        nomeProduto: "",
        quantidade: "",
        preco: "",
  });

  const [formDataErrors, setFormDataErrors] = useState({
        nomeProduto: [],
        quantidade: [],
        preco: [],
  });

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId]);

  const loadUser = async () => {
    setIsLoading(true);

    await api
      .get(`/users/${userId}`)
      .then((response) => {
        setFormData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error("Erro ao buscar usuários:", error);
        setIsLoading(false);
      });
  };

  const handleUpdate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .put(`/users/${userId}`, formData)
      .then((response) => {
        // console.log(response);
        toast.success("Cadastro alterado com sucesso!");
        setIsLoading(false);
      })
      .catch((error) => {
        // Erro de validação dos dados
        if (error.status === 422) {
          setFormDataErrors(error.response.data.errors);
        } else {
          // console.log(error);
          toast.error(error.response.data);
        }

        setIsLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setFormDataErrors({});

    await api
      .post("/users", formData)
      .then((response) => {
        // console.log(response);
        toast.success("Cadastro realizado com sucesso!");
        setFormData({});
        setIsLoading(false);
      })
      .catch((error) => {
        // Erro de validação dos dados
        if (error.status === 422) {
          setFormDataErrors(error.response.data.errors);
        } else {
          // console.log(error);
          toast.error(error.response.data);
        }

        setIsLoading(false);
      });
  };

  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
            <>
              <h1>Cadastrar produto</h1>
              <p>Cadastre novo produto ao estoque.</p>
            </>
          
          <Form>
            <Input
              type="text"
              name="nomeProduto"
              value={formData.nomeProduto}
              placeholder="Nome do produto"
              validateErrors={formDataErrors?.nomeProduto}
              onChange={(e) =>
                setFormData({ ...formData, nomeProduto: e.target.value })
              }
            />

            <Input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              placeholder="Quantidade"
              validateErrors={formDataErrors?.quantidade}
              onChange={(e) =>
                setFormData({ ...formData, quantidade: e.target.value })
              }
            />

             <Input
              type="money"
              name="preco"
              value={formData.preco}
              placeholder="Preço"
              validateErrors={formDataErrors?.preco}
              onChange={(e) =>
                setFormData({ ...formData, preco: e.target.value })
              }
            />

            <Button onClick={(e) => handleSubmit(e)}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
            
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CadastrarProduto;
