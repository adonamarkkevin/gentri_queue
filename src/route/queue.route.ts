import { createQueue, updateQueue } from "../controller/queue.controller";

export const queueRoutes: {
    path: string;
    method: string;
    action: any;
}[] = [
    {
        path: "/api/v1/queue/create",
        method: "post",
        action: createQueue,
    },

    {
        path: "/api/v1/queue/update/:queue_number",
        method: "put",
        action: updateQueue,
    },
];
