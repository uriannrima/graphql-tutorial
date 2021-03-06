// Initializes the `graphql` service on path `/graphql`
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
const { authenticate } = require('@feathersjs/authentication').express;
// const createService = require('./graphql.class.js');
// const hooks = require('./graphql.hooks');

import Resolvers from './resolvers';
import Schema from './schema';

module.exports = function (app) {

  // const paginate = app.get('paginate');

  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(app)
  });

  // const options = {
  //   paginate
  // };

  const graphQlAuth = async (req, res, next) => {
    // const { headers: { authorization } } = req.feathers;
    // if (authorization) {
    //   authenticate('jwt')(req, res, next);
    // } else {
    //   next();
    // }
    next();
  };

  // Initialize our service with any options it requires
  app.use('/graphql', graphQlAuth, graphqlExpress(req => {
    return {
      schema: executableSchema,
      context: req.feathers
    };
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  // Get our initialized service so that we can register hooks
  // const service = app.service('graphql');

  // service.hooks(hooks);
};
