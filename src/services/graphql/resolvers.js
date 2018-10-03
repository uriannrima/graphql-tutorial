// src/services/graphql/resolvers.js
import request from 'request-promise';

export default function Resolvers() {
  const app = this;

  const Users = app.service('users');
  const Buildings = app.service('buildings');
  const Panels = app.service('panels');
  const Rooms = app.service('rooms');
  const Images = app.service('images');
  const Breakers = app.service('breakers');
  const Loads = app.service('loads');
  const Toggles = app.service('toggles');
  const Viewer = app.service('viewer');

  const localRequest = request.defaults({
    baseUrl: `http://${app.get('host')}:${app.get('port')}`,
    json: true
  });

  // Define services here
  return {
    User: {
      buildings(user, args, context) {
        return Buildings.find({
          query: {
            userId: user._id
          }
        });
      }
    },
    Building: {
      panels(building, args, context) {
        return Panels.find({
          query: {
            buildingId: building._id
          }
        });
      },
      rooms(building, args, context) {
        return Rooms.find({
          query: {
            buildingId: building._id
          }
        });
      }
    },
    Panel: {
      breakers(panel, args, context) {
        return Breakers.find({
          query: {
            panelId: panel._id
          }
        });
      },
      image(panel, args, context) {
        return Images.find({
          query: {
            panelId: panel._id
          }
        });
      }
    },
    Room: {
      loads(room, args, context) {
        return Loads.find({
          query: {
            roomId: room._id
          }
        });
      }
    },
    Image: {
    },
    Breaker: {
      loads(breaker, args, context) {
        return Loads.find({
          query: {
            breakerId: breaker._id
          }
        });
      }
    },
    Load: {
      switches(load, args, context) {
        return Toggles.find({
          query: {
            loadId: load._id
          }
        });
      }
    },
    Toggle: {
    },
    AuthPayload: {
      data(auth, args, context) {
        return auth.data;
      }
    },
    RootQuery: {
      viewer(root, args, context) {
        return Viewer.find(context);
      },
      buildings(root, args, context) {
        return Buildings.find(context);
      }
    },
    RootMutation: {
      signUp(root, args, context) {
        return Users.create(args)
      },
      logIn(root, { username, password }, context) {
        return localRequest({
          uri: '/auth/local',
          method: 'POST',
          body: { username, password }
        });
      }
    }
  };
}