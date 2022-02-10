import React from "react";
import { useContext, useEffect, useRef , useState } from "react";
import noteContext from "../context/notes/noteContext";
import Newsitem from "./Newsitem";

const Notes = () => {
    const context = useContext(noteContext);
    const { usernotes, getNotes , updateNote } = context;
    useEffect(() => {
        getNotes()
    } , [getNotes]);
    const ref = useRef(null);
    const refclose = useRef(null);
    const updNote = (noteedited) => {
        ref.current.click();
        setNote({eid:noteedited._id , etitle:noteedited.title , edescription:noteedited.description , etag:noteedited.tag});
    }

    const [note , setNote] = useState({eid:"", etitle:"", edescription:"" , etag:""});

    const handleClick = (e) => {
        e.preventDefault();
        updateNote(note.eid , note.etitle , note.edescription , note.etag);
        refclose.current.click();
    }
    
    const onChange = (e) => {
        setNote({...note , [e.target.name]:e.target.value });
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Edit Your Note </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <h3 htmlFor="exampleFormControlInput1" className='headingcolor'> Title </h3>
                                    <input type="text" className="form-control" value={note.etitle} onChange={onChange} id="etitle" name='etitle' placeholder="Enter title of your Note" required />
                                </div>
                                <div className="form-group">
                                    <h5 htmlFor="exampleFormControlTextarea1" className='textcolor'> Textarea </h5>
                                    <textarea className="form-control" value={note.edescription} onChange={onChange} placeholder='Enter your text here' id="edescription" name='edescription' rows="7" required></textarea>
                                </div>
                                <div className="form-group">
                                    <h5 htmlFor="exampleFormControlInput1" className='catgcolor'> Category </h5>
                                    <input type="text" className="form-control" value={note.etag} onChange={onChange} id="etag" name='etag' placeholder="Ex - genetal , study , business , etc." />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="yournote">
                Your Notes
            </h2>
            <div className="container">
                { usernotes.length === 0 && "No Notes To Display" }
            </div>
            {
                usernotes.map((element) => {
                    return (
                        <Newsitem key={element._id} updNote={updNote} note={element} />
                    )
                })
            }
        </div>
    )
}

export default Notes;
