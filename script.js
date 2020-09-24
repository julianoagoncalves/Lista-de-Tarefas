//referenciando variaveis com elementos html
let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');
let todos = JSON.parse(localStorage.getItem('list_todos')) || [];

//função que renderiza lista
function renderTodos() {
    listElement.innerHTML = '';

    for(todo of todos) {
        //criando um elemento item da lista
        let todoElement = document.createElement('li');
        //adicionando texto no item da lista
        let todoText = document.createTextNode(todo);
        //criando elemento link no item da lista
        let linkElement = document.createElement('a');
        //setando atributo href do link
        linkElement.setAttribute('href','#');

        let pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick','deleteTodo('+pos+')')
        //texto do link
        let linkText = document.createTextNode(' - Excluir');

        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        listElement.appendChild(todoElement);
    }
}

//função que adiciona itens a lista
function addTodo() {

    //condição que verifica se input text esta vazio 
    if (inputElement.value != '') {
        //declarando variavel todoText que recebe valor de input text
        let todoText = inputElement.value;
        //função que adiciona elementos em um array
        todos.push(todoText);
        //removendo conteudo do input text
        inputElement.value = '';
        //chamando função que renderiza lista
        renderTodos();
        //chamando função que sava lista no storage
        saveToStorage();
        //função que focaliza input text
        document.querySelector('#app input').focus();
    }
    else{
        //alerta para usuario de que input text esta vazio
        alert('Digite alguma tarefa para ser adicionada');
        document.querySelector('#app input').focus();
    }
}

//evento de clicar no botão que chama função para adiciona item na lista
buttonElement.onclick = addTodo;

//função que deleta itens da lista
function deleteTodo(pos) {
    todos.splice(pos,1)
    renderTodos();
    saveToStorage();
    document.querySelector('#app input').focus();
}

//função que salva lista no storage
function saveToStorage() {
    //setando itens na variavel global
    //localStorage.setItem('list_todos', JSON.stringify(todos));
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

renderTodos();