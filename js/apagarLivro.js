let livroIdParaExcluir = null;

async function conectaAPI() {
  const conexao = await fetch("http://localhost:3000/livros");
  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function inicializaTabela() {
  livros = await conectaAPI();
  renderizaTabela();
}

function prepararExclusao(id) {
  livroIdParaExcluir = id;
}

async function excluirLivroTabela() {
  if (livroIdParaExcluir === null) return;

  try {
    await fetch(`http://localhost:3000/livros/${livroIdParaExcluir}`, {
      method: "DELETE",
    });

    livros = livros.filter((livro) => livro.id !== livroIdParaExcluir);

    renderizaTabela();
    livroIdParaExcluir = null;
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
  }
}

const botaoDeExcluir = document.getElementById("botaoExcluir");
botaoDeExcluir.addEventListener("click", excluirLivroTabela);
