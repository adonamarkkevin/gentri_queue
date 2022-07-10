import { userRoutes } from "./route/user.route";
import { queueRoutes } from "./route/queue.route";

export const AppRoutes = [...userRoutes, ...queueRoutes];
