const addBtn = document.getElementById("add");

// created to define the Local Storage function below
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="notes">
      <div class="tools">
        <button class="edit">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="delete">
          <i class="fa-solid fa-trash-can delete"></i>
        </button>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
    `;

  // any questions about the css classes here in js? check the 'hidden' properties in css File.
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  // const notesEl = note.querySelector(".note");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked(text);
  // the library to mark the text after editing is imported in the html file

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
    // the function is defined below
  });

  // to make the text marked and neat
  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    // the library to mark the text after editing is imported in the html file

    updateLocalStorage();
    // the function is defined below
  });

  document.body.appendChild(note);
}

// the feature that keeps the notes in the local storage even if you refresh
function updateLocalStorage() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];
  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
