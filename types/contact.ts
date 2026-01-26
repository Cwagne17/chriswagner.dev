// Status enum for tracking progress of contact messages
// Note: This must match the Status enum in amplify/data/resource.ts
export enum ContactStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export const CONTACT_STATUS = {
    NEW: ContactStatus.NEW,
    IN_PROGRESS: ContactStatus.IN_PROGRESS,
    DONE: ContactStatus.DONE,
} as const;

export interface Contact {
    id?: string;
    name: string;
    email: string;
    message: string;
    status: ContactStatus.NEW | ContactStatus.IN_PROGRESS | ContactStatus.DONE;
    createdAt?: string;
}