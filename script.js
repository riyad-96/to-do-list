//! To-do title functions
const todo_title = document.getElementById('todo_title')

todo_title.addEventListener('input', function () {
  if (todo_title.innerText.trim() !== '') {
    todo_title.classList.add('has-content')
  }
  else {
    todo_title.classList.remove('has-content')
  }
});

const saveInputs = () => {
  let content = todo_title.innerHTML.trim();

  if (content === '<br>' || content === '') {
    localStorage.removeItem('todoTitle')
  } else {
    localStorage.setItem('todoTitle', todo_title.innerHTML);
  }
}

window.onload = function () {

  // getting the saved data in local storage.
  const savedData = localStorage.getItem('todoTitle')

  if (savedData) {
    todo_title.innerHTML = savedData
    todo_title.classList.add('has-content')
  }
};


// ! ------------------------------------
const add_task_btn = document.getElementById('add_task_btn');
const task_ul = document.getElementById('task_ul');
const task_input = document.getElementById('task_input')
const save_btn = document.getElementById('save_btn')


//! Add List Item inside UL - unordered list
const addTaskFunc = (task_Element) => {
  const li = document.createElement('li')
  li.innerHTML = `
  <input type="checkbox"><span>${task_Element}</span><button title="Delete this task"><i class="ri-delete-bin-6-line"></i></button>
  `

  //! delete single task
  li.querySelector('button').addEventListener('click', () => {
    li.remove();
  })

  //! check if the checkbox are checked & change button text
  const checkbox = li.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {

    updateSelectState();

  });

  task_ul.appendChild(li)
  task_input.value = ''
  saveTask()
};

//! add writen task to ul
add_task_btn.addEventListener('click', () => {
  const task_Element = task_input.value.trim()
  if (task_Element !== '') {
    addTaskFunc(task_Element);
  }
})

//!add on hitting Enter key on keyboard
task_input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    add_task_btn.click();
  }
})

//! delete selected checkboxes
const dlt_checked = () => {
  const list_items = task_ul.querySelectorAll('li');

  list_items.forEach((li) => {
    const checkbox = li.querySelector('input[type="checkbox"]');

    if (checkbox && checkbox.checked) {
      li.remove();
    }
  })
  select_all_btn.innerText = 'Select All';
};

//! select all tasks
const select_all_btn = document.getElementById('select_all_btn')

select_all_btn.addEventListener('click', () => {

  if (select_all_btn.innerText === 'Select All') {
    task_ul.querySelectorAll('li').forEach((li) => { li.querySelector('input[type="checkbox"]').checked = true })
    select_all_btn.innerText = 'Unselect All'
  }
  else {
    task_ul.querySelectorAll('li').forEach((li) => {
      li.querySelector('input[type="checkbox"]').checked = false;
    })
    select_all_btn.innerText = 'Select All'
  }
})


//! function for save to localstorage
const saveTask = () => {
  const tasks = [];
  task_ul.querySelectorAll('li').forEach((li) => {
    const taskText = li.querySelector('span').innerText.trim();
    const isChecked = li.querySelector('input[type="checkbox"]').checked;

    tasks.push({ text: taskText, checked: isChecked })
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//! load task from local storage
const loadTasks = () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  savedTasks.forEach((task) => {
    addTaskFunc(task.text);
    const lastLi = task_ul.lastElementChild;
    if (task.checked) {
      lastLi.querySelector('input[type="checkbox"]').checked = true;
    }
  });
};


//! load saved tasks on refreshing page
window.addEventListener('load', () => {
  loadTasks();
  saveTask();
  updateSelectState();
})

//! check if the checkboxes are selected
const updateSelectState = () => {
  const anyChecked = Array.from(task_ul.querySelectorAll('li')).some((li) => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    return checkbox && checkbox.checked;
  })

  select_all_btn.innerText = anyChecked ? 'Unselect All' : 'Select All';
}


//! dark theme toggle

const theme = document.getElementById('theme');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

// Check localStorage for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  theme.classList.add('dark');
  toggleThemeBtn.innerText = 'Light';
}

toggleThemeBtn.addEventListener('click', () => {
  if (theme.classList.contains('dark')) {
    theme.classList.remove('dark');
    toggleThemeBtn.innerText = 'Dark';
    localStorage.setItem('theme', 'light'); // Save to localStorage
  } else {
    theme.classList.add('dark');
    toggleThemeBtn.innerText = 'Light';
    localStorage.setItem('theme', 'dark'); // Save to localStorage
  }
});

//! save all task after clicking on save button
save_btn.addEventListener('click', () => {
  saveTask();
  saveInputs();
  saveDialogue();
})

//! on save message dialogue
const message = document.getElementById('message');

let isRunning = false;
const saveDialogue = () => {

  if (!isRunning) {
    isRunning = true
    message.style.display = 'block';
    message.style.opacity = '1';

    setTimeout(() => {
      message.style.opacity = '0';

      setTimeout(() => {
        message.style.display = 'none';
        isRunning = false;
      }, 200);

    }, 1500);
  }
};