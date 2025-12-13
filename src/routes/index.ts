import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { ContentRoutes } from '../app/modules/contents/contents.route';
import { CommentRoutes } from '../app/modules/comments/comments.route';
import { WaitingListRoutes } from '../app/modules/waiting/waiting.route';
import { ForumRoutes } from '../app/modules/forums/forums.route';
import { UserContactRoutes } from '../app/modules/user_contacts/user_contacts.route';
const router = express.Router();

const apiRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/contents',
    route: ContentRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/waiting-list',
    route: WaitingListRoutes,
  },
  {
    path: '/forums',
    route: ForumRoutes,
  },
  {
    path: '/contact',
    route: UserContactRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
