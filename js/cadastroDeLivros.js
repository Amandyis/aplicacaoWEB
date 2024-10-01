async function conectaAPI() {
  const conexao = await fetch("http://192.168.208.51:3000/livros");
  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function criaLivro(id, titulo, imagem, genero) {
  const conexao = await fetch("http://192.168.208.51:3000/livros", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      titulo: titulo,
      imagem: imagem,
      genero: genero,
    }),
  });

  const conexaoConvertida = await conexao.json();
  return conexaoConvertida;
}

async function cadastraLivro(evento) {
  evento.preventDefault();

  const titulo = document.getElementById("inputNome").value;
  const genero = document.getElementById("inputGenero").value;
  const id = document.getElementById("idLivro").value;
  const imagem = document.getElementById("inputCapa").value;

  await criaLivro(id, titulo, imagem, genero);

  window.location.href = "controleDeLivros.html";
}

const formulario = document.getElementById("form-cadastroLivro");
formulario.addEventListener("submit", (evento) => cadastraLivro(evento));
