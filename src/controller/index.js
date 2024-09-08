const Tournament = require("../schema/tournament")

exports.createTournament = async function(req,res){
    try {
        const {tournament_name,creator_name} = req.body
        const response = await Tournament.create({tournament_name,creator_name}) 
        if(response){
            return res.send({code:200,message:"tournament add successfully!",data:response})
        } else{
            return res.send({code:400,message:"bad request",data:{}})
        }
    } catch (err) {
        return res.send({code:500,message:err.message})
    }
}

exports.createRoom = async function(req,res){
    try {
        const {tournamentId,room_id} = req.body
        const checkData = await Tournament.findOne({_id:tournamentId})
        if(!checkData){
            return res.send({code:404,message:"Tournament not found",data:{}})
        }
        checkData.romms.push({room_id:room_id})
        await checkData.save()
            return res.send({code:200,message:"tournament add successfully!",data:checkData})
    } catch (err) {
        return res.send({code:500,message:err.message})
    }
}
exports.joinRoom = async function(req,res){
    try {
        const {tournamentId,room_id,player_name} = req.body
        const checkData = await Tournament.findById(tournamentId)
        if(!checkData){
            return res.send({code:404,message:"Tournament not found",data:{}})
        }
        const room = checkData.romms.find(room => room._id.toString() === room_id.toString());
        if (!room) {
            return res.send({ code: 404, message: "Room not found", data: {} });
        }
        room.players.push({ player_name:player_name, score: 0 });
        await checkData.save()
            return res.send({code:200,message:"tournament add successfully!",data:checkData})
    } catch (err) {
        return res.send({code:500,message:err.message})
    }
}

exports.saveScore = async function(req,res){
    try {
        const {tournamentId,room_id,player_id,score} = req.body
        console
        const checkData = await Tournament.findById(tournamentId)
        console.log("checkData",checkData)
        if(!checkData){
            return res.send({code:404,message:"Tournament not found",data:{}})
        }
        const room = checkData.romms.find(room => room._id.toString() === room_id.toString());
        if (!room) {
            return res.send({ code: 404, message: "Room not found", data: {} });
        }
        const players = room.players.find(player => player._id.toString() === player_id.toString());
        if (!room) {
            return res.send({ code: 404, message: "Players not found", data: {} });
        }
        players.score = score
             await checkData.save()
            return res.send({code:200,message:"tournament add successfully!",data:checkData})
    } catch (err) {
        return res.send({code:500,message:err.message})
    }
}
exports.findWinner= async function(req,res){
    try {
        const  tournamentId  = req.params.tournamentId;
        if (!tournamentId) {
            return res.send({ code: 400, message: "Tournament ID is required", data: {} });
        }
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.send({ code: 404, message: "Tournament not found", data: {} });
        }

        let highestScore = -Infinity;
        let winner = null;

        for (const room of tournament.romms) {
            for (const player of room.players) {
                if (player.score > highestScore) {
                    highestScore = player.score;
                    winner = { player_name: player.player_name, score: player.score, room_id: room._id };
                }
            }
        }

        if (winner) {
            return res.send({ code: 200, message: "Winner found!", data: winner });
        } else {
            return res.send({ code: 404, message: "No players found", data: {} });
        }
    } catch (err) {
        return res.send({code:500,message:err.message})
    }
}