// Personne 3 — Query resolvers
import { AppContext } from '../../context/context';

export const cvQueries = {
  cvs: (_parent: unknown, _args: unknown, context: AppContext) => {
    return context.db.cvs;
  },
  cv: (_parent: unknown, args: { id: string }, context: AppContext) => {
    return context.db.cvs.find((cv) => cv.id === args.id) ?? null;
  },
};
