import { my_data } from './mockup-data.js';

if (!localStorage.getItem('notes') || !Array.isArray(JSON.parse(localStorage.getItem('notes')))) {
  localStorage.setItem('notes', my_data && JSON.stringify(my_data[0]) || []);
  localStorage.setItem('archiveNotes', my_data && JSON.stringify(my_data[1] || []));
}

function renderNotesTable(notes) {
  document.querySelector('.table-wrapper').children[0] &&
    document.querySelector('.table-wrapper').children[0].remove();

  const container = document.querySelector('.table-wrapper');
  const table = document.createElement('table');
  table.className = 'table';
  const title = document.createElement('tr');
  title.className = 'notes-table-title';
  const th = document.createElement('th');
  const span = document.createElement('span');
  span.className = 'visually-hidden category-icon';
  th.append(span);
  title.append(th);
  const columns = ['id', 'Name', 'Created', 'Category', 'Content', 'Dates'];
  for (let i = 1; i < columns.length; i++) {
    const th = document.createElement('th');
    th.textContent = columns[i];
    title.append(th);
  }
  const thIcons = document.createElement('th');
  thIcons.className = 'icons';
  const icon1 = document.createElement('span');
  icon1.className = 'visually-hidden edit-note icon-edit-pencil';
  const icon2 = document.createElement('span');
  icon2.className = 'archive-all icon-box-add';
  const icon3 = document.createElement('span');
  icon3.className = 'delete-all icon-bin2';
  thIcons.append(icon1, icon2, icon3);
  title.append(thIcons);
  table.append(title);

  for (let i = 0; i < notes.length; i++) {
    const row = document.createElement('tr');
    row.classList.add('note');
    row.dataset.id = notes[i].id;
    row.dataset.category = notes[i].category;
    const iconCell = document.createElement('td');
    const icon = document.createElement('span');
    icon.classList.add('category-icon');
    switch (notes[i].category) {
      case 'Task':
        icon.classList.add('icon-shopping-basket');
        break;
      case 'Idea':
        icon.classList.add('icon-lightbulb_outline');
        break;
      case 'Random Thought':
        icon.classList.add('icon-user-check');
        break;
    }
    iconCell.append(icon);
    row.append(iconCell);
    for (let key in notes[i]) {
      if (key != 'id') {
        const cell = document.createElement('td');
        if (key === 'name') {
          const div = document.createElement('div');
          div.className = 'name';
          div.textContent = notes[i][key];
          cell.append(div);
        }
        else if (key === 'content') {
          const div = document.createElement('div');
          div.className = 'content';
          div.textContent = notes[i][key];
          cell.append(div);
        }
        else {
          cell.textContent = notes[i][key];
        }
        row.append(cell);
      }
    }
    const iconsCell = document.createElement('td');
    iconsCell.classList.add('icons');
    const editIcon = document.createElement('span');
    editIcon.className = 'edit-note icon-edit-pencil';
    const archiveIcon = document.createElement('span');
    archiveIcon.className = 'archive-note icon-box-add';
    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'delete-note icon-bin2';
    iconsCell.append(editIcon, archiveIcon, deleteIcon);
    row.append(iconsCell);
    table.append(row);
  };
  container.append(table);
}

function renderArchiveTable(notes) {
  document.querySelector('.table-wrapper3').children[0] &&
    document.querySelector('.table-wrapper3').children[0].remove();
  if (notes.length) {
    const container = document.querySelector('.table-wrapper3');
    const table = document.createElement('table');
    table.className = 'table archive-table';
    const title = document.createElement('tr');
    title.className = 'notes-table-title';
    const th = document.createElement('th');
    const span = document.createElement('span');
    span.className = 'visually-hidden category-icon';
    th.append(span);
    title.append(th);
    const columns = ['id', 'Name', 'Created', 'Category', 'Content', 'Dates'];
    for (let i = 1; i < columns.length; i++) {
      const th = document.createElement('th');
      th.textContent = columns[i];
      title.append(th);
    }
    const thIcons = document.createElement('th');
    thIcons.className = 'icons';
    const icon2 = document.createElement('span');
    icon2.className = 'unzip-all icon-box-remove';
    const icon3 = document.createElement('span');
    icon3.className = 'delete-archive-all icon-bin2';
    thIcons.append(icon2, icon3);
    title.append(thIcons);
    table.append(title);

    for (let i = 0; i < notes.length; i++) {
      const row = document.createElement('tr');
      row.classList.add('note');
      row.dataset.id = notes[i].id;
      row.dataset.category = notes[i].category;
      const iconCell = document.createElement('td');
      const icon = document.createElement('span');
      icon.classList.add('category-icon');
      switch (notes[i].category) {
        case 'Task':
          icon.classList.add('icon-shopping-basket');
          break;
        case 'Idea':
          icon.classList.add('icon-lightbulb_outline');
          break;
        case 'Random Thought':
          icon.classList.add('icon-user-check');
          break;
      }
      iconCell.append(icon);
      row.append(iconCell);
      for (let key in notes[i]) {
        if (key != 'id') {
          const cell = document.createElement('td');
          if (key === 'name') {
            const div = document.createElement('div');
            div.className = 'name';
            div.textContent = notes[i][key];
            cell.append(div);
          }
          else if (key === 'content') {
            const div = document.createElement('div');
            div.className = 'content';
            div.textContent = notes[i][key];
            cell.append(div);
          }
          else {
            cell.textContent = notes[i][key];
          }
          row.append(cell);
        }
      }
      const iconsCell = document.createElement('td');
      iconsCell.classList.add('icons');
      const unzipIcon = document.createElement('span');
      unzipIcon.className = 'unzip-note icon-box-remove';
      const deleteIcon = document.createElement('span');
      deleteIcon.className = 'delete-archive-note icon-bin2';
      iconsCell.append(unzipIcon, deleteIcon);
      row.append(iconsCell);
      table.append(row);
    };
    container.append(table);
  }
}

function renderSummaryTable(notes, archiveNotes) {
  document.querySelector('.table-wrapper2').children[0] &&
    document.querySelector('.table-wrapper2').children[0].remove();

  const taskNotesSum = notes.filter(note => note.category == 'Task').length;
  const ideaNotesSum = notes.filter(note => note.category == 'Idea').length;
  const thoughtNotesSum = notes.filter(note => note.category == 'Random Thought').length;
  const archiveTaskNotesSum = archiveNotes.filter(note => note.category == 'Task').length;
  const archiveIdeaNotesSum = archiveNotes.filter(note => note.category == 'Idea').length;
  const archiveThoughtNotesSum = archiveNotes.filter(note => note.category == 'Random Thought').length;

  const categories = [
    {
      category: 'Task',
      active: taskNotesSum,
      archived: archiveTaskNotesSum
    },
    {
      category: 'Idea',
      active: ideaNotesSum,
      archived: archiveIdeaNotesSum
    },
    {
      category: 'Random Thought',
      active: thoughtNotesSum,
      archived: archiveThoughtNotesSum
    }
  ];

  const container = document.querySelector('.table-wrapper2');
  const summaryTable = document.createElement('table');
  summaryTable.className = 'table summary-table';
  const title = document.createElement('tr');
  title.className = 'notes-table-title';
  const th = document.createElement('th');
  const span = document.createElement('span');
  span.className = 'visually-hidden category-icon';
  th.append(span);
  title.append(th);
  for (let key in categories[0]) {
    const th = document.createElement('th');
    th.textContent = key[0].toUpperCase() + key.slice(1);
    title.append(th);
  }
  summaryTable.append(title);

  for (let i = 0; i < categories.length; i++) {
    const row = document.createElement('tr');
    row.classList.add('note');
    row.dataset.category = categories[i].category;
    const iconCell = document.createElement('td');
    const icon = document.createElement('span');
    icon.classList.add('category-icon');
    switch (categories[i].category) {
      case 'Task':
        icon.classList.add('icon-shopping-basket');
        break;
      case 'Idea':
        icon.classList.add('icon-lightbulb_outline');
        break;
      case 'Random Thought':
        icon.classList.add('icon-user-check');
        break;
    }
    iconCell.append(icon);
    row.append(iconCell);
    for (let key in categories[i]) {
      const cell = document.createElement('td');
      cell.textContent = categories[i][key];
      row.append(cell);
    }
    summaryTable.append(row);
  }
  container.append(summaryTable);
}

function editNote(note, notes, id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      notes[i].name = note.children[1].textContent;
      notes[i].content = note.children[4].textContent;
      const dates = note.children[4].textContent.match(/(\d{1,2}(\.|\/)){1,2}(\d{4}|\d{2})/g);
      notes[i].dates = dates ? dates.join(', ') : '';
      return notes;
    }
  }
  return notes;
}

function createNote(note, notes, id) {
  const newNote = {};
  newNote.id = id;
  try {
    newNote.name = note.children[0].value;
    const today = new Date();
    newNote.created = today.toDateString();
    newNote.category = note.children[1].value;
    newNote.content = note.children[2].value;
    const dates = newNote.content.match(/(\d{1,2}(\.|\/)){1,2}(\d{4}|\d{2})/g);
    newNote.dates = dates ? dates.join(', ') : '';
    if (newNote.name !== '' && newNote.content !== '') {
      notes.push(newNote);
    }
    else {
      throw new Error('The fields might be not empty');
    }
  }
  catch (e) {
    alert(e.message);
  }
  return notes;
}

function showInputForm(elem) {
  const row = document.createElement('div');
  row.classList.add('new-note');
  const input = document.createElement('input');
  input.placeholder = 'Name';
  input.focus();
  const select = document.createElement('select');
  const option1 = document.createElement('option');
  option1.value = 'Task';
  option1.textContent = 'Task';
  const option2 = document.createElement('option');
  option2.value = 'Idea';
  option2.textContent = 'Idea';
  const option3 = document.createElement('option');
  option3.value = 'Random Thought';
  option3.textContent = 'Random Thought';
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Content';
  textarea.cols = 25;
  select.append(option1, option2, option3);
  row.append(input, select, textarea);
  elem.insertAdjacentElement('beforebegin', row);
}

async function onPageLoaded() {
  const notes = JSON.parse(localStorage.getItem('notes'));
  const archiveNotes = JSON.parse(localStorage.getItem('archiveNotes'));
  renderNotesTable(notes);
  renderSummaryTable(notes, archiveNotes);
  renderArchiveTable(archiveNotes);

  document.addEventListener('click', event => {
    const elem = event.target;
    const note = elem.closest('.note');
    const editElem = document.querySelector('.edit');

    if (elem.classList.contains('edit-note')) {
      if (!editElem) {
        note.classList.add('edit');
        note.children[1].contentEditable = true;
        note.children[1].style.color = '#000';
        note.children[1].classList.add('edit-cell');
        note.children[4].contentEditable = true;
        note.children[4].style.color = '#000';
        note.children[4].classList.add('edit-cell');
        note.children[4].focus();
      }
      else {
        editNote(editElem, notes, +editElem.dataset.id);
        [].forEach.call(editElem.children, elem => {
          elem.contentEditable = false;
          elem.style.color = '#7a7a7a';
          elem.classList.remove('edit-cell');
        });
        editElem.classList.remove('edit');

        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotesTable(notes);
      }
    }
  });
  document.addEventListener('click', event => {
    const elem = event.target;
    const note = elem.closest('.note');
    const editElem = document.querySelector('.edit');
    const newNote = document.querySelector('.new-note');
    if (elem.tagName == 'BODY') {
      if (editElem) {
        [].forEach.call(editElem.children, elem => {
          elem.contentEditable = false;
          elem.style.color = '#7a7a7a';
          elem.classList.remove('edit-cell');
        });
        editElem.classList.remove('edit');

        renderNotesTable(notes);
      }
    }
    else if (!elem.classList.contains('edit-note')) {
      if (((note && !note.classList.contains('edit')) || !note) && editElem) {
        editNote(editElem, notes, +editElem.dataset.id);
        [].forEach.call(editElem.children, elem => {
          elem.contentEditable = false;
          elem.style.color = '#7a7a7a';
          elem.classList.remove('edit-cell');
        });
        editElem.classList.remove('edit');
      }
      if (elem.classList.contains('archive-note')) {
        const index = [].findIndex.call(notes, n => n.id === +note.dataset.id);
        const archiveNote = notes.splice(index, 1)[0];
        archiveNotes.push(archiveNote);
      }
      if (elem.classList.contains('delete-note')) {
        const index = [].findIndex.call(notes, n => n.id === +note.dataset.id);
        const archiveNote = notes.splice(index, 1)[0];
      }
      if (elem.classList.contains('create-note-btn')) {
        if (!newNote) {
          showInputForm(elem);
        }
        else {
          let id = notes.length &&
            notes.reduce((prev, current) => prev.id > current.id ? prev : current).id + 1 || 0;
          createNote(newNote, notes, id);
          newNote.remove();
        }
      }
      if (elem.classList.contains('archive-all')) {
        archiveNotes.push(...notes.slice());
        notes.length = 0;
      }
      if (elem.classList.contains('delete-all')) {
        notes.length = 0;
      }
      if (elem.classList.contains('unzip-note')) {
        const index = [].findIndex.call(archiveNotes, n => n.id === +note.dataset.id);
        const unzipNote = archiveNotes.splice(index, 1)[0];
        notes.push(unzipNote);
      }
      if (elem.classList.contains('delete-archive-note')) {
        const index = [].findIndex.call(archiveNotes, n => n.id === +note.dataset.id);
        const unzipNote = archiveNotes.splice(index, 1)[0];
      }
      if (elem.classList.contains('unzip-all')) {
        notes.push(...archiveNotes.slice());
        archiveNotes.length = 0;
      }
      if (elem.classList.contains('delete-archive-all')) {
        archiveNotes.length = 0;
      }

      localStorage.setItem('notes', JSON.stringify(notes));
      localStorage.setItem('archiveNotes', JSON.stringify(archiveNotes));
      renderNotesTable(notes);
      renderSummaryTable(notes, archiveNotes);
      renderArchiveTable(archiveNotes);
    }
    if (newNote && !elem.parentElement.classList.contains('new-note')) {
      newNote.remove();
    }
  });
  document.addEventListener('keypress', event => {
    const elem = event.target;
    const editElem = document.querySelector('.edit');
    const keyEnter = 13;
    if (event.keyCode === keyEnter) {
      if (elem.parentElement.className === 'new-note') {
        const inputForm = elem.parentElement;
        let id = notes.length &&
          notes.reduce((prev, current) => prev.id > current.id ? prev : current).id + 1 || 0;
        createNote(inputForm, notes, id);
        inputForm.remove();
      }
      else if (editElem) {
        const note = editElem.closest('.note');
        editNote(note, notes, +note.dataset.id);
        [].forEach.call(editElem.children, elem => {
          elem.contentEditable = false;
          elem.style.color = '#7a7a7a';
          elem.classList.remove('edit-cell');
        });
        editElem.classList.remove('edit');
        elem.blur();
      }

      localStorage.setItem('notes', JSON.stringify(notes));
      localStorage.setItem('archiveNotes', JSON.stringify(archiveNotes));
      renderNotesTable(notes);
      renderSummaryTable(notes, archiveNotes);
      renderArchiveTable(archiveNotes);
    }
  });
}

document.addEventListener('DOMContentLoaded', onPageLoaded);