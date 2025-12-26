import express from 'express';
import { AuthRoutes } from '../app/modules/auth/auth.route';
import { CommentRoutes } from '../app/modules/comments/comments.route';
import { ContentRoutes } from '../app/modules/contents/contents.route';
import { ForumRoutes } from '../app/modules/forums/forums.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { UserContactRoutes } from '../app/modules/user_contacts/user_contacts.route';
import { WaitingListRoutes } from '../app/modules/waiting/waiting.route';
import { ForumCategoryRoutes } from '../app/modules/forums_category/forums-category.route';
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
    path: '/user-contacts',
    route: UserContactRoutes,
  },
  {
    path: '/forums-category',
    route: ForumCategoryRoutes,
  },
];

apiRoutes.forEach(route => router.use(route.path, route.route));

export default router;
