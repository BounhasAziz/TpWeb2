// Personne 4 — Field resolvers for Cv type (user, skills)
import { AppContext } from '../../context/context';
import type { CvRecord } from '../../data/db';

export const CvTypeResolvers = {
  user: (parent: CvRecord, _args: unknown, context: AppContext) => {
    return context.db.users.find((user) => user.id === parent.userId) ?? null;
  },
  skills: (parent: CvRecord, _args: unknown, context: AppContext) => {
    const relatedSkillIds = context.db.cvSkills
      .filter((link) => link.cvId === parent.id)
      .map((link) => link.skillId);

    return context.db.skills.filter((skill) => relatedSkillIds.includes(skill.id));
  },
};
