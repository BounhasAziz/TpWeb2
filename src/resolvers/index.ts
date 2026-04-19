import { cvQueries } from './query/cvQueries';
import { cvMutations } from './mutation/cvMutations';
import { cvSubscriptions } from './subscription/cvSubscriptions';
import { CvTypeResolvers } from './types/cvTypeResolvers';

export const resolvers = {
  Query: {
    ...cvQueries,
  },
  Mutation: {
    ...cvMutations,
  },
  Subscription: {
    ...cvSubscriptions,
  },
  Cv: {
    ...CvTypeResolvers,
  },
};
