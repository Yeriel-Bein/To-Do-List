// 유저가 값을 입력한다.
// +버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 1. check 버튼을 클릭하면 isComplete가 true가 되고
// 2. true이면 끝난 걸로 간주하고 할일에 짝대기가 그어진다.
// 3. false이면 안끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 완료탭은, 끝난 아이템만, 진행중탭은 진행중 아이템만 나오게 한다.
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskTabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let mode = 'all';
let inPut = document.querySelector('input');

console.log("taskTabs",taskTabs)

taskTabs.forEach(menu=>menu.addEventListener("click", (e)=>tapsIndicator(e)))
inPut.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        addTask(e);
    }
})
addButton.addEventListener("click", addTask);

for(let i =1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)})
}
console.log(tabs);

function tapsIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft+"px";
    underLine.style.width = e.currentTarget.offsetWidth-5 + "px";
    underLine.style.top = e.currentTarget.offsetTop + (e.currentTarget.offsetHeight-4) +"px";
}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list=[]
    // 1. 내가 선택한 탭에 따라서 
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }
    // 2. 리스트를 달리 보여준다.
    
    
    let resultHTML = "";
    for(let i = 0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML +=`<div class = "task">
            <div class = task-done>${list[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${list[i].id}')" class = "rotate-left-button"><i class="fa-solid fa-arrow-rotate-left rotate-left"></i></button>
                <button onclick = "deleteTask('${list[i].id}')" class = "trash-can-button")"><i class="fa-solid fa-trash-can trash-can"></i></button>
            </div>
        </div>`;
        }else{resultHTML += `<div class = "task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')" class = "check-button"><i class="fa-solid fa-check check"></i></button>
                <button onclick = "deleteTask('${list[i].id}')" class = "trash-can-button"><i class="fa-solid fa-trash-can trash-can"></i></button>
            </div>
        </div>`;}
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
    console.log(taskList)
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    filter(event)
}

function filter(event){
    mode = event.target.id;
    filterList = []

    if(mode === "all"){
        // 전체 리스트를 보여준다.
        render();
    }else if(mode === "ongoing"){
        // 진행중인 아이템을 보여준다.
        // task.isComplete=false
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중", filterList);
    }else if(mode === "done"){
        // 끝나는 케이스
        // task.isComplete=true
        for(let i =0; i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }render();
    }
}