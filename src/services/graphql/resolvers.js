// src/services/graphql/resolvers.js
// import request from 'request-promise';

export default function Resolvers() {
  const app = this;

  const Buildings = app.service('buildings');
  const Panels = app.service('panels');
  const Rooms = app.service('rooms');
  const Images = app.service('images');
  const Breakers = app.service('breakers');
  const Loads = app.service('loads');
  const Toggles = app.service('toggles');
  const Viewer = app.service('viewer');
  const Users = app.service('users');
  const Authentication = app.service('authentication');

  // Define services here
  return {
    User: {
      buildings(user) {
        return Buildings.find({
          query: {
            userId: user._id
          }
        }).then(result => result.data);
      }
    },
    Building: {
      panels(building) {
        return Panels.find({
          query: {
            buildingId: building._id
          }
        }).then(result => result.data);
      },
      rooms(building) {
        return Rooms.find({
          query: {
            buildingId: building._id
          }
        }).then(result => result.data);
      }
    },
    Panel: {
      breakers(panel) {
        return Breakers.find({
          query: {
            panelId: panel._id
          }
        }).then(result => result.data);
      },
      image(panel) {
        return Images.find({
          query: {
            panelId: panel._id
          }
        }).then(result => result.data);
      }
    },
    Room: {
      loads(room) {
        return Loads.find({
          query: {
            roomId: room._id
          }
        }).then(result => result.data);
      }
    },
    Image: {
    },
    Breaker: {
      loads(breaker) {
        return Loads.find({
          query: {
            breakerId: breaker._id
          }
        }).then(result => result.data);
      }
    },
    Load: {
      switches(load) {
        return Toggles.find({
          query: {
            loadId: load._id
          }
        }).then(result => result.data);
      }
    },
    Toggle: {
    },
    AuthPayload: {
      data(auth) {
        return auth.data;
      }
    },
    RootQuery: {
      viewer(root, args, context) {
        return Viewer.find(context).then(result => result.data);
      },
      buildings(root, args, context) {
        return Buildings.find(context).then(result => result.data);
      },
      building(root, { _id }, context) {
        return Buildings.get(_id, context);
      },
      rooms(root, args, context) {
        return Rooms.find(context).then(result => result.data);
      },
      room(root, { _id }, context) {
        return Rooms.get(_id, context);
      }
    },
    RootMutation: {
      signUp(root, args) {
        return Users.create(args);
      },
      logIn(root, { email, password }, context) {
        const authContext = { email, password, strategy: 'local' };
        return Authentication.create(authContext, context).then(({ accessToken: token }) => {
          const user = context.user;
          delete user.password;
          return {
            token,
            data: user
          };
        });
      }
    }
  };
}