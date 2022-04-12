const addTaskBtn = document.getElementById('button-create')
const nameTask = document.getElementById('name')
const descrTask = document.getElementById('dscr')
const radioTask = document.getElementById('radio__create')
const timeTask1 = document.getElementById('cron1')
const timeTask2 = document.getElementById('cron2')
const wrapperTask = document.querySelector('.general-wrapper')

let tasks;
let todoEl = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(nameofTask, description, radio, time1, time2) {
    this.nameofTask = nameofTask;
    this.description = description;
    this.radio = radio;
    this.time1 = time1;
    this.time2 = time2;
    this.completed = false;
}


const createTemplate = (task, index) => {
    let count = 0;

    return `
        <div class="task-content ${task.completed ? 'image__class' : ''}"> 
        <div class="create__task__style ">
      <input type="name" placeholder="Enter name" name="name" value = ${task.description} required>

      <div class="wrapper__filter">
      <label class="radio__wrapper">
         
          <input type="radio" id="work" ${task.radio} /> <label for="work">Work</label>

          <input type="radio" id="rest" /> <label for="rest">Rest</label>

          <input type="radio" id="shopping" /> <label for="shopping">Shopping</label>

          <input type="radio" id="family" /> <label for="family">Family</label>

          <input type="radio" id="celebration" /> <label for="celebration">Celebration</label>

          <input type="radio" id="help" /> <label for="help">Help</label>
      </div>
      <div class="task__description">
        <textarea type="description" placeholder="Enter description" name="dscr" required>${task.nameofTask}</textarea>
      </div>
    </div>
    <div class="task__time">
      <img id ="image" onclick ="completeTask(${index})" onclick = "imagesrc()" class = "image__class" src="img/starnon.png" width="45px" height="45px ">
      <script language="javascript"> 
        var i=0; 
        var image=document.getElementById("image"); 
        var imgs=new Array('img/starnon.png','img/staract.png'); 
        function imagesrc() { 
            i++; 
            i%=imgs.length;
            image.src=imgs[i]; 
        } 
        </script>
      <label class="wrapper__time">Time</label>
      <input type="time" name="cron" value = ${task.time1}>
      <input type="time" name="cron" value = ${task.time2}>

    </div>

  </div>
  <div class="button__column">
    <button class="button">Update</button>
    <button class="button" ${task.completed ? 'checked' : ''}>Comlete!</button>
    <button class="button">Delete</button>
  </div> 
    `
}


const fillHtml = () => {
    wrapperTask.innerHTML = "";
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            wrapperTask.innerHTML += createTemplate(item, index);
        });
        todoEl = document.querySelectorAll('.task-content')
    }
}

fillHtml();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoEl[index].classList.add('image__class')
    } else {
        todoEl[index].classList.remove('image__class')
    }
    updateLocal();
    fillHtml();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(descrTask.value, nameTask.value, radioTask.value, timeTask1.value, timeTask2.value));
    updateLocal();
    fillHtml();
})