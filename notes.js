const fs = require('fs');
const chalk = require('chalk');
//This function is used to add note to notes.json file
//by passing title,body as inputs
const addNote = (title, body) => {
    const notes = loadNotes(); 

    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New Note Added!"));
    } else {
        console.log(`the duplicate item is ${duplicateNote}`);
        console.log(
            chalk.red.inverse("Title already exists, please choose another")
        );
    }
}
//This function is used to save notes in notes.json file
//by passing notes as input
const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes));
}

//this function is used to load all notes from notes.json file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }
}
//this function is used to remove title
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

//this function is used to list out all notes
const listNotes = () => {
    const notes = loadNotes();
    console.log(notes)
    console.log(chalk.blueBright.inverse('Your notes..'))
    notes.forEach(note => {
        console.log(note.title)
    });
}
//this function is used to read  note.
const readNote = (title) => {
    const notes = loadNotes();
    const requiredNote = notes.find((note) => note.title === title);
    if (requiredNote) {
        console.log(chalk.green.inverse(requiredNote.title));
        console.log(requiredNote.body)
    }
    else {
        console.log(chalk.red.inverse('No Note found with Name ' + title))
    }
}
//exporting all functions to access outside
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}