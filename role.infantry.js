module.exports = {
    run: function (creep) {

        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hostiles[0]);
            creep.say("⚔️ Suck it!");
        } else {
            creep.moveTo(37, 38)
        }
    }
};