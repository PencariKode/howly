import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    roomId: {
        type: String,
        required: true,
        unique: true,
    },
    roomCode: {
        type: String,
        required: true,
        unique: true,
    },
    roomStatus: {
        type: String,
        enum: ['waiting', 'playing', 'finished'],
        default: 'waiting',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    maxPlayers: {
        type: Number,
        default: 10,
        required: true,
    },
    roleSet: {
        type: String,
        enum: ['default', 'custom'],
        default: 'default',
        required: true,
    },
    roleConfig: {
        warga: {
            type: Number,
            required: true,
        },
        werewolf: {
            type: Number,
            required: true,
        },
        peramal: {
            type: Number,
            required: true,
        },
        penyihir: {
            type: Number,
            required: true,
        },
        pemburu: Number,
        dukun: Number,
        raja: Number,
        blackwolf: Number,
        shapeshifter: Number
    }
});

export default mongoose.models.Room || mongoose.model('Room', roomSchema);