// Personne 2 — Context configuration
import { users, cvs, skills, cvSkills } from '../data/db';

export interface AppContext {
  db: {
    users: typeof users;
    cvs: typeof cvs;
    skills: typeof skills;
    cvSkills: typeof cvSkills;
  };
}

export const createContext = (): AppContext => ({
  db: { users, cvs, skills, cvSkills },
});
