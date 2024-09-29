let idLivro = null;

async function conectaAPI() {
  const conexao = await fetch("http://localhost:3000/livros");
  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

function prepararEdicao(id) {
  idLivro = id;
  window.location.href = `editarLivro.html?id=${idLivro}`;
}

async function carregarDadosLivro() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    const livros = await conectaAPI();
    const livro = livros.find((livro) => livro.id == id);

    if (livro) {
      document.getElementById("inputNomeEditar").value = livro.titulo;
      document.getElementById("inputCapaEditar").value = livro.imagem;
      document.getElementById("inputGeneroEditar").value = livro.genero;
      document.getElementById("idLivroEditar").value = livro.id;
    } else {
      console.error("Livro não encontrado");
    }
  } else {
    console.error("ID não encontrado na URL");
  }
}

async function atualizaLivro(evento) {
  evento.preventDefault();

  const titulo = document.getElementById("inputNomeEditar").value;
  const genero = document.getElementById("inputGeneroEditar").value;
  const id = document.getElementById("idLivroEditar").value;
  const imagem = document.getElementById("inputCapaEditar").value;

  const response = await fetch(`http://localhost:3000/livros/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, imagem, genero }),
  });

  if (response.ok) {
    // alert("Livro atualizado com sucesso!");
    window.location.href = "estante.html";
  } else {
    console.error("Erro ao atualizar livro.");
  }
}

const form = document.getElementById("form-cadastroLivroEdicao");
form.addEventListener("submit", atualizaLivro);

window.onload = async () => {
  await carregarDadosLivro();
};
