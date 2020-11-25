import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameForm = props => {
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    const [currentGame, setCUrrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        getGameTypes()
    }, [])

    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value 
        setCUrrentGame(newGameState)
    } 
    return (
        <form className="gameForm">
        <h2 className="gameForm__title">Register New Game</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" required autoFocus className="form-control"
                    value={currentGame.title}
                    onChange={handleControlledInputChange}
                />
            </div>
        </fieldset>

        <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
