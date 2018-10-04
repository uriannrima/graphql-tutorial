var roomData = {};

/**
 * Start the First Seeder here.
 */
module.exports = {
  delete: true,
  services: [
    {
      path: 'users',
      count: 1,
      template: {
        'email': '{{internet.email}}',
        'firstName': '{{name.firstName}}',
        'lastName': '{{name.lastName}}',
        'password': 'password',
        createdAt: () => new Date().toISOString()
      },
      callback(user, seed) {
        // console.info(`User created: ${user._id}!`);
        return seedBuildings(user, seed);
      }
    }
  ]
};

const seedBuildings = function (user, seed) {
  return seed({
    count: 2,
    path: 'buildings',
    template: {
      'userId': () => user._id,
      'name': '{{company.companyName}}',
      'address1': '{{address.streetAddress}}',
      'address2': '{{address.secondaryAddress}}',
      'city': '{{address.city}}',
      'state': '{{address.state}}',
      createdAt: () => new Date().toISOString()
    },
    callback(building, seed) {
      // console.info(`Building created: ${building._id}!`);
      return seedRoom(building, seed);
    }
  });
};

const seedRoom = function (building, seed) {
  return seed({
    count: 1,
    path: 'rooms',
    template: {
      'userId': () => building.userId,
      'buildingId': () => building._id,
      'label': 'Living Room',
      createdAt: () => new Date().toISOString()
    },
    callback(room, seed) {
      // console.info(`Room created ${room._id}!`);
      if (roomData[room.buildingId]) {
        roomData[room.buildingId].push(room);
      } else {
        roomData[room.buildingId] = [room];
      }
      return seedPanel(room, seed);
    }
  });
};

const seedPanel = function (room, seed) {
  return seed({
    count: 1,
    path: 'panels',
    template: {
      'userId': () => room.userId,
      'buildingId': () => room.buildingId,
      'name': '{{lorem.word}}',
      'rating': 200,
      'slots': 20,
      createdAt: () => new Date().toISOString()
    },
    callback(panel, seed, room) {
      //  console.info(`Panel created ${panel._id}!`);
      return seedBreaker(panel, seed);
    }
  });
};

const seedBreaker = function (panel, seed) {
  return seed({
    count: 20,
    path: 'breakers',
    template: {
      'userId': () => panel.userId,
      'panelId': () => panel._id,
      'label': '{{lorem.word}}',
      'description': '{{lorem.words}}',
      'rating': 20,
      createdAt: () => new Date().toISOString()
    },
    callback(breaker, seed) {
      // console.info(`Breaker created ${breaker._id}!`);
      return seedLoads(breaker, seed, panel);
    }
  });
};

const seedLoads = function (breaker, seed, panel) {
  //  console.log(roomData[panel.buildingId]);
  var rooms = roomData[panel.buildingId];
  var room = rooms[Math.floor(Math.random() * rooms.length)];
  return seed({
    count: 2,
    path: 'loads',
    template: {
      'userId': () => breaker.userId,
      'breakerId': () => breaker._id,
      'roomId': () => room._id,
      'label': 'Outlet',
      'type': 'Single',
      createdAt: () => new Date().toISOString()
    },
    callback(load, seed) {
      // console.info(`Load created ${load._id}!`);
      return seedToggles(load, seed);
    }
  });
};

const seedToggles = function (load, seed) {
  return seed({
    count: 1,
    path: 'toggles',
    template: {
      'userId': () => load.userId,
      'loadId': () => load._id,
      'text': 'Light switch',
      createdAt: () => new Date().toISOString()
    }
  });
};