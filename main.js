var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleInfantry = require('role.infantry');
var roleArcher = require('role.archer');
var roleScout = require('role.scout');
var roleMechanic = require('role.mechanic');

function clearCreepsFromMemory() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function towerDefence() {
    var tower = Game.getObjectById('67337f72828970e');
    if(tower) {
        /*var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }*/

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
}

function SpawnCreeps(harvesters, upgrader, builder, infantry, archer, mechanic, scout) {
    if (harvesters.length < 5) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'harvester'
            }
        });
    }
    if (upgrader.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'upgrader'
            }
        });
    }
    if (builder.length <1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'builder'
            }
        });
    }
    /*if (infantry.length < 1) {
        var newName = 'Infantry' + Game.time;
        console.log('Spawning new Infantry: ' + newName);
        Game.spawns['PIP'].spawnCreep([TOUGH, TOUGH, TOUGH, ATTACK, MOVE, MOVE], newName, {
            memory: {
                role: 'infantry'
            }
        });
    }*/
    if (archer.length < 1) {
        var newName = 'archer' + Game.time;
        console.log('Spawning new archer: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], newName, {
            memory: {
                role: 'archer'
            }
        });
    }
    if (mechanic.length < 2) {
        var newName = 'mechanic' + Game.time;
        console.log('Spawning new mechanic: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'mechanic'
            }
        });
    }
    /*if (scout.length < 1) {
        var newName = 'Scout' + Game.time;
        console.log('Spawning new scout: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, {
            memory: {
                role: 'scout'
            }
        });
    }*/
}

function exportRoles() {
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'infantry') {
            roleInfantry.run(creep);
        } else if (creep.memory.role == 'archer') {
            roleArcher.run(creep);
        } else if (creep.memory.role == 'scout') {
            roleScout.run(creep);
        } else if (creep.memory.role == 'mechanic') {
            roleMechanic.run(creep);
        }
    }
    return creep;
}

module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var infantry = _.filter(Game.creeps, (creep) => creep.memory.role == 'infantry');
    var archer = _.filter(Game.creeps, (creep) => creep.memory.role == 'archer');
    var mechanic = _.filter(Game.creeps, (creep) => creep.memory.role == 'mechanic');
    var scout = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');

    console.log('Harvester:|' + harvesters.length + '| Upgraders:|' + upgrader.length + '| Builders:|' + builder.length + '| Infantry:|' + infantry.length + '| Mechanic:|' + mechanic.length + '|');

    SpawnCreeps(harvesters, upgrader, builder, infantry, archer, mechanic, scout);

    clearCreepsFromMemory();

    var creep = exportRoles();

    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    console.log("Hostiles: " + hostiles.length);

    towerDefence();

   /*var sources = Game.spawns['PIP'].room.find(FIND_SOURCES);
    for (var j = 0; j < sources.length; j++) {
        var road = Game.spawns['PIP'].pos.findPathTo(sources[j].pos);
        for (var i = 0; i < road.length; i++) {
            Game.spawns['PIP'].room.createConstructionSite(road[i].x, road[i].y, STRUCTURE_ROAD);
        }
    }*/

    var Container = creep.room.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_CONTAINER &&
            s.store[RESOURCE_ENERGY] > 0
    })
    console.log('Number of containers:' + Container.length);
};

