
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    let notesinitial = [];
    const host = "http://localhost:8000";
    const [usernotes, setusernotes] = useState(notesinitial);
    const [todolistitem , settodolistitem] = useState({value:[] , id:""});
    
    // Get all note from backend server;
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
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
                "auth-token": localStorage.getItem('token')
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
                "auth-token": localStorage.getItem('token')
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
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title , description , tag})
        });
        const json = await response.json();
        for (let n = 0; n < usernotes.length; n++) {
            if (usernotes[n]._id === id) {
                setusernotes([...usernotes.slice(0,n) , json.noteupdated , ...usernotes.slice(n+1 , usernotes.length)])
            }
        }
    }

    //Get todo notes from backend server
    const getlisttodo = async () => {
        const response2 = await fetch(`${host}/api/todo/gettodolist` , {
            method: 'GET',
            headers:{
             'Content-Type': 'application/json',
             "auth-token": localStorage.getItem('token')
            }
         });
         const json2 = await response2.json();
         settodolistitem({value:json2[0].value , id:json2[0]._id });
    }

    // update todo notes in backend server.
    const updatetodolist = async (value , id) => {
        const response2 = await fetch(`${host}/api/todo/updatetodolist/${id}` , {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({value:value})
        });
        const json = await response2.json();
        settodolistitem({value:json.todeupdated.value , id:todolistitem.id});
    }

    // Post todo list / create to do list for every user
    const posttodolist = async (value) => {
        const resposnse3 = await fetch(`${host}/api/todo/posttodolist` , {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({value:value})
        })
        const json = resposnse3.json();
    }

    return (
        <NoteContext.Provider value={{ usernotes, todolistitem , posttodolist ,getlisttodo, updatetodolist , setusernotes, addNote, deleteNote, updateNote , getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
