import { log } from "console";

// 1. Base Class - User (1 Mark)
export class User {
    _id;
    _name;
    _email;
    _password;
    _phone;
    _age;
    _notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._phone = phone;
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60.");
        }
        this._age = age;
    }
    // Getters
    get id() { return this._id; }
    get name() { return this._name; }
    get email() { return this._email; }
    get phone() { return this._phone; }
    get age() { return this._age; }
    addNotebook(notebook) {
        this._notebooks.push(notebook);
    }
    getNotebooks() {
        return this._notebooks;
    }
    displayInfo() {
        console.log(`User Info: [ID: ${this._id}] Name: ${this._name}, Email: ${this._email}, Phone: ${this._phone}, Age: ${this._age}`);
    }
}
// 2. Inheritance - Admin User (1 Mark)
export class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes(note, action) {
        console.log(`Admin ${this.name} performed '${action}' on Note ID: ${note.id}`);
    }
}
// 3. Class - Note & 6. Association (1 Mark each)
export class Note {
    _id;
    _title;
    _content;
    _author;
    constructor(id, title, content, author) {
        this._id = id;
        this._title = title;
        this._content = content;
        this._author = author;
    }
    get id() { return this._id; }
    get title() { return this._title; }
    get content() { return this._content; }
    get author() { return this._author; }
    preview(length = 25) {
        return this._content.length > length
            ? `${this._content.substring(0, length)}...`
            : this._content;
    }
}
// 4. Composition - NoteBook and Notes (1 Mark)
export class NoteBook {
    _id;
    _name;
    _notes = [];
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }
    get id() { return this._id; }
    get name() { return this._name; }
    addNote(id, title, content, author) {
        const newNote = new Note(id, title, content, author);
        this._notes.push(newNote);
        return newNote;
    }
    removeNote(noteId) {
        const initialLength = this._notes.length;
        this._notes = this._notes.filter(n => n.id !== noteId);
        return this._notes.length !== initialLength;
    }
    getNotes() {
        return [...this._notes];
    }
}
// 7. Generics - Data Storage (1 Mark)
export class Storage {
    _items = [];
    addItem(item) {
        this._items.push(item);
    }
    removeItem(predicate) {
        const index = this._items.findIndex(predicate);
        if (index !== -1) {
            this._items.splice(index, 1);
            return true;
        }
        return false;
    }
    getAllItems() {
        return [...this._items];
    }
}



