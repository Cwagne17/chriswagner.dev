// Status enum for blog post publication state
// Note: This must match the Status enum in amplify/data/resource.ts
export enum BlogStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

export const BLOG_STATUS = {
    DRAFT: BlogStatus.DRAFT,
    PUBLISHED: BlogStatus.PUBLISHED,
    ARCHIVED: BlogStatus.ARCHIVED,
} as const;

export interface Blog {
    id?: string;
    title: string;
    slug: string;
    content: string;
    tags?: string[];
    status: BlogStatus.DRAFT | BlogStatus.PUBLISHED | BlogStatus.ARCHIVED;
    updatedAt?: string;
}