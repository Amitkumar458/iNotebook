import React from 'react'
import { useContext } from "react";
import { useState } from 'react';
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [error , seterror] = useState({ titleError: "", descriptionError: ""});

    const handleClick = (e) => {
        e.preventDefault();
        if (note.title.length < 3 && note.description.length < 5) {
           return seterror({titleError: "title must be 3 character long", descriptionError: "description must be 5 character long"});
        }
        if (note.title.length < 3) {
           return seterror({titleError: "title must be 3 character long", descriptionError: ""});
        }
        if (note.description.length < 5) {
           return seterror({titleError: "", descriptionError: "description must be 5 character long"});
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        seterror({ titleError: "", descriptionError: ""});
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        seterror({ titleError: "", descriptionError: ""});
    }

    return (
        <div className='container mystyle'>
            <form>
                <div className="form-group">
                    <h3 htmlFor="exampleFormControlInput1" className='headingcolor'> Title </h3>
                    <input type="text" className="form-control" onChange={onChange} value={note.title} id="title" name='title' placeholder="Enter title of your Note" required />
                    <div className='text-danger'>{error.titleError}</div>
                </div>
                <div className="form-group">
                    <h5 htmlFor="exampleFormControlTextarea1" className='textcolor'> Textarea </h5>
                    <textarea className="form-control" onChange={onChange} value={note.description} placeholder='Enter your text here' id="description" name='description' rows="10" required></textarea>
                    <div className='text-danger'>{error.descriptionError}</div>
                </div>
                <div className="form-group">
                    <h5 htmlFor="exampleFormControlInput1" className='catgcolor'> Category </h5>
                    <input type="text" className="form-control" onChange={onChange} value={note.tag} id="tag" name='tag' placeholder="Ex - general , study , business , etc." />
                </div>
                <div className="form-group my-2">
                    <button type="submit" onClick={handleClick} className="btn btn-primary"> Add Note </button>
                </div>
            </form>
        </div>
    )
}

export default Addnote;
