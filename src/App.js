import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Author from './components/Author'
import Notes from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Author />
                <Login/>
              </Route>
              <Route exact path="/singup">
                <Author />
                <Signup/>
              </Route>
              <Route exact path="/">
                <Author />
                <Home />
                <Notes />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
