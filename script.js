const editor = document.getElementById('editor');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');

let undoStack = [];
let redoStack = [];

editor.addEventListener('input', () => {
  undoStack.push(editor.value);
  redoStack = [];
});

saveButton.addEventListener('click', () => {

  localStorage.setItem('editorContent', editor.value);
  alert('Content saved!');
});

loadButton.addEventListener('click', () => {

  const savedContent = localStorage.getItem('editorContent');
  if (savedContent) {
    editor.value = savedContent;
    undoStack = [editor.value];
    redoStack = [];
    alert('Content loaded!');
  } else {
    alert('No saved content found.');
  }
});

undoButton.addEventListener('click', () => {
  if (undoStack.length > 1) {
    redoStack.push(undoStack.pop());
    editor.value = undoStack[undoStack.length - 1];
  }
});

redoButton.addEventListener('click', () => {
  if (redoStack.length > 0) {
    undoStack.push(redoStack.pop());
    editor.value = undoStack[undoStack.length - 1];
  }
});
