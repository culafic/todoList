var removeSVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG =
  '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

var todoCount = document.getElementById("todo-count");
var completeCount = document.getElementById("complete-count");

document.getElementById("add").addEventListener("click", function () {
  var value = document.getElementById("item").value;
  var date = document.getElementById("date").value;
  re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  var selectedItem = document.getElementById('priority');
  var selected = selectedItem.value;

  if (value == "") {
    alert("Please add a task");
    return false;
  } else if (date == "" || !date.match(re)) {
    alert("Please enter a valid date format");
    return false;
  } else if (selectedItem.options[selectedItem.selectedIndex].index == 0) {
    alert("Please set a priority");
    return false;
  } else {
    addItemTodo(value, date, selected);
    document.getElementById("item").value = "";
    document.getElementById("date").value = "";
    document.getElementById("priority").value = document.querySelectorAll("#priority option")[0].value;
  }
});

// remove items
function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  parent.removeChild(item);
  var id = parent.id;
  
  if (id === "high" || id === "medium" || id === "low") {
    todoCount.textContent = todoCount.textContent - 1;
  } else {
    completeCount.textContent = parseFloat(completeCount.textContent) - 1;
  }
}

// completed items
function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var target;

  if (id === "high" || id === "medium" || id === "low") {
    target = document.getElementById("completed");
    todoCount.textContent = todoCount.textContent - 1;
    completeCount.textContent = parseFloat(completeCount.textContent) + 1;
  } else if (id === "completed") {
    if (item.textContent.includes("high")) {
      target = document.getElementById("high");
    } else if (item.textContent.includes("medium")) {
      target = document.getElementById("medium");
    } else if (item.textContent.includes("low")) {
      target = document.getElementById("low");
    }
    todoCount.textContent = parseFloat(todoCount.textContent) + 1;
    completeCount.textContent = parseFloat(completeCount.textContent) - 1;
  }
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// remove completed items
function removeAll() {
  var parent = document.getElementById("completed");
  var items = document.querySelectorAll("#completed li");
  for (var i = 0; i < items.length; i++) {
    parent.removeChild(items[i]);
  }
  completeCount.textContent = 0;
}

document.getElementById("btn").addEventListener("click", removeAll);

//add a new item to the todo list
function addItemTodo(text, dueDate, priority) {
  var high = document.getElementById("high");
  var medium = document.getElementById("medium");
  var low = document.getElementById("low");

  var item = document.createElement("li");
  var deadline = document.createElement("span");
  var deadlineText = document.createElement("span");
  var selectPriority = document.createElement("div");

  deadline.classList.add("deadline");
  deadlineText.classList.add("deadlineText");

  item.innerHTML = text;
  deadlineText.innerText = "  deadline ";
  deadline.innerText = dueDate + " ";
  selectPriority.innerText = priority;

  var buttons = document.createElement("div");
  buttons.classList.add("buttons");

  var remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeSVG;

  remove.addEventListener("click", removeItem);

  var complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = completeSVG;

  complete.addEventListener("click", completeItem);

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);
  item.appendChild(deadlineText);
  item.appendChild(deadline);
  item.appendChild(selectPriority);

  var index = document.getElementById('priority').selectedIndex;

  if (index === 1) {
    selectPriority.classList.add('red');
    high.appendChild(item);
  } else if (index === 2) {
    selectPriority.classList.add('green');
    medium.appendChild(item);
  } else if (index === 3) {
    selectPriority.classList.add('yellow');
    low.appendChild(item);
  }

  todoCount.textContent = parseFloat(todoCount.textContent) + 1;

}
