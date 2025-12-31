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
        link: a.string().required(),
        metrics: a.string().required(),
        gradient: a.string().required(),
        slug: a.string().required(),
        challengeContent: a.string(),
        solutionContent: a.string(),
        processSteps: a.string().array(),
        results: a.string().array(),
        architectureImage: a.string(),
        architectureAlt: a.string(),
        githubUrl: a.string(),
        downloadTitle: a.string(),
        downloadUrl: a.string(),
        downloadDescription: a.string(),
        demoUrl: a.string(),
        status: a.enum([Status.DRAFT, Status.PUBLISHED, Status.ARCHIVED]),
    }).authorization(allow => [allow.group(AuthGroups.ADMINS)]),

    Blog: a.model({
        date: a.date(),
        title: a.string(),
        slug: a.string(),
        content: a.string(),
        status: a.enum([Status.DRAFT, Status.PUBLISHED, Status.ARCHIVED]),
    }).authorization(allow => [allow.group(AuthGroups.ADMINS)]),

    // Contact message from contact form on the home page
    Contact: a.model({
        name: a.string(),
        email: a.string(),
        message: a.string(),
        status: a.enum([Status.NEW, Status.IN_PROGRESS, Status.DONE]),
    }).authorization(allow => [allow.publicApiKey()]),
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
