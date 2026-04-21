import { users, cvs, skills, cvSkills } from '../data/db';
import type { UserRecord, CvRecord, SkillRecord, CvSkillRecord } from '../data/db';

export interface AppContext {
  db: {
    users: UserRecord[];
    cvs: CvRecord[];
    skills: SkillRecord[];
    cvSkills: CvSkillRecord[];
  };
}

export const createContext = (): AppContext => ({
  db: { users, cvs, skills, cvSkills },
});
