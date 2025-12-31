import { Status } from "@/amplify/data/resource";

export const CONTACT_STATUS = {
    NEW: Status.NEW,
    IN_PROGRESS: Status.IN_PROGRESS,
    DONE: Status.DONE,
} as const;

export type ContactStatus = Status.NEW | Status.IN_PROGRESS | Status.DONE;

export interface Contact {
    id?: string;
    name: string;
    email: string;
    message: string;
    status: ContactStatus;
    createdAt?: string;
}