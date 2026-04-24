import { createPubSub } from 'graphql-yoga';
import { users, cvs, skills, cvSkills } from '../data/db';
import type { UserRecord, CvRecord, SkillRecord, CvSkillRecord } from '../data/db';
import { EVENTS } from '../constants/pubsubEvents';

export type AppPubSub = ReturnType<typeof createPubSub<{ [EVENTS.CV_CHANGED]: [cv: CvRecord] }>>;

export const pubSub: AppPubSub = createPubSub<{ [EVENTS.CV_CHANGED]: [cv: CvRecord] }>();

export interface AppContext {
  db: {
    users: UserRecord[];
    cvs: CvRecord[];
    skills: SkillRecord[];
    cvSkills: CvSkillRecord[];
  };
  pubSub: AppPubSub;
}

export const createContext = (): AppContext => ({
  db: { users, cvs, skills, cvSkills },
  pubSub,
});
