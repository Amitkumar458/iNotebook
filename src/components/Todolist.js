import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Todolist = () => {
  const context = useContext(noteContext);
  const {todolistitem, getlisttodo , updatetodolist} = context;
  const [item, setitem] = useState({value:""});
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getlisttodo();
    }
    else {
      history.push("/login");
    }
  }, []);
  const onclicksdditem = (e) => {
    setitem({value:e.target.value});
  }
  const additem = (e) => {
    e.preventDefault();
    updatetodolist([...todolistitem.value , item.value] , todolistitem.id);
    setitem({value:""});
  }
  const deletenoteitem = (e) => {
     for (let n = 0; n < todolistitem.value.length; n++) {
       if (todolistitem.value[n] === e) {
         updatetodolist([...todolistitem.value.slice(0,n) , ...todolistitem.value.slice(n+1 , todolistitem.value.length)] , todolistitem.id)
       }
     }
  }

  return (
    <>
      <div className="containerbox">
        <div className="box">
          <div className="todo">
            ToDo List
          </div>
          <div className="center">
            <form onSubmit={additem}>
              <input className="input2" name="value" value={item.value} onChange={onclicksdditem} minLength={3} placeholder="Add a Items" required />
              <button type="submit" className="button3"> + </button>
            </form>
          </div>
          <div className="items">
            <ol>
              {
                todolistitem.value.map((itemget) => {
                  return (
                    <li key={itemget}> <button onClick={() => {deletenoteitem(itemget)}} className="button2">x</button>{itemget}</li>
                  )
                })
              }
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todolist;
