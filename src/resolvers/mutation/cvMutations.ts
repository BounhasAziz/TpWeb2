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

const ensureUserExists = (userId: string, context: AppContext): void => {
  const found = context.db.users.some((user) => user.id === userId);
  if (!found) throw new Error(`User with id ${userId} not found`);
};

const ensureSkillsExist = (skillIds: string[], context: AppContext): string[] => {
  const uniqueIds = [...new Set(skillIds)];
  const existingIds = new Set(context.db.skills.map((skill) => skill.id));
  const missing = uniqueIds.filter((id) => !existingIds.has(id));
  if (missing.length > 0) throw new Error(`Skill(s) not found: ${missing.join(', ')}`);
  return uniqueIds;
};

const nextCvId = (context: AppContext): string => {
  const numericIds = context.db.cvs
    .map((cv) => Number.parseInt(cv.id, 10))
    .filter((id) => Number.isFinite(id));
  const max = numericIds.length > 0 ? Math.max(...numericIds) : 100;
  return String(max + 1);
};

export const cvMutations = {
  createCv: (
    _parent: unknown,
    args: { input: CreateCvInput },
    context: AppContext,
  ) => {
    const { name, age, job, userId, skillIds } = args.input;

    ensureUserExists(userId, context);
    const checkedSkillIds = ensureSkillsExist(skillIds, context);

    const newCv = { id: nextCvId(context), name, age, job, userId };

    context.db.cvs.push(newCv);
    checkedSkillIds.forEach((skillId) => {
      context.db.cvSkills.push({ cvId: newCv.id, skillId });
    });

    context.pubSub.publish(EVENTS.CV_CHANGED, newCv);
    return newCv;
  },

  updateCv: (
    _parent: unknown,
    args: { id: string; input: UpdateCvInput },
    context: AppContext,
  ) => {
    const cv = context.db.cvs.find((item) => item.id === args.id);
    if (!cv) throw new Error(`Cv with id ${args.id} not found`);

    const { name, age, job, userId, skillIds } = args.input;

    if (userId !== undefined) {
      ensureUserExists(userId, context);
      cv.userId = userId;
    }

    if (skillIds !== undefined) {
      const checkedSkillIds = ensureSkillsExist(skillIds, context);
      const keptLinks = context.db.cvSkills.filter((link) => link.cvId !== cv.id);
      context.db.cvSkills.length = 0;
      context.db.cvSkills.push(...keptLinks);
      checkedSkillIds.forEach((skillId) => {
        context.db.cvSkills.push({ cvId: cv.id, skillId });
      });
    }

    if (name !== undefined) cv.name = name;
    if (age !== undefined) cv.age = age;
    if (job !== undefined) cv.job = job;

    context.pubSub.publish(EVENTS.CV_CHANGED, cv);
    return cv;
  },

  deleteCv: (_parent: unknown, args: { id: string }, context: AppContext) => {
    const index = context.db.cvs.findIndex((cv) => cv.id === args.id);
    if (index === -1) return false;

    const deletedCv = context.db.cvs[index];
    context.db.cvs.splice(index, 1);

    const remainingLinks = context.db.cvSkills.filter((link) => link.cvId !== args.id);
    context.db.cvSkills.length = 0;
    context.db.cvSkills.push(...remainingLinks);

    context.pubSub.publish(EVENTS.CV_CHANGED, deletedCv);
    return true;
  },
};
