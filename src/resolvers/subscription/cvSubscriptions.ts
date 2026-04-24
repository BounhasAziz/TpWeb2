import { AppContext } from '../../context/context';
import { EVENTS } from '../../constants/pubsubEvents';
import type { CvRecord } from '../../data/db';

export const cvSubscriptions = {
  cvChanged: {
    subscribe: (_parent: unknown, _args: unknown, context: AppContext) =>
      context.pubSub.subscribe(EVENTS.CV_CHANGED),
    resolve: (cv: CvRecord) => cv,
  },
};
