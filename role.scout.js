module.exports = {
    run: function (creep) {
        creep.moveTo(new RoomPosition(25, 20, 'W6N8'));
        if (creep.room.controller) {
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
}