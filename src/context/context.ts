import { createPubSub } from 'graphql-yoga';
import { PrismaClient } from '../generated/prisma/client';
import type { Cv } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';
import { EVENTS } from '../constants/pubsubEvents';

export type AppPubSub = ReturnType<typeof createPubSub<{ [EVENTS.CV_CHANGED]: [cv: Cv] }>>;

export const pubSub: AppPubSub = createPubSub<{ [EVENTS.CV_CHANGED]: [cv: Cv] }>();

export interface AppContext {
  prisma: PrismaClient;
  pubSub: AppPubSub;
}

export const createContext = (): AppContext => ({
  prisma,
  pubSub,
});
