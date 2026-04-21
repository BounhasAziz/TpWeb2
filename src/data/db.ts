export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface SkillRecord {
  id: string;
  designation: string;
}

export interface CvRecord {
  id: string;
  name: string;
  age: number;
  job: string;
  userId: string;
}

export interface CvSkillRecord {
  cvId: string;
  skillId: string;
}

export const users: UserRecord[] = [
  { id: "1", name: "Aymen", email: "aymen@gmail.com", role: "ADMIN" },
  { id: "2", name: "Sara", email: "sara@gmail.com", role: "USER" },
  { id: "3", name: "Aziz", email: "aziz@gmail.com", role: "USER" },
];

export const skills: SkillRecord[] = [
  { id: "1", designation: "React" },
  { id: "2", designation: "Node.js" },
  { id: "3", designation: "TypeScript" },
  { id: "4", designation: "Spring Boot" },
  { id: "5", designation: "Docker" },
];

export const cvs: CvRecord[] = [
  { id: "101", name: "FullStack Dev", age: 28, job: "Freelancer", userId: "1" },
  { id: "102", name: "Backend Dev",  age: 32, job: "Engineer",   userId: "2" },
  { id: "103", name: "Frontend Dev", age: 25, job: "Intern",     userId: "3" },
];

export const cvSkills: CvSkillRecord[] = [
  { cvId: "101", skillId: "1" },
  { cvId: "101", skillId: "2" },
  { cvId: "101", skillId: "3" },
  { cvId: "102", skillId: "2" },
  { cvId: "102", skillId: "4" },
  { cvId: "102", skillId: "5" },
  { cvId: "103", skillId: "1" },
  { cvId: "103", skillId: "3" },
];
