const localStorageId = 'to-do-list'

function validateIfExistsNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageId) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists = values.find(x => x.task == inputValue)
    return !exists ? false : true
}

function newTask(){
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    if(!input.value){
        input.style.border = '1px solid red'
        alert('Digite a nova tarefa para a lista')
    }
    else if(validateIfExistsNewTask()){
        alert('Já existe uma task com esse nome')
    }
    else{
        let values = JSON.parse(localStorage.getItem(localStorageId) || "[]")
        values.push({
            task: input.value
        })
        localStorage.setItem(localStorageId,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageId) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['task']}<button id='btn-ok' onclick='removeTask("${values[i]['task']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>svg></button></li>`
    }
}

function removeTask(data){
    let values = JSON.parse(localStorage.getItem(localStorageId) || "[]")
    let index = values.findIndex(x => x.task == data)
    values.splice(index,1)
    localStorage.setItem(localStorageId,JSON.stringify(values))
    showValues()
}

showValues()