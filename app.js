// importing modules 
const chalk = require('chalk');
const yargs = require('yargs');
const notesUtil = require('./notes.js');
yargs.version('1.0.0')
//using yargs to add note
yargs.command({
    command : 'add',
    describe : 'Add a new note',
    builder : {
        title : {
            describe : "Note Title",
            demandOption : true,
            type:'string'
        },
        body : {
            describe : "Note Body",
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        notesUtil.addNote(argv.title,argv.body)
    }
})
//using yargs to remove note
yargs.command({
    command : 'remove',
    describe : 'Remove Note',
    builder : {
        title : {
            describe : "Note Title to remove",
            demandOption : true,
            type:'string'
        }
    },
    handler(argv) {
        notesUtil.removeNote(argv.title)
    } 
})
//using yargs to list notes
yargs.command({
    command : 'list',
    describe : 'List your notes',
    handler(argv){
        notesUtil.listNotes();
    }
})

//using yargs to read a note
yargs.command({
    command : 'read',
    describe : 'Read a note',
    builder : {
       title : {
           describe :  'Note Title',
           demandOption : true,
           type : 'string'
       }
    },
    handler(argv){
        notesUtil.readNote(argv.title)
    }
})

 yargs.parse()



