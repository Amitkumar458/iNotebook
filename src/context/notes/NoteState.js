
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    let notesinitial = [];
    const host = "http://localhost:8000";
    const [usernotes, setusernotes] = useState(notesinitial);
    
    // Get all note from backend server;
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOTc5ZjhiMDY3NTAzZjEzMDM2ZGE3In0sImlhdCI6MTY0MjcwMTE2NH0.tB6G5WwQY5QV1CjTDDk8P7m1gpiYc5sh9S57o1CS06w"
            }
        });
        const json = await response.json();
        setusernotes(json);
    }

    // Add a Note in backend server;
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOTc5ZjhiMDY3NTAzZjEzMDM2ZGE3In0sImlhdCI6MTY0MjcwMTE2NH0.tB6G5WwQY5QV1CjTDDk8P7m1gpiYc5sh9S57o1CS06w"
            },
            body: JSON.stringify({title, description, tag})
        });
        const newnote = await response.json();
        setusernotes(usernotes.concat(newnote));
    }

    // Delete a user Note in backend server;
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id} `, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOTc5ZjhiMDY3NTAzZjEzMDM2ZGE3In0sImlhdCI6MTY0MjcwMTE2NH0.tB6G5WwQY5QV1CjTDDk8P7m1gpiYc5sh9S57o1CS06w"
            }
        });
        const newNote = usernotes.filter((note) => {
            return note._id !== id
        });
        setusernotes(newNote);
    }

    // Update user Note in backend server;
    const updateNote = async (id , title , description , tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFlOTc5ZjhiMDY3NTAzZjEzMDM2ZGE3In0sImlhdCI6MTY0MjcwMTE2NH0.tB6G5WwQY5QV1CjTDDk8P7m1gpiYc5sh9S57o1CS06w"
            },
            body: JSON.stringify({title , description , tag})
        });
        const json = await response.json();
    }

    return (
        <NoteContext.Provider value={{ usernotes, setusernotes, addNote, deleteNote, updateNote , getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
