/*module.exports = {
    run: function (creep) {
        var roomsOwned = creep.room.name == 'W1N7';
        var roomToCliam = creep.moveTo(new RoomPosition(25, 20, 'W7N5'));

        if (roomsOwned == true) {
            roomToCliam;
        } else {
            if (creep.room.controller) {
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }

                if (creep.signController(creep.room.controller, "#suckIt! You've been blocked") == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller)
                }
            }
        }
    }
};*/

module.exports = {
    run: function (creep) {

        var roomsOwned = creep.room.name == 'W1N7';
        var roomToCliam = creep.moveTo(new RoomPosition(25, 20, 'W7N4'));

        if (roomsOwned == true) {
            roomToCliam;
        }

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('Transfer Energy');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.roomsOwned(creep.room.controller);
            }
        } else {
            var allStorage = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (allStorage.length > 0) {
                if (creep.withdraw(allStorage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(allStorage[0])

                }
            }
        }
    }
} 
