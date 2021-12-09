//add current year to copyright
let d = new Date();
document.getElementById('currentYear').innerHTML = d.getFullYear();

let section = document.querySelector("section");
let button = document.querySelector("form button");

let list = localStorage.getItem("list");
if(list!=null){
    let listArr = JSON.parse(list);
    listArr.forEach(element => {
        let todoText = element.todoText;
        let oneThingToDo = document.createElement("div");
        oneThingToDo.classList.add("todo-element");
        oneThingToDo.style.animation = "emerge 0.3s forwards";

        //add todo text  
        let todoContent = document.createElement("p");
        todoContent.classList.add("todo-text");
        todoContent.innerText = todoText;

        //add icons
        let check = document.createElement("button");
        check.classList.add("check");
        check.innerHTML = '<i class="fas fa-check"></i>';
        check.addEventListener("click", e => {
            e.target.parentElement.classList.toggle("done");
        });

        let trash = document.createElement("button");
        trash.classList.add("trash");
        trash.innerHTML = '<i class="fas fa-trash"></i>';
        trash.addEventListener("click", e => {
            list = localStorage.getItem("list");
            listArr = JSON.parse(list);
            listArr.splice(listArr.indexOf(e.target.parentElement.children[0].value,1));
            localStorage.setItem("list",JSON.stringify(listArr));
            e.target.parentElement.style.animation = "disappear 0.3s forwards";
            e.target.parentElement.addEventListener("animationend", () => {
                e.target.parentElement.remove();
            });
        });
        oneThingToDo.appendChild(todoContent);
        oneThingToDo.appendChild(check);
        oneThingToDo.appendChild(trash);

        section.appendChild(oneThingToDo);
    });
}

button.addEventListener("click", e => {
    e.preventDefault();

    let todotext = e.target.parentElement.children[0].value;

    //clear input after submit
    e.target.parentElement.children[0].value = "";
    
    let oneThingToDo = document.createElement("div");
    oneThingToDo.classList.add("todo-element");
    oneThingToDo.style.animation = "emerge 0.3s forwards";

    //add todo text  
    let todoContent = document.createElement("p");
    todoContent.classList.add("todo-text");
    todoContent.innerText = todotext;

    //add icons
    let check = document.createElement("button");
    check.classList.add("check");
    check.innerHTML = '<i class="fas fa-check"></i>';
    check.addEventListener("click", e => {
        e.target.parentElement.classList.toggle("done");
    });

    let trash = document.createElement("button");
    trash.classList.add("trash");
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.addEventListener("click", e => {
        list = localStorage.getItem("list");
        listArr = JSON.parse(list);
        listArr.splice(listArr.indexOf(e.target.parentElement.children[0].value,1));
        localStorage.setItem("list",JSON.stringify(listArr));
        e.target.parentElement.style.animation = "disappear 0.3s forwards";
        e.target.parentElement.addEventListener("animationend", () => {
            e.target.parentElement.remove();
        });
    });
    
    oneThingToDo.appendChild(todoContent);
    oneThingToDo.appendChild(check);
    oneThingToDo.appendChild(trash);

    section.appendChild(oneThingToDo);

    //store data into localStorage
    let todoObj = {
        todoText: todotext
    };

    let list = localStorage.getItem("list");
    if(list == null){
        localStorage.setItem("list",JSON.stringify([todoObj]))
    }else{
        let listArr = JSON.parse(list);
        listArr.push(todoObj);
        localStorage.setItem("list",JSON.stringify(listArr));
    }
});

