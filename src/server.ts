import { createServer } from 'node:http';
import { createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { createContext } from './context/context';

const yoga = createYoga({
  schema: { typeDefs, resolvers } as any,
  context: createContext,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
