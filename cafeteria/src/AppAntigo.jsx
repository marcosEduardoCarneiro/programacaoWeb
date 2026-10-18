import { useState, useRef } from "react";
import "./App.css";
import Item from "./variaveis/a3/Item";

function App() {
  // Estado para lista de pratos
  const [cardapio, setCardapio] = useState([
    { id: 1, nome: "hamburgao", preco: 19.99, disponivel: true },
    { id: 2, nome: "chicletinho", preco: 3.99, disponivel: true },
    { id: 3, nome: "pimenta", preco: 4.99, disponivel: false },
    { id: 4, nome: "pizza", preco: 14.99, disponivel: true },
    { id: 5, nome: "pastelinho", preco: 1.99, disponivel: false },
  ]);

  // Estado para input controlado
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  // Contador de ids (começa em 6 porque os pratos iniciais vão de 1 a 5)
  const proximoId = useRef(6);

  // Criar prato
  const adicionarPrato = (e) => {
    e.preventDefault();

    const precoNumero = parseFloat(preco);
    if (nome.trim() === "" || isNaN(precoNumero) || precoNumero <= 0) return;

    const novoPrato = {
      id: proximoId.current++,
      nome: nome.trim(),
      preco: precoNumero,
      disponivel: true,
    };

    setCardapio((anterior) => [...anterior, novoPrato]);
    setNome("");
    setPreco("");
  };

  // Remover prato
  const removerPrato = (id) => {
    setCardapio((anterior) => anterior.filter((p) => p.id !== id));
  };

  // Alternar disponibilidade
  const alternarDisponibilidade = (id) => {
    setCardapio((anterior) =>
      anterior.map((p) =>
        p.id === id ? { ...p, disponivel: !p.disponivel } : p
      )
    );
  };

  return (
    <>
      <header>
        <h1>Negoney's Cafeterias</h1>
        <p className="frase-motivacional-do-negoneyson">
          <em>Nossos produtos, seu sorriso</em>
        </p>
      </header>

      <main>
        <section className="cardapio">
          <h1>Cardápio</h1>
          <hr />

          {/* Formulário controlado */}
          <form onSubmit={adicionarPrato}>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do prato"
              aria-label="Nome do prato"
            />
            <input
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Preço"
              aria-label="Preço do prato"
              type="number"
              step="0.01"
              min="0"
            />
            <button type="submit">Adicionar</button>
          </form>

          {/* Lista de pratos */}
          <ul>
            {cardapio.length === 0 ? (
              <li className="vazio">Nenhum prato no cardápio.</li>
            ) : (
              cardapio.map((prato) => (
                <li
                  key={prato.id}
                  className={`item ${!prato.disponivel ? "indisponivel" : ""}`}
                >
                  <Item
                    nome={prato.nome}
                    preco={prato.preco}
                    disponivel={prato.disponivel}
                  />
                  <div>
                    <button onClick={() => alternarDisponibilidade(prato.id)}>
                      {prato.disponivel ? "Esgotar" : "Disponibilizar"}
                    </button>
                    <button onClick={() => removerPrato(prato.id)}>Remover</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </section>
      </main>

      <footer>
        <p id="copyright">
          &copy; Negoney's Cafeterias - Produzido por Marcos Eduardo & Erik Domnick
        </p>
      </footer>
    </>
  );
}

export default App;