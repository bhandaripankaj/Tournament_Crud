const express = require("express")
const controller = require('../controller/index')
const apiRouter = express.Router()

apiRouter.post('/create-tournament',controller.createTournament)
apiRouter.post('/create-room',controller.createRoom)
apiRouter.post('/join-room',controller.joinRoom)
apiRouter.post('/save-score',controller.saveScore)
apiRouter.get('/winner/:tournamentId',controller.findWinner)

module.exports = apiRouter
