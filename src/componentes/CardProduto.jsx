import { useState } from "react";

function CardProduto({ produto, editarProduto }) {
  const [produtoEditado, setProdutoEditado] = useState({
    nome: produto.nome,
    preço: produto.preço,
  });

  const [editando, setEditando] = useState(false);

  function salvarEdição() {
    editarProduto(produto.id, produtoEditado);
    setEditando(false);
  }

  return (
    <div className="produto">
      {editando ? (
        <div className="inputs-editar">
          <input
            type="text"
            placeholder="Nome"
            value={produtoEditado.nome}
            onChange={(e) =>
              setProdutoEditado({ ...produtoEditado, nome: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Preço"
            value={produtoEditado.preço}
            onChange={(e) =>
              setProdutoEditado({ ...produtoEditado, preço: e.target.value })
            }
          />
        </div>
      ) : (
        <div className="info-produto">
          <p>
            Nome: <span>{produto.nome}</span>
          </p>
          <p>
            Preço: <span>{produto.preço}</span>
          </p>
        </div>
      )}

      <div className="buttons-action">
        {editando ? (
          <button onClick={salvarEdição}>Salvar</button>
        ) : (
          <button onClick={() => setEditando(true)}>Editar</button>
        )}
        <button>Excluir</button>
      </div>
    </div>
  );
}
export default CardProduto;
