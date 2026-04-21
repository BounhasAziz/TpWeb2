import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { createContext, AppContext } from './context/context';

const schema = createSchema<AppContext>({ typeDefs, resolvers });

const yoga = createYoga<AppContext>({
  schema,
  context: createContext,
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log('Server running at http://localhost:4000/graphql');
});
