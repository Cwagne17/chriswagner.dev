import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
    name: 'portfolioStorage',
    access: (allow) => ({
        'architecture-diagrams/*': [
            allow.groups(['ADMINS']).to(['read', 'write', 'delete'])
        ],
        'public/*': [
            allow.guest.to(['read']),
            allow.groups(['ADMINS']).to(['read', 'write', 'delete'])
        ]
    })
});