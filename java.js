document.getElementById("form_task").addEventListener("submit", addTask);

function addTask(e) {
  let title = document.querySelector(".form_title").value;
  let description = document.querySelector(".form_description").value;
  let deadline = document.querySelector(".form_deadline").value;
  let completed = 0 ;
  let task = {
    title,
    description,
    deadline,
    completed,
  };

  if (localStorage.getItem("tasks") == null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  displayTask();

  document.getElementById("form_Task").reset();
  e.preventDefault();
}

function display_desc(title_c) {
 
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let display = document.querySelector(".todo_task_list");
  display.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    let deadline = tasks[i].deadline;
    let completed = tasks[i].completed;
    if (title == title_c) {
      if(completed == 1) {
        display.innerHTML += `
        <div class="todo_task check">
        <span class="todo_task_title">`+title+`</span>
        <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
        <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
        <button class="btn btn_display" onclick="displayTask()"><i class="fa fa-list"></i></button>
        <div class="todo_task_description">
            <p class="task_description">
            `+description+`
            </p>
            <article class="task_deadline">Deadline : `+deadline+` </article>
        </div>
        </div>
        `;
      }
      else{
        display.innerHTML += `
        <div class="todo_task">
        <span class="todo_task_title">`+title+`</span>
        <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
        <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
        <button class="btn btn_display" onclick="displayTask()"><i class="fa fa-list"></i></button>
        <div class="todo_task_description">
            <p class="task_description">
            `+description+`
            </p>
            <article class="task_deadline">Deadline : `+deadline+` </article>
        </div>
        </div>
        `;
      }

    }
    else{

      if(tasks[i].completed == 0){
        display.innerHTML += `
          <div class="todo_task">
          <span class="todo_task_title">`+title+`</span>
          <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
          <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
          <button class="btn btn_display" onclick="display_desc('`+title+`')"><i class="fa fa-list"></i></button>
          </div>
          `;
        }
        else{
          display.innerHTML += `
          <div class="todo_task check">
          <span class="todo_task_title">`+title+`</span>
          <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
          <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
          <button class="btn btn_display" onclick="display_desc('`+title+`')"><i class="fa fa-list"></i></button>
          </div>
          `;
        }
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));


}

function check_task(title_c) {
 
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let display = document.querySelector(".todo_task_list");
  display.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let completed = tasks[i].completed;
    if (title == title_c || completed == 1) {
      tasks[i].completed = 1;
      display.innerHTML += `
      <div class="todo_task check">
      <span class="todo_task_title">`+title+`</span>
      <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
      <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
      <button class="btn btn_display" onclick="display_desc('`+title+`')"><i class="fa fa-list"></i></button>
      </div>
      `;
    }
    else{

    display.innerHTML += `
      <div class="todo_task">
      <span class="todo_task_title">`+title+`</span>
      <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
      <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
      <button class="btn btn_display" onclick="display_desc('`+title+`')"><i class="fa fa-list"></i></button>
      </div>
      `;
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));


}

function delete_task(title) {
 
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
 
  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayTask();

}

function displayTask() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let display = document.querySelector(".todo_task_list");
  let number = document.querySelector(".no_of_tasks");
  let com = 0;
  let live = 0;
  for (let i = 0; i < tasks.length; i++){
    if(tasks[i].completed == 0) 
      live++;
    else
      com++;
  }
  number.innerHTML = `<span class="card"> Working Tasks = <span class="num">` + live + `</span></span><span class="card"> Completed Tasks = <span class="num">` + com + `</span></span>`;
  display.innerHTML = "";
  
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;
    let deadline = tasks[i].deadline;
    
    if(tasks[i].completed == 0){
    display.innerHTML += `
      <div class="todo_task">
      <span class="todo_task_title">`+title+`</span>
      <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
      <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
      <button class="btn btn_display" onclick="display_desc('`+title+`')"><i class="fa fa-list"></i></button>
      </div>
      `;
    }
    else{
      display.innerHTML += `
      <div class="todo_task check">
      <span class="todo_task_title">`+title+`</span>
      <button class="btn btn_check" onclick="check_task('`+title+`')"><i class="fa fa-check"></i></button>
      <button class="btn btn_delete" onclick="delete_task('`+title+`')"><i class="fa fa-trash"></i></button>
      <button class="btn btn_display" onclick="display_desc('`+title+`')"><i class="fa fa-list"></i></button>
      </div>
      `;
    }
  }
}



displayTask();