function Item({ nome, preco, disponivel }) {
  return (
    <>
      <h3>{nome}</h3>
      <p>
        {preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        {disponivel ? "" : " (esgotado)"}
      </p>
    </>
  );
}

export default Item;