async function conectaAPI() {
  const conexao = await fetch("http://198.168.208.51:3000/livros");
  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

let livrosFiltrados = [];
let livros = [];
let paginaAtual = 1;
const livrosPorPagina = 5;

async function inicializaTabela() {
  livros = await conectaAPI();
  renderizaTabela();
}

function renderizaTabela() {
  const tbody = document.querySelector(".table tbody");
  tbody.innerHTML = "";

  const livrosParaExibir =
    livrosFiltrados.length > 0 ? livrosFiltrados : livros;
  const inicio = (paginaAtual - 1) * livrosPorPagina;
  const fim = inicio + livrosPorPagina;
  const livrosExibidos = livrosParaExibir.slice(inicio, fim);

  livrosExibidos.forEach((livro) => {
    const tr = document.createElement("tr");
    tr.classList.add("linhaTabela");

    tr.innerHTML = `<td>
              <span class="texto-livro">${livro.titulo}</span>
              <button
                id="btnApagar"
                type="button"
                class="btn btn-outline-danger excluir"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onclick="prepararExclusao(${livro.id})"
              >
                Apagar
              </button>
              <button
                type="button"
                class="btn btn-outline-success editar"
                onclick="prepararEdicao(${livro.id})"
              >
                Editar
              </button>
            </td>`;
    tbody.appendChild(tr);
  });

  atualizaInformacoesPagina(livrosParaExibir.length);
}

function atualizaInformacoesPagina(totalLivros) {
  const pageInfo = document.getElementById("page-info");
  const totalPaginas = Math.ceil(totalLivros / livrosPorPagina);
  pageInfo.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
}

function changePage(delta) {
  const totalLivros =
    livrosFiltrados.length > 0 ? livrosFiltrados.length : livros.length;
  const totalPaginas = Math.ceil(totalLivros / livrosPorPagina);
  paginaAtual += delta;

  if (paginaAtual < 1) {
    paginaAtual = 1;
  } else if (paginaAtual > totalPaginas) {
    paginaAtual = totalPaginas;
  }

  renderizaTabela();
}

const pesquisaTabela = document.getElementById("formPesquisa");
pesquisaTabela.addEventListener("submit", function (event) {
  event.preventDefault();
  const pesquisa = document.getElementById("campoPesquisa").value.toLowerCase();
  const linhas = document.querySelectorAll(".linhaTabela");

  linhas.forEach((linha) => {
    const livro = linha.textContent.toLowerCase();
    if (livro.includes(pesquisa)) {
      linha.style.display = "";
    } else {
      linha.style.display = "none";
    }
  });
});

window.onload = inicializaTabela;
