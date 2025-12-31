import { a, defineData, type ClientSchema } from '@aws-amplify/backend';
import { AuthGroups } from '../../lib/auth-groups';

export enum Status {
    // Status enum for tracking progress of contact messages
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',

    // Status enum for blog post publication state
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

const schema = a.schema({
    // Project model representing a portfolio project
    // Only accessible by users in the ADMINS group and
    // is managed on the Admin dashboard. The type can be
    // found on the types/project.ts file.
    Project: a.model({
        title: a.string().required(),
        description: a.string().required(),
        technologies: a.string().array().required(),
        metrics: a.string(),
        slug: a.string().required(),
        // STAR Model fields
        situation: a.string(),
        task: a.string(),
        actions: a.string().array(),
        results: a.string().array(),
        // Assets - stored as JSON string
        assets: a.json(),
        // Optional links
        githubUrl: a.string(),
        // Status and timestamp
        status: a.enum([Status.DRAFT, Status.PUBLISHED, Status.ARCHIVED]),
        updatedAt: a.datetime(),
    }).authorization(allow => [allow.group(AuthGroups.ADMINS)]),

    Blog: a.model({
        title: a.string().required(),
        slug: a.string().required(),
        content: a.string().required(),
        tags: a.string().array(),
        status: a.enum([Status.DRAFT, Status.PUBLISHED, Status.ARCHIVED]),
        updatedAt: a.datetime(),
    }).authorization(allow => [allow.group(AuthGroups.ADMINS)]),

    // Contact message from contact form on the home page
    Contact: a.model({
        name: a.string().required(),
        email: a.email().required(),
        message: a.string().required(),
        status: a.enum([Status.NEW, Status.IN_PROGRESS, Status.DONE]),
        createdAt: a.datetime(),
    }).authorization(allow => [allow.publicApiKey(), allow.group(AuthGroups.ADMINS)]),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: { expiresInDays: 30 }
    }
});
