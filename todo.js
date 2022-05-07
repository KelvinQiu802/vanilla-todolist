const addTodo = document.querySelector("#addTodo");
const input = document.querySelector("input");
const todo = document.querySelector(".todo ul");
const done = document.querySelector(".done ul");

// 判断是否存在缓存
if (localStorage.getItem("todo-list")) {
  var todoList = JSON.parse(localStorage.getItem("todo-list"));
  // 渲染缓存中的数据
  render(todoList);
} else {
  // 没有缓存，则创建一个空数组
  var todoList = [];
}

// 构造函数
function createTodo(content, status) {
  this.content = content;
  this.status = status;
}

// 添加todo事件
addTodo.addEventListener("click", () => {
  // 检查input是否为空&&todo是否重复
  if (input.value && checkRepeat(todoList)) {
    // 添加todo到list
    todoList.push(new createTodo(input.value, "todo"));
    localStorage.setItem("todo-list", JSON.stringify(todoList));
    // 渲染到HTML
    render(todoList);
  }
  // 清空输入框
  input.value = '';
});

// 渲染到HTML
function render(todoList) {
  const todo_element = [];
  const done_element = [];
  // 清空
  todo.innerHTML = "";
  done.innerHTML = "";
  for (const todoObj of todoList) {
    if (todoObj.status === "todo") {
      // 添加到todo中
      let text =
        '<li><span class="uncheck"></span><i class="todo-text">' +
        todoObj.content +
        '</i><span class="delete"></span></li>';
      todo_element.push(text);
    } else {
      // 添加到done中
      let text =
        '<li><span class="checked"></span><i class="todo-text">' +
        todoObj.content +
        '</i><span class="delete"></span></li>';
      done_element.push(text);
    }
  }
  // 渲染todo
  todo.innerHTML = todo_element.join("");
  // 渲染done
  done.innerHTML = done_element.join("");
  // 设置事件
  console.log("死循环");
  setEvents();
  // 添加到localStorage
  localStorage.setItem("todo-list", JSON.stringify(todoList));
}

// 设置事件
function setEvents() {
  deleteEvent();
  uncheckEvent();
  checkedEvent();
}

// 删除事件
function deleteEvent() {
  // 设置删除事件
  const deleteBtns = document.querySelectorAll(".delete");
  for (const deleteBtn of deleteBtns) {
    deleteBtn.addEventListener("click", function () {
      // 从DOM中删除
      this.parentNode.parentNode.removeChild(this.parentNode);
      // 从对象列表中移除
      for (const todo of todoList) {
        if (todo.content == this.previousElementSibling.innerHTML) {
          const index = todoList.indexOf(todo);
          todoList.splice(index, 1);
        }
      }
      // 添加缓存
      localStorage.setItem("todo-list", JSON.stringify(todoList));
    });
  }
}

// uncheck事件
function uncheckEvent() {
  const checkList = document.querySelectorAll(".uncheck");
  for (const uncheck of checkList) {
    uncheck.addEventListener("click", function () {
      // 修改对象status属性
      for (const todo of todoList) {
        if (todo.content == this.nextElementSibling.innerHTML) {
          todo.status = "done";
        }
      }
      // 添加缓存
      localStorage.setItem("todo-list", JSON.stringify(todoList));
      // 重新渲染DOM
      render(todoList);
    });
  }
}

// checked事件
function checkedEvent() {
  const checkedList = document.querySelectorAll(".checked");
  for (const checked of checkedList) {
    checked.addEventListener("click", function () {
      // 修改对象status属性
      for (const todo of todoList) {
        if (todo.content == this.nextElementSibling.innerHTML) {
          todo.status = "todo";
        }
      }
      // 添加缓存
      localStorage.setItem("todo-list", JSON.stringify(todoList));
      // 重新渲染DOM
      render(todoList);
    });
  }
}

// 检查todo重复
function checkRepeat(todoList) {
  for (const todo of todoList) {
    if (input.value == todo.content) {
      return false;
    }
  }
  return true;
}
