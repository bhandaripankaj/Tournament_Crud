const mongoose = require('mongoose')
const tournament = new mongoose.Schema({
    tournament_name: {
        type: String
    },
    creator_name: {
        type: String
    },
    winner_name:{

        type: String
    },
    romms:[{
        room_id:{
            type: String
        },
        players:[{
            player_name: {
                type: String
            },
            score: {
                type: Number
            }
        }]
    }] 

}, {timestamps: true});

const Tournament = mongoose.model('tournament',tournament)
module.exports = Tournament