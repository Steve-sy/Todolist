window.onload = function () {
    bootlint.showLintReportForCurrentDocument([], {
        hasProblems: false,
        problemFree: false
    });

    $('[data-toggle="tooltip"]').tooltip();

    function formatDate(date) {
        return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()
        );
    }

    var currentDate = formatDate(new Date());

    $(".due-date-button").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
        startDate: currentDate,
        orientation: "bottom right"
    });

    $(".due-date-button").on("click", function (event) {
        $(".due-date-button")
            .datepicker("show")
            .on("changeDate", function (dateChangeEvent) {
                $(".due-date-button").datepicker("hide");
                $(".due-date-label").text(formatDate(dateChangeEvent.date));
            });
    });
};

    
let tasks = [
    {   
        'title': 'reading book',
        'date': '08.08.2024',
        'isDone': false, 
    },
    {   
        'title': 'learning spanish',
        'date': '10.10.2024',
        'isDone': false, 
    },
    {   
        'title': 'traveling to australia',
        'date': '11.11.2024',
        'isDone': false, 
    },
]

    function fillTasks() {
        
document.getElementById("tasks").innerHTML = "";
// index of the task
let id = 0;
for (task of tasks) {
    let content = 
    `<div class="row px-3 align-items-center todo-item rounded">
                        <div class="col-auto m-1 p-0 d-flex align-items-center">
                            <h2 class="m-0 p-0">
                                <i class="fa fa-square-o text-primary btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Mark as complete"></i>
                                <i class="fa fa-check-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip" data-placement="bottom" title="Mark as todo"></i>
                                </h2>
                        </div>
                        <div class="col px-1 m-1 d-flex align-items-center">
                            <input id="updateInput${id}" type="text" class="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3" readonly value="${task.title}" title="${task.title}" />
                            </div>
                        <div class="col-auto m-1 p-0 px-3 d-none">
                        </div>
                        <div class="col-auto m-1 p-0 todo-actions">
                            <div class="row d-flex align-items-center justify-content-end">
                                <h5 class="m-0 p-0 px-2">
                                    <i id="doneUpdateTask" onclick="doneUpdateTask(${id})" class="fa fa-check text-success btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Update"></i>
                                </h5>
                                <h5 class="m-0 p-0 px-2">
                                    <i id="updateTask" onclick="updateTask(${id})" class="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Edit todo"></i>
                                </h5>
                                <h5 class="m-0 p-0 px-2">
                                    <i id="deleteTask" onclick="deleteTask(${id})" class="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom" title="Delete todo"></i>
                                </h5>
                            </div>
                            <div class="row todo-created-info">
                                <div class="col-auto d-flex align-items-center pr-2">
                                    <i class="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Created date"></i>
                                    <label class="date-label my-2 text-black-50">${task.date}</label>
                                </div>
                            </div>
                        </div>
                    </div> `
    document.getElementById("tasks").innerHTML += content;  
    id++;
}    
    }
    
    fillTasks();

// use enter key
document.getElementById("add-text").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("add-btn").click();
    }
  });  

  // add task to the matrix
    function addTask() {
        let addText = document.getElementById("add-text").value;
        let date = new Date().toLocaleDateString("en-US");
        let taskObj = {
            'title' : addText,
            'date' : date,
            'isDone' : false,
        };

        tasks.push(taskObj);
        fillTasks();
    }

    function deleteTask(id) {
        let isConfirm = confirm('Are you sure to delete?');
        if (isConfirm){
            tasks.splice(id,1);
            fillTasks();
        }
    }

    function doneUpdateTask(id) {
        let task = tasks[id];
        let newTitle =  document.getElementById('updateInput'+id).value;
        task.title = newTitle;
        fillTasks();
    }
    
    function updateTask(id) {
        let isConfirm = confirm('Are you sure to update?');
        if (isConfirm){
          document.getElementById('updateInput'+id).removeAttribute('readonly');
          document.getElementById('updateInput'+id).classList.remove("bg-transparent");
        
          //alert(newTitle);
            //tasks.splice(id,1);
           //fillTasks();
        }
    }
    
    