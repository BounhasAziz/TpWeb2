import { AppContext } from '../../context/context';
import { EVENTS } from '../../constants/pubsubEvents';

interface CreateCvInput {
  name: string;
  age: number;
  job: string;
  userId: string;
  skillIds: string[];
}

interface UpdateCvInput {
  name?: string;
  age?: number;
  job?: string;
  userId?: string;
  skillIds?: string[];
}

const ensureUserExists = async (userId: string, context: AppContext): Promise<void> => {
  const found = await context.prisma.user.findUnique({ where: { id: userId } });
  if (!found) throw new Error(`User with id ${userId} not found`);
};

const ensureSkillsExist = async (skillIds: string[], context: AppContext): Promise<string[]> => {
  const uniqueIds = [...new Set(skillIds)];
  const found = await context.prisma.skill.findMany({ where: { id: { in: uniqueIds } } });
  const missing = uniqueIds.filter((id) => !found.some((s) => s.id === id));
  if (missing.length > 0) throw new Error(`Skill(s) not found: ${missing.join(', ')}`);
  return uniqueIds;
};

export const cvMutations = {
  createCv: async (
    _parent: unknown,
    args: { input: CreateCvInput },
    context: AppContext,
  ) => {
    const { name, age, job, userId, skillIds } = args.input;

    await ensureUserExists(userId, context);
    const checkedSkillIds = await ensureSkillsExist(skillIds, context);

    const cv = await context.prisma.cv.create({
      data: {
        name,
        age,
        job,
        user: { connect: { id: userId } },
        skills: { connect: checkedSkillIds.map((id) => ({ id })) },
      },
    });

    context.pubSub.publish(EVENTS.CV_CHANGED, cv);
    return cv;
  },

  updateCv: async (
    _parent: unknown,
    args: { id: string; input: UpdateCvInput },
    context: AppContext,
  ) => {
    const existing = await context.prisma.cv.findUnique({ where: { id: args.id } });
    if (!existing) throw new Error(`Cv with id ${args.id} not found`);

    const { name, age, job, userId, skillIds } = args.input;

    if (userId !== undefined) await ensureUserExists(userId, context);
    const checkedSkillIds = skillIds !== undefined
      ? await ensureSkillsExist(skillIds, context)
      : undefined;

    const cv = await context.prisma.cv.update({
      where: { id: args.id },
      data: {
        ...(name !== undefined && { name }),
        ...(age !== undefined && { age }),
        ...(job !== undefined && { job }),
        ...(userId !== undefined && { user: { connect: { id: userId } } }),
        ...(checkedSkillIds !== undefined && {
          skills: { set: checkedSkillIds.map((id) => ({ id })) },
        }),
      },
    });

    context.pubSub.publish(EVENTS.CV_CHANGED, cv);
    return cv;
  },

  deleteCv: async (
    _parent: unknown,
    args: { id: string },
    context: AppContext,
  ) => {
    const existing = await context.prisma.cv.findUnique({ where: { id: args.id } });
    if (!existing) return false;

    await context.prisma.cv.delete({ where: { id: args.id } });

    context.pubSub.publish(EVENTS.CV_CHANGED, existing);
    return true;
  },
};
