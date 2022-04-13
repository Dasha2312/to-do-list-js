
let todoInput = document.getElementById('task-input');
let todoForm = document.getElementById('todo-form');
let todoitems = document.getElementById('todo-items');
let editModalText = document.querySelector('.modal-edit__text');
let currentText = null;
let currentId = null;
let arrayItems = [];
let nextId = 0;

document.querySelector('#task-input').style.height = '40px';
todoForm.addEventListener('submit', todoFormSend);

function todoFormSend(e) {
    e.preventDefault();
    let todoFormValue = todoInput.value;
    todoInput.value = '';
    
    if (todoFormValue == '') {
        return false;
    }

    document.querySelector('#task-input').style.height = '40px';
    // console.log(mapItems instanceof Map);
    nextId++;
    let obj_item = {
        id: nextId,
        title: todoFormValue,
        status: false,
        date: new Date(),
    }
    
    // mapItems.set(currentId, 7);

    arrayItems.push(obj_item);
    localStorage.setItem('items', JSON.stringify(arrayItems));
    //console.log(arrayItems);
    createNewItem(obj_item);
}

document.addEventListener('DOMContentLoaded', function(){
    arrayItems = JSON.parse(localStorage.getItem('items'));

    if(arrayItems !== null) {
        for(let i = 0; i < arrayItems.length; i++) {
            createNewItem(arrayItems[i]);
        }
    } else {
        arrayItems = [];
    }
});

//Create task
function createNewItem(obj_item) {
    
    
    let todoitem = document.createElement('li');
    todoitem.setAttribute('id', 'item_' + obj_item.id);
    todoitem.classList.add('todo-item');
    todoitems.append(todoitem);

    let todoitem_inner = document.createElement('div');
    todoitem_inner.classList.add('todoitem__inner');
    todoitem.append(todoitem_inner);

    let todoitem_check = document.createElement('span');
    todoitem_check.classList.add('todoitem__check');
    todoitem_check.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
    if(obj_item.status) {
        todoitem.classList.toggle('done');

    }
    todoitem_inner.append(todoitem_check);

    let todoitem_text = document.createElement('span');
    todoitem_text.classList.add('todoitem__text');
    todoitem_text.innerText = obj_item.title;
    todoitem_inner.append(todoitem_text);

    let todoitem_actions = document.createElement('div');
    todoitem_actions.classList.add('todoitem__actions');
    todoitem_inner.append(todoitem_actions);
    
    let todoitem_remove = document.createElement('button');
    todoitem_remove.setAttribute('type', 'button');
    todoitem_remove.classList.add('todoitem__action');
    todoitem_remove.classList.add('remove');
    todoitem_remove.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
    todoitem_actions.append(todoitem_remove);

    let todoitem_edit = document.createElement('button');
    todoitem_edit.setAttribute('type', 'button');
    todoitem_edit.classList.add('todoitem__action');
    todoitem_edit.classList.add('edit');
    todoitem_edit.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
    todoitem_actions.append(todoitem_edit);

    //Remove task
    todoitem_remove.addEventListener('click', function() {
        for(let i = 0; i < arrayItems.length; i++) {
            if(arrayItems[i].id == obj_item.id) {       
                arrayItems.splice(i, 1);
                localStorage.setItem('items', JSON.stringify(arrayItems));
                break;
            }
        }   
        this.closest('.todo-item').remove();     
    });

    //Check done task
    todoitem_check.addEventListener('click', function() {
        for(let i = 0; i < arrayItems.length; i++) {
            if(arrayItems[i].id == obj_item.id) {
                arrayItems[i].status = !arrayItems[i].status;   
                localStorage.setItem('items', JSON.stringify(arrayItems));
                console.log(arrayItems);
                break;
            }
        }
        this.closest('.todo-item').classList.toggle('done');
    })

    //Редактировать задание
    todoitem_edit.addEventListener('click', function() {
        document.querySelector('.modal-edit').classList.add('show');
        currentText = todoitem_text;
        currentId = obj_item.id;
        editModalText.innerText = todoitem_text.innerText;
    })
}


//Save task in modal
document.querySelector('.modal-footer__btn.btn-save').addEventListener('click', function() {
    arrayItems.forEach(function(el) {
        if(el.id == currentId) {       
            el.title = editModalText.value;
            localStorage.setItem('items', JSON.stringify(arrayItems));
            console.log(el);
        }
    })
    
    currentText.innerText = editModalText.value;
    
    document.querySelector('.modal-edit').classList.remove('show');
    currentText = null;
    currentId = null;
    document.querySelector('.modal-edit__text').style.height = '100px';
}) 


//Close modal
document.querySelectorAll('.btn-close').forEach(function(el) {
    el.addEventListener('click', function() {
        document.querySelector('.modal-edit').classList.remove('show');
    })
})

document.querySelectorAll('textarea').forEach(function(el) {
    el.addEventListener('input', function(){
        this.style.height = this.scrollHeight  + "px";
    });
})


//Cancel line break with Enter
todoInput.addEventListener('keypress', function(event) {
    if(event.code == 'Enter' ) {
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();

        todoForm.addEventListener('submit', todoFormSend);
    }
})


//Days
let days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
];
let now_day = (new Date()).getDay();
document.querySelector('.todo-block__name-day').innerHTML = days[now_day];

//Month
let months = [
    'Январь',
    'Феврать',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
] 

let month = (new Date()).getMonth();
let now_month = months[month];

var now_date = (new Date()).getDate(); 
var now_year = (new Date()).getFullYear();

document.querySelector('.todo-block__date').innerText = `${now_date} ${now_month} ${now_year}`;