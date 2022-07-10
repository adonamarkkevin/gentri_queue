import {
    clearQueue,
    createQueue,
    getAllPendingQueue,
    getAllQueueByDepartment,
    updateQueue,
} from "../controller/queue.controller";

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

    {
        path: "/api/v1/queue/get-all-pending",
        method: "get",
        action: getAllPendingQueue,
    },

    {
        path: "/api/v1/queue/get-all",
        method: "get",
        action: getAllQueueByDepartment,
    },

    {
        path: "/api/v1/queue/clear",
        method: "delete",
        action: clearQueue,
    },
];
