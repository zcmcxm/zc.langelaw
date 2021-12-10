//add current year to copyright
let d = new Date();
document.getElementById('currentYear').innerHTML = d.getFullYear();

let section = document.querySelector("section");
let button = document.querySelector("form button");

//load data from localStorage
loadData();

function loadData(){
    let list = localStorage.getItem("list");
    if(list!=null){
        let listArr = JSON.parse(list);
        listArr.forEach(element => {
            let todoText = element.todoText;
            //add one to do list element
            addOneThingToDo(todoText);
        });
    }
}

function addOneThingToDo(todoText){
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
}

button.addEventListener("click", e => {
    e.preventDefault();

    let todoText = e.target.parentElement.children[0].value;

    //clear input after submit
    e.target.parentElement.children[0].value = "";

    //add one to do list element
    addOneThingToDo(todoText);
    
    //store data into localStorage
    let todoObj = {
        todoText: todoText
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

function merge(arr1,arr2){
    let result = [];
    let i = 0;
    let j = 0;
    while(i<arr1.length && j<arr2.length){
        if(arr1[i].todoText<arr2[j].todoText){
            result.push(arr1[i]);
            i++;
        } else if(arr1[i].todoText>arr2[j].todoText){
            result.push(arr2[j]);
            j++;
        } else{
            result.push(arr1[i]);
            result.push(arr2[j]);
            i++;
            j++;
        }
    }

    while(i<arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while(j<arr2.length){
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr){
    if(arr.length<=1){
        return arr;
    }
    let middle = Math.floor(arr.length/2);

    let left = mergeSort(arr.slice(0,middle));
    let right = mergeSort(arr.slice(middle));

    return merge(left,right);
}

let sortButton = document.querySelector("button.sort");
sortButton.addEventListener("click", e => {
    let sortedListArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    localStorage.setItem("list", JSON.stringify(sortedListArray));

    //delete current elements
    let length = section.children.length;
    for(let i = 0; i<length; i++){
        section.children[0].remove();
    }

    //load data from localStorage
    loadData();
});

