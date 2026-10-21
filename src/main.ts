// 1. Base Class - User (1 Mark)
export class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _phone: string;
    private _age: number;

    private _notebooks: NoteBook[] = [];

    constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
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
    public get id(): number { return this._id; }
    public get name(): string { return this._name; }
    public get email(): string { return this._email; }
    public get phone(): string { return this._phone; }
    public get age(): number { return this._age; }

    public addNotebook(notebook: NoteBook): void {
        this._notebooks.push(notebook);
    }

    public getNotebooks(): NoteBook[] {
        return this._notebooks;
    }

    public displayInfo(): void {
        console.log(`User Info: [ID: ${this._id}] Name: ${this._name}, Email: ${this._email}, Phone: ${this._phone}, Age: ${this._age}`);
    }
}

// 2. Inheritance - Admin User (1 Mark)
export class Admin extends User {
    constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
        super(id, name, email, password, phone, age);
    }

    public manageNotes(note: Note, action: "delete" | "archive" | "flag"): void {
        console.log(`Admin ${this.name} performed '${action}' on Note ID: ${note.id}`);
    }
}

// 3. Class - Note & 6. Association (1 Mark each)
export class Note {
    private _id: number;
    private _title: string;
    private _content: string;
    private _author: User;

    constructor(id: number, title: string, content: string, author: User) {
        this._id = id;
        this._title = title;
        this._content = content;
        this._author = author;
    }

    public get id(): number { return this._id; }
    public get title(): string { return this._title; }
    public get content(): string { return this._content; }
    public get author(): User { return this._author; }

    public preview(length: number = 25): string {
        return this._content.length > length 
            ? `${this._content.substring(0, length)}...` 
            : this._content;
    }
}

// 4. Composition - NoteBook and Notes (1 Mark)
export class NoteBook {
    private _id: number;
    private _name: string;
    private _notes: Note[] = [];

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    }

    public get id(): number { return this._id; }
    public get name(): string { return this._name; }
    
    public addNote(id: number, title: string, content: string, author: User): Note {
        const newNote = new Note(id, title, content, author);
        this._notes.push(newNote);
        return newNote;
    }

    public removeNote(noteId: number): boolean {
        const initialLength = this._notes.length;
        this._notes = this._notes.filter(n => n.id !== noteId);
        return this._notes.length !== initialLength;
    }

    public getNotes(): Note[] {
        return [...this._notes];
    }
}

// 7. Generics - Data Storage (1 Mark)
export class Storage<T> {
    private _items: T[] = [];

    public addItem(item: T): void {
        this._items.push(item);
    }

    public removeItem(predicate: (item: T) => boolean): boolean {
        const index = this._items.findIndex(predicate);
        if (index !== -1) {
            this._items.splice(index, 1);
            return true;
        }
        return false;
    }

    public getAllItems(): T[] {
        return [...this._items];
    }
}