import React from 'react';

//importing typewriter-effect
import Typewriter from "typewriter-effect";


function App() {
	return (
		<div className="App">
			<Typewriter onInit={(typewriter) => {
				typewriter
					.typeString('<span style=color:red> Welcome in iNotebook App. </span>')
					.pauseFor(1000)
					.deleteAll()
					.typeString("<span style=color:blue>You Can Store Your Notes In Server.</span>")
					.pauseFor(1000)
					.deleteChars(27)
					.pauseFor(200)
					.typeString("<span style=color:blue>Access Your Notes From Anywhere.</span>")
					.pauseFor(800)
					.deleteChars(14)
					.pauseFor(200)
					.typeString("<span style=color:blue>Anytime.</span>")
					.pauseFor(1000)
					.deleteAll()
					.typeString("<span style=color:rgb(255,0,255)>This App Is Created By Amit Kumar.</span>")
					.pauseFor(1000)
					.deleteAll()
					.typeString("<span style=color:rgb(0,255,0)>You Can Also See My Others Projects on github.com/Amitkumar458</span>")
					.pauseFor(1000)
					.deleteAll()
					.typeString("<span style=color:rgb(163,2,250)>Thank You For Using It.<span style=color:blue>")
					.pauseFor(1000)
					.start();
			}}
			/>
		</div>
	);
}

export default App;
