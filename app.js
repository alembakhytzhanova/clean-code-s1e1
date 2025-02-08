document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const newTaskInput = document.getElementById("new-task");
    const incompleteTasks = document.getElementById("incomplete-tasks");
    const completedTasks = document.getElementById("completed-tasks");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskText = newTaskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            newTaskInput.value = "";
        }
    });

    function addTask(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox">
            <label>${taskText}</label>
            <input type="text" class="edit-input" value="${taskText}">
            <button class="edit">Edit</button>
            <button class="delete">
                <img src="./remove.svg" alt="Delete">
            </button>
        `;
        bindTaskEvents(li);
        incompleteTasks.appendChild(li);
    }

    function bindTaskEvents(taskItem) {
        const checkbox = taskItem.querySelector("input[type=checkbox]");
        const editButton = taskItem.querySelector(".edit");
        const deleteButton = taskItem.querySelector(".delete");
        
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                completedTasks.appendChild(taskItem);
            } else {
                incompleteTasks.appendChild(taskItem);
            }
        });
        
        editButton.addEventListener("click", function () {
            const label = taskItem.querySelector("label");
            const input = taskItem.querySelector(".edit-input");
            if (taskItem.classList.contains("edit-mode")) {
                label.textContent = input.value;
                editButton.textContent = "Edit";
            } else {
                input.value = label.textContent;
                editButton.textContent = "Save";
            }
            taskItem.classList.toggle("edit-mode");
        });
        
        deleteButton.addEventListener("click", function () {
            taskItem.remove();
        });
    }

    document.querySelectorAll("#incomplete-tasks li, #completed-tasks li").forEach(bindTaskEvents);
});
