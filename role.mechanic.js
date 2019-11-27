module.exports = {
    run: function (creep) {
        
        var closestDamagedStructure = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        
        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🔧 repair');
        }
        
        if (creep.memory.repairing) {
            if (closestDamagedStructure.length) {
                if (creep.repair(closestDamagedStructure[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure[0]);
                }
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};