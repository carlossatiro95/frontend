
import './App.css'

function App() {

  return (
    <div className="container">
      <div className="box-form">
        <form>
          <h1>Cadastro de produtos</h1>
          <input type="text" name="" id="" placeholder='Nome' />
          <input type="number" name="" id="" placeholder='Preço' />
          <button className='button-submit'>Cadastrar</button>
        </form>
      </div>
      <div className="box-produtos">
        <div className="produto">
          <div className="info-produto">
            <p>Nome: <span>Teste</span></p>
            <p>Preço: <span>000</span></p>
          </div>
          <div className="buttons-action">
            <button>Editar</button>
            <button>Excluir</button>
          </div>
        </div>
      </div>
      <button className='delete-all'>Excluir Tudo</button>
    </div>
  )
}

export default App
