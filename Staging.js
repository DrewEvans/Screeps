var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleInfantry = require('role.infantry');
var roleArcher = require('role.archer');






module.exports.loop = function () {

    clearCreepsFromMemory();

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgrader.length);

    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builder.length);

    var infantry = _.filter(Game.creeps, (creep) => creep.memory.role == 'infantry');
    console.log('Infantry: ' + infantry.length);

    var archer = _.filter(Game.creeps, (creep) => creep.memory.role == 'archer');
    console.log('Archer: ' + archer.length);

    spawnCreeps(harvester, upgrader, builder, infantry, archer);


    var creep = exportRoles();

    var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
    console.log("Hostiles: " + hostiles.length);

};

var creepSetupsByRole = {
    "harvester": {
        "min": 4,
        "body": [WORK, WORK, CARRY, MOVE],
        "max": 5,
        "roleName": 'harvester',
    },
    "upgrader": {
        "min": 2,
        "body": [WORK, CARRY, CARRY, MOVE],
        "max": 2,
        "roleName": 'upgrader'
    },
    "builder": {
        "min": 2,
        "body": [WORK, CARRY, MOVE, MOVE],
        "max": 0,
        "roleName": 'builder'
    },
    "infantry": {
        "min": 1,
        "body": [TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, MOVE],
        "max": 10,
        "roleName": 'infantry'
    },
    "archer": {
        "min": 1,
        "body": [TOUGH, RANGED_ATTACK, MOVE],
        "max": 1,
        "roleName": 'archer'
    },

};
function spawnCreeps(upgrader, builder, infantry, archer) {
    if (upgrader.length < creepSetupsByRole.upgrader.max) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'upgrader'
            }
        });
    }
    if (harvester.length < creepSetupsByRole.harvester.max) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'harvester'
            }
        });
    }
    if (builder.length < creepSetupsByRole.builder.max) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new Builder: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'builder'
            }
        });
    }
    if (infantry.length < creepSetupsByRole.infantry.max) {
        var newName = 'Infantry' + Game.time;
        console.log('Spawning new Infantry: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'infantry'
            }
        });
    }
    if (archer.length < creepSetupsByRole.archer.max) {
        var newName = 'Archer' + Game.time;
        console.log('Spawning new Archer: ' + newName);
        Game.spawns['PIP'].spawnCreep([WORK, WORK, CARRY, MOVE], newName, {
            memory: {
                role: 'archer'
            }
        });
    }
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
        }
        return creep;
    }
}

function clearCreepsFromMemory() {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}


