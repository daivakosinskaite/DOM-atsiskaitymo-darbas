// Sukuriama uzduotis
function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    var dateInput = document.getElementById("dateInput").value;
    if (taskInput !== "") {
      var taskList = JSON.parse(localStorage.getItem("tasks")) || [];
      var task = {
        name: taskInput,
        date: dateInput || new Date().toLocaleDateString(), 
        completed: false 
      };
      taskList.push(task);
      localStorage.setItem("tasks", JSON.stringify(taskList));
      displayTasks();
      document.getElementById("taskInput").value = ""; // isvalomas laukas
      document.getElementById("dateInput").value = ""; 
    } else {
      alert("Please enter a task!");
    }
  }

  // Itraukiame i sarasa
  function displayTasks() {
    var taskList = JSON.parse(localStorage.getItem("tasks")) || [];
    var tableBody = document.getElementById("taskList");
    tableBody.innerHTML = "";
    taskList.forEach(function(task, index) {
      var row = tableBody.insertRow();
      var cellStatus = row.insertCell();
      var cellName = row.insertCell();
      var cellDate = row.insertCell();
      var cellDelete = row.insertCell();

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.onclick = function() {
        task.completed = !task.completed;
        updateTask(taskList);
        if (task.completed) {
          nameSpan.style.textDecoration = "line-through";
        } else {
          nameSpan.style.textDecoration = "none";
        }
      };
      cellStatus.appendChild(checkbox);

      var nameSpan = document.createElement("span"); 
      nameSpan.textContent = task.name;
      if (task.completed) {
        nameSpan.style.textDecoration = "line-through";
      }
      cellName.appendChild(nameSpan);

      var dateSpan = document.createElement("span");
      dateSpan.textContent = task.date;
      cellDate.appendChild(dateSpan);

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Ištrinti";
      deleteButton.className = "delete-button";
      deleteButton.onclick = function() {
        taskList.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        displayTasks();
      };
      cellDelete.appendChild(deleteButton);
    });
  }

  // Atnaujina užduočių sąrašą local storage
  function updateTask(taskList) {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    displayTasks();
  }

  // Uzkrauna su jau isaugotomis uzduotimis
  window.onload = function() {
    displayTasks();
  };