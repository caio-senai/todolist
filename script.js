// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o modal e os botões necessários
  const modal = document.getElementById("modal"); // Referência ao modal
  const openModal = document.getElementById("open-modal"); // Botão para abrir o modal
  const closeModal = document.getElementsByClassName("close")[0]; // Botão para fechar o modal
  const addTaskButton = document.getElementById("adicionar-tarefa"); // Botão para adicionar tarefa
  
  // Objeto que contém referências às listas de tarefas
  const taskLists = {
    "tarefas": document.getElementById("lista-tarefas"),
    "em-andamento": document.getElementById("lista-em-andamento"),
    "em-revisao": document.getElementById("lista-em-revisao"),
    "concluido": document.getElementById("lista-concluido")
  };

  let draggingElement = null; // Variável para rastrear o elemento que está sendo arrastado

  // Função para abrir o modal
  openModal.onclick = function () {
    modal.style.display = "block"; // Exibe o modal
  };

  // Função para fechar o modal
  closeModal.onclick = function () {
    modal.style.display = "none"; // Oculta o modal
  };

  // Fecha o modal ao clicar fora dele
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none"; // Oculta o modal
    }
  };

  // Evento ao clicar no botão de adicionar tarefa
  addTaskButton.addEventListener('click', function () {
    const taskInput = document.getElementById("nova-tarefa").value; // Obtém o valor do input
    if (taskInput === "") return alert("Por favor, insira uma tarefa."); // Valida se o campo está vazio

    // Cria um novo item de lista
    const taskItem = document.createElement("li");
    taskItem.textContent = taskInput; // Define o texto do item
    taskItem.setAttribute("draggable", true); // Torna o item arrastável
    taskItem.style.backgroundColor = "white"; // Define a cor padrão do item

    // Cria um botão de remover para a tarefa
    const removeButton = document.createElement("button");
    removeButton.classList.add("remover-tarefa"); // Adiciona classe para estilização
    removeButton.textContent = "X"; // Define o texto do botão como "X"
    removeButton.onclick = function () {
      taskItem.remove(); // Remove o item da lista ao clicar
    };

    // Adiciona o botão de remover ao item de tarefa
    taskItem.appendChild(removeButton);
    // Adiciona o item à lista de tarefas
    taskLists.tarefas.appendChild(taskItem);
    modal.style.display = "none"; // Fecha o modal após adicionar a tarefa
    document.getElementById("nova-tarefa").value = ""; // Limpa o input de tarefa

    // Evento para iniciar o arrasto do item
    taskItem.addEventListener('dragstart', function () {
      draggingElement = taskItem; // Rastreia o item arrastado
      setTimeout(() => taskItem.style.display = 'none', 0); // Esconde o item enquanto está sendo arrastado
    });

    // Evento para finalizar o arrasto do item
    taskItem.addEventListener('dragend', function () {
      setTimeout(() => {
        draggingElement.style.display = 'flex'; // Restaura a exibição do item
        draggingElement = null; // Limpa a referência ao item arrastado
      }, 0);
    });

    // Adiciona eventos de arrasto às listas de tarefas
    Object.values(taskLists).forEach(list => {
      // Permite que a lista aceite itens arrastáveis
      list.addEventListener('dragover', e => e.preventDefault());

      // Define o que acontece ao soltar um item na lista
      list.addEventListener('drop', e => {
        if (draggingElement) {
          list.appendChild(draggingElement); // Move o item para a nova lista
          updateTaskColor(list, draggingElement); // Atualiza a cor do item com base na lista
        }
      });
    });
  });

  // Função para atualizar a cor do item com base na lista onde foi solto
  function updateTaskColor(list, taskItem) {
    if (list.id === "em-andamento") {
      taskItem.style.backgroundColor = "orange"; // Cor para a lista "em andamento"
    } else if (list.id === "em-revisao") {
      taskItem.style.backgroundColor = "purple"; // Cor para a lista "em revisão"
    } else if (list.id === "concluido") {
      taskItem.style.backgroundColor = "gray"; // Cor para a lista "concluído"
    } else {
      taskItem.style.backgroundColor = "gray"; // Cor padrão para a lista geral
    }
  }
});