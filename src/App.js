import React from "react";
import Wrapper from "./components/Wrapper"
import Cards from "./components/Cards"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./reset.css"
import "./css/style.css"

import characters from "./cards.json"


class App extends React.Component {

	state = {
		characters: characters,
		score: 0,
		highScore: 0,
		guesses: [],
	}

	guessAction = id => {
		if (!this.state.guesses.includes(id)) {
			let guesses = this.state.guesses
			guesses.push(id)
			let score = this.state.score + 1
			this.setState({guesses, score, message: "You Guessed Correct."})
			if (score > this.state.highScore) {
				let highScore = score
				this.setState({highScore})
			}
			if (score === this.state.characters.length) {
				this.setState({
					score: 0,
					guesses: [],
					message: "You Won! Click to start over."
				})
			}
		} else {
			this.setState({
				score: 0,
				guesses: [],
				message: "You Guessed Wrong."
			})
		}
	}

	render() {
		return (
			<Wrapper>
				<Navbar score={this.state.score} message={this.state.message} highScore={this.state.highScore}/>
				<p className="prompt">{ this.state.message ? this.state.message : "Click an image to begin."}</p>
				<div className="playAreaWrapper">
					<div className="playArea">
					{this.state.characters.sort(() => .5 - Math.random()).map(character => (
						<Cards
							id={character.id}
							guessAction={this.guessAction}
							key={character.id}
							alt={character.name}
							img={character.image}
						/>
					))}
					</div>
				</div>
				<Footer/>
			</Wrapper>
		)
	}
}


export default App;
