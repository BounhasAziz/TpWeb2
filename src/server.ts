import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { createContext } from './context/context';

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context: createContext,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
