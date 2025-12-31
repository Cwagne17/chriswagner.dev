import { Status } from "@/amplify/data/resource";

export const BLOG_STATUS = {
    DRAFT: Status.DRAFT,
    PUBLISHED: Status.PUBLISHED,
    ARCHIVED: Status.ARCHIVED,
} as const;

export type BlogStatus = Status.DRAFT | Status.PUBLISHED | Status.ARCHIVED;

export interface Blog {
    id?: string;
    title: string;
    slug: string;
    content: string;
    tags?: string[];
    status: BlogStatus;
    updatedAt?: string;
}