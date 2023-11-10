let inputNovaTarefa = document.querySelector("#inputNovaTarefa");
let btnAddTarefa = document.querySelector("#btnAddTarefa");
let listaTarefas = document.querySelector("#listaTarefas");
let janelaEdicao = document.querySelector("#janelaEdicao");
let janelaEdicaoFundo = document.querySelector("#janelaEdicaoFundo");
let janelaEdicaoBtnFechar = document.querySelector("#janelaEdicaoBtnFechar");
let btnAtualizarTarefa = document.querySelector("#btnAtualizarTarefa");
let idTarefaEdicao = document.querySelector("#idTarefaEdicao");
let inputTarefaNomeEdicao = document.querySelector("#inputTarefaNomeEdicao");
const qtdIdsDisponiveis = Number.MAX_VALUE;
const mode = document.getElementById("mode_icon"); // Pega a referência para o elemento HTML com o ID "mode_icon" e armazena na variável "mode"

mode.addEventListener("click", () => {
  const form = document.querySelector(".conteudo");

  if (mode.classList.contains("fa-moon")) {
    // Adiciona a classe "dark-mode" ao body quando ativar o modo escuro
    document.body.classList.add("dark-mode");

    // Restante do código...
  } else {
    // Remove a classe "dark-mode" do body quando desativar o modo escuro
    document.body.classList.remove("dark-mode");

    // Restante do código...
  }
});

// Adiciona um ouvinte de evento de clique ao elemento "mode"
mode.addEventListener("click", () => {
  const form = document.getElementById(".conteudo"); // Pega a referência para o elemento HTML com o ID "login_form" e armazena na variável "form"

  // Verifica se a classe CSS "fa-moon" está presente no elemento "mode"
  if (mode.classList.contains("fa-moon")) {
    mode.classList.remove("fa-moon"); // se a classe "fa-moon" estiver presente, significa que o ícone atual é a lua (modo escuro)
    mode.classList.add("fa-sun"); // Adiciona a classe "fa-sun" ao elemento "mode" (troca o ícone para o sol)

    form.classList.add("dark"); // Adiciona a classe "dark" ao elemento "form" (ativa o modo escuro)
    return; // Sai da função de clique
  }
  // Se a classe "fa-moon" não estiver presente, significa que o ícone atual é o sol (modo claro)
  mode.classList.remove("fa-sun"); // Remove a classe "fa-sun" do elemento "mode"
  mode.classList.add("fa-moon"); // Adiciona a classe "fa-moon" ao elemento "mode" (troca o ícone para a lua)

  form.classList.remove("dark"); // Remove a classe "dark" do elemento "form" (desativa o modo escuro)
});

inputNovaTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    let tarefa = {
      nome: inputNovaTarefa.value,
      id: gerarIdV2(),
    };
    adicionarTarefa(tarefa);
  }
});

janelaEdicaoBtnFechar.addEventListener("click", (e) => {
  alternarJanelaEdicao();
});

btnAddTarefa.addEventListener("click", (e) => {
  let tarefa = {
    nome: inputNovaTarefa.value,
    id: gerarIdV2(),
  };
  adicionarTarefa(tarefa);
});

btnAtualizarTarefa.addEventListener("click", (e) => {
  e.preventDefault();

  let idTarefa = idTarefaEdicao.innerHTML.replace("#", "");

  let tarefa = {
    nome: inputTarefaNomeEdicao.value,
    id: idTarefa,
  };

  let tarefaAtual = document.getElementById("" + idTarefa + "");

  if (tarefaAtual) {
    let li = criarTagLI(tarefa);
    listaTarefas.replaceChild(li, tarefaAtual);
    alternarJanelaEdicao();
  } else {
    alert("Elemento HTML não encontrado!");
  }
});

function gerarId() {
  return Math.floor(Math.random() * qtdIdsDisponiveis);
}

function gerarIdV2() {
  return gerarIdUnico();
}

function gerarIdUnico() {
  // debugger;
  let itensDaLista = document.querySelector("#listaTarefas").children;
  let idsGerados = [];

  for (let i = 0; i < itensDaLista.length; i++) {
    idsGerados.push(itensDaLista[i].id);
  }

  let contadorIds = 0;
  let id = gerarId();

  while (
    contadorIds <= qtdIdsDisponiveis &&
    idsGerados.indexOf(id.toString()) > -1
  ) {
    id = gerarId();
    contadorIds++;

    if (contadorIds >= qtdIdsDisponiveis) {
      alert("Oops, ficamos sem IDS :/");
      throw new Error("Acabou os IDs :/");
    }
  }

  return id;
}

function adicionarTarefa(tarefa) {
  let li = criarTagLI(tarefa);
  listaTarefas.appendChild(li);
  inputNovaTarefa.value = "";
}

function criarTagLI(tarefa) {
  let li = document.createElement("li");
  li.id = tarefa.id;

  let span = document.createElement("span");
  span.classList.add("textoTarefa");
  span.innerHTML = tarefa.nome;

  let div = document.createElement("div");

  let btnEditar = document.createElement("button");
  btnEditar.classList.add("btnAcao");
  btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
  btnEditar.setAttribute("onclick", "editar(" + tarefa.id + ")");

  let btnExcluir = document.createElement("button");
  btnExcluir.classList.add("btnAcao");
  btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
  btnExcluir.setAttribute("onclick", "excluir(" + tarefa.id + ")");

  div.appendChild(btnEditar);
  div.appendChild(btnExcluir);

  li.appendChild(span);
  li.appendChild(div);
  return li;
}

function editar(idTarefa) {
  let li = document.getElementById("" + idTarefa + "");
  if (li) {
    idTarefaEdicao.innerHTML = "#" + idTarefa;
    inputTarefaNomeEdicao.value = li.innerText;
    alternarJanelaEdicao();
  } else {
    alert("Elemento HTML não encontrado!");
  }
}

function excluir(idTarefa) {
  let confirmacao = window.confirm("Tem certeza que deseja excluir? ");
  if (confirmacao) {
    let li = document.getElementById("" + idTarefa + "");
    if (li) {
      listaTarefas.removeChild(li);
    } else {
      alert("Elemento HTML não encontrado!");
    }
  }
}

function alternarJanelaEdicao() {
  janelaEdicao.classList.toggle("abrir");
  janelaEdicaoFundo.classList.toggle("abrir");
}
