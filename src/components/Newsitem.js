import React, { useContext, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Newsitem = (props) => {
    const { note, updNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const ref = useRef(null);
    const refclose = useRef(null);
    const [deleteid , setdeleteid] = useState(null);
    const deleteclick = (note) => {
        ref.current.click();
        setdeleteid(note._id);
    }
    
    const deleteyesclick = () => {
        deleteNote(deleteid);
        refclose.current.click();
    }

    return (
        <>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
            <div className="modal" tabIndex="-1" id="deleteModal">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Delete Confirm </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Do you want to Delete it Confirm</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refclose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={deleteyesclick}> Yes </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-3">
                <div className="card">
                    <div className="card-header text-center">
                        {note.tag}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <div className="btn btn-outline-success btn-sm" onClick={() => { updNote(note); }}>Edit</div>
                        <div className="btn btn-outline-danger mx-2 btn-sm" onClick={() => { deleteclick(note); }}>Delete</div>
                    </div>
                    <div className="card-footer text-muted">
                        {note.date}
                    </div>
                </div>
            </div></>
    )
}

export default Newsitem;
