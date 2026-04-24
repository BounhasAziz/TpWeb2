import { AppContext } from '../../context/context';

export const cvQueries = {
  cvs: (_parent: unknown, _args: unknown, context: AppContext) => {
    return context.prisma.cv.findMany();
  },
  cv: (_parent: unknown, args: { id: string }, context: AppContext) => {
    return context.prisma.cv.findUnique({ where: { id: args.id } });
  },
};
