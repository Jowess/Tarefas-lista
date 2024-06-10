const exibeTarefas = () => {

    const tabela = document.getElementById('idAgenda');//pega a tabela
    const table  = tabela.querySelector('tbody');//pega o corpo da tabela

    table.innerHTML =

   ` <tr>
    <th>Data</th>
    <th>Nome </th>
    <th>Status</th>
    <th>Editar</th>
    <th>Excluir</th>
    
    </tr>`;
    
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // || "OU"

    tarefas.forEach((tarefa, index) => {
        const data = new Date(tarefa.data).toLocaleDateString();   
        const conteudoTarefa =
        
        `<tr>

        <td>${data}</td>
        <td>${tarefa.nome}</td>
        <td>${tarefa.status}</td>
        
        
        <td><button class="btnEditar" onclick="editaTarefa(${index})"><i class="fa fa-edit"></i></button></td>   
        <td><button class="btnExcluir" onclick="excluirTarefa(${index})"><i class="fa fa-trash"></i></button></td>   
       </tr>`

       const row = table.insertRow();
        row.innerHTML = conteudoTarefa;
        
    });
}
   
 const addTarefa = (event) => {

     event.preventDefault();
     
     let nome =document.getElementById('idNomeTarefa').value.trim();
     let status =document.getElementById('idStatus').value.trim();
     let data =document.getElementById('idData').value.trim();
     let camposVazios = [];   
     const form = document.getElementById('idResult')
     if(nome == "") {

        camposVazios.push("Nome");

     }
  
     if(status == "") {

        camposVazios.push("Status")
     }

     if(data == "") [

        camposVazios.push("Data")

     ]
     else{

     const tarefa = { //criando um objeto para armazenar os dados

        nome:nome,
        status:status,
        data:data,

     }
      //buscar os contatos já salvos OU criar um array vazio
      let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        
      tarefas.push(tarefa); //adiciona um novo CONTATO dentro da lista CONTATOS
      localStorage.setItem('tarefas', JSON.stringify(tarefas));

      form.reset();
      exibeTarefas();
  }
 } 

 const excluirTarefa = (index) => {
 //pega lista de contatos

 let tarefas = JSON.parse(localStorage.getItem('tarefas')) ||  [];

//removo o item da lista CONTATOS pelo index, o numero 1 significa que ele deve  
    //remover apenas 1 elemento da lista
    tarefas.splice(index, 1); 
    
 localStorage.setItem('tarefas', JSON.stringify(tarefas));
 exibeTarefas();


 }
 
 const editaTarefa = (index) => {
 const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
 const tarefa = tarefas [index];
  
 document.getElementById('idNomeTarefa').value = tarefa.nome;
 document.getElementById('idStatus').value = tarefa.status;
 document.getElementById('idData').value = tarefa.data;

 const atualizaTarefa = (event) => {
    event.preventDefault();

    tarefa.nome = document.getElementById('idNomeTarefa').value.trim();
    tarefa.status = document.getElementById('idStatus').value.trim();
    tarefa.data = document.getElementById('idData').value.trim();
     
    const upTarefa = JSON.stringify(tarefas)
    localStorage.setItem('tarefas', upTarefa)

    exibeTarefas();
    document.getElementById('idResult').reset();

    document.querySelector('#adicionar').removeEventListener('click', atualizaTarefa);
    document.querySelector('#adicionar').addEventListener('click', addTarefa);
    
    
}
  
document.querySelector('#adicionar').removeEventListener('click', addTarefa);
document.querySelector('#adicionar').addEventListener('click', atualizaTarefa);

 }
 //função que vai inicializar a apliação
const init = () => {
  
    document.querySelector('#adicionar').addEventListener('click', addTarefa);

}

init(); //inicializo a aplicação
