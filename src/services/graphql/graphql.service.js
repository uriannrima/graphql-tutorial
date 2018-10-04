// Initializes the `graphql` service on path `/graphql`
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
// const createService = require('./graphql.class.js');
const hooks = require('./graphql.hooks');

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

  // Initialize our service with any options it requires
  app.use('/graphql', graphqlExpress(req => {
    let { headers: { authorization }, provider } = req.feathers;
    return {
      schema: executableSchema,
      context: {
        token: authorization,
        provider
      }
    };
  }));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  // Get our initialized service so that we can register hooks
  // const service = app.service('graphql');

  // service.hooks(hooks);
};
