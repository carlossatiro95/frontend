import { useEffect, useState } from "react";
import "./App.css";
import CardProduto from "./componentes/CardProduto";

function App() {
  const [produto, setProduto] = useState({
    nome: "",
    preço: "",
  });

  const [listaProdutos, setListaProdutos] = useState([]);

  async function cadastrarProduto(e) {
    e.preventDefault();

    try {
      const resultado = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(produto),
      });

      const produtoCadastrado = await resultado.json();

      setListaProdutos([...listaProdutos, produtoCadastrado]);
    } catch (error) {}
  }

  async function carregarLista() {
    try {
      const resultado = await fetch("http://localhost:3000/produtos", {
        method: "GET",
      });

      const listaCarregada = await resultado.json();

      setListaProdutos(listaCarregada);
    } catch (error) {}
  }

  useEffect(() => {
    carregarLista();
  }, []);

  async function editarProduto(idProduto, editarProduto) {
    try {
      const resultado = await fetch(
        `http://localhost:3000/produtos/${idProduto}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(editarProduto),
        },
      );

      const produtoAtualizado = await resultado.json();

      setListaProdutos(
        listaProdutos.map((produtoMap) =>
          produtoMap.id === produtoAtualizado.id
            ? produtoAtualizado
            : produtoMap,
        ),
      );
    } catch (error) {}
  }

  async function excluirProduto(idProduto) {
    try {
      const resultado = await fetch(
        `http://localhost:3000/produtos/${idProduto}`,
        {
          method: "DELETE",
        },
      );

      setListaProdutos(
        listaProdutos.filter((produtoFilter) => produtoFilter.id !== idProduto),
      );
    } catch (error) {}
  }

  async function excluirTudo() {
    try {
      await Promise.all(
        listaProdutos.map((produtoMap) =>
          fetch(`http://localhost:3000/produtos/${produtoMap.id}`, {
            method: "DELETE",
          }),
        ),
      );

      setListaProdutos([]);
    } catch (error) {}
  }

  return (
    <div className="container">
      <div className="box-form">
        <form onSubmit={cadastrarProduto}>
          <h1>Cadastro de produtos</h1>
          <input
            type="text"
            placeholder="Nome"
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          />
          <input
            type="number"
            placeholder="Preço"
            value={produto.preço}
            onChange={(e) => setProduto({ ...produto, preço: e.target.value })}
          />
          <button className="button-submit">Cadastrar</button>
        </form>
      </div>
      <div className="box-produtos">
        {listaProdutos.map((produtoMap) => (
          <CardProduto
            id={produtoMap.id}
            produto={produtoMap}
            editarProduto={editarProduto}
            excluirProduto={excluirProduto}
          />
        ))}
      </div>
      {listaProdutos.length > 0 && (
        <button className="delete-all" onClick={excluirTudo}>
          Excluir Tudo
        </button>
      )}
    </div>
  );
}

export default App;
