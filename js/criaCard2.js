async function conectaAPI() {
  const conexao = await fetch("http://192.168.208.51:3000/livros");
  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

const section = document.querySelector(".teste-card");
let livros = [];

function criarCard(genero, imagem) {
  const card = document.createElement("div");
  card.classList.add("card", "a");
  card.style.width = "13rem";

  card.innerHTML = `<img src="${imagem}" class="card-img-top capa" alt="...">
  <div class="card-body">
    <h5 class="card-title genero">${genero}</h5>
  </div>`;

  return card;
}

async function listaLivros() {
  livros = await conectaAPI();
  renderizaCards(livros);
}

function renderizaCards(livros) {
  section.innerHTML = "";
  livros.forEach((elemento) =>
    section.appendChild(criarCard(elemento.genero, elemento.imagem))
  );
}

function filtrarLivros(evento) {
  evento.preventDefault();
  const termoDeBusca = document
    .getElementById("campoPesquisaEstante")
    .value.toLowerCase();

  const livrosFiltrados = livros.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(termoDeBusca) ||
      livro.genero.toLowerCase().includes(termoDeBusca)
  );
  renderizaCards(livrosFiltrados);
}

const botaoDePesquisa = document.getElementById("formPesquisaEstante");
botaoDePesquisa.addEventListener("submit", filtrarLivros);

window.onload = listaLivros;
