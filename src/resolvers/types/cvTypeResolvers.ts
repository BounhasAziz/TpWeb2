import { AppContext } from '../../context/context';
import type { Cv } from '../../generated/prisma/client';

export const CvTypeResolvers = {
  user: (parent: Cv, _args: unknown, context: AppContext) => {
    return context.prisma.user.findUnique({ where: { id: parent.userId } });
  },
  skills: (parent: Cv, _args: unknown, context: AppContext) => {
    return context.prisma.skill.findMany({ where: { cvs: { some: { id: parent.id } } } });
  },
};
