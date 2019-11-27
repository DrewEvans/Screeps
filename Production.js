var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleInfantry = require('role.infantry');
var roleArcher = require('role.archer');

function SpawnCreeps(harvesters, upgrader, builder, infantry, archer) {
    if (harvesters.length < 6) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, CARRY, CARRY, MOVE], newName, {
            memory: {
                role: 'harvester'
            }
        });
    }
    if (upgrader.length < 4) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'upgrader'
            }
        });
    }
    if (builder.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'builder'
            }
        });
    }
    if (infantry.length < 2) {
        var newName = 'Infantry' + Game.time;
        console.log('Spawning new Infantry: ' + newName);
        Game.spawns['PIP'].spawnCreep([TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], newName, {
            memory: {
                role: 'infantry'
            }
        });
    }
    if (archer.length < 1) {
        var newName = 'Infantry' + Game.time;
        console.log('Spawning new archer: ' + newName);
        Game.spawns['PIP'].spawnCreep([TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE, MOVE], newName, {
            memory: {
                role: 'archer'
            }
        });
    }
}

module.exports.loop = function () {

    clearCreepsFromMemory();

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var infantry = _.filter(Game.creeps, (creep) => creep.memory.role == 'infantry');
    var archer = _.filter(Game.creeps, (creep) => creep.memory.role == 'archer');

    console.log('Harvester:|'+harvesters.length + '| Upgraders:|'+ upgrader.length + '| Builders:|'+ builder.length +'| Infantry:|'+infantry.length+'| Archer:|'+archer.length+'|');

    SpawnCreeps(harvesters, upgrader, builder, infantry, archer);

    var creep = exportRoles();

    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        console.log("Hostiles: " + hostiles.length);
    
};

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
        }
    }
    return creep;
}

function clearCreepsFromMemory() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}
