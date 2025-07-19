import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    fields: [  
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: "description",
            type: "textarea",
        },
        {
            name: "price",
            type: "number",
            required: true,
            admin: {
                description: "Price in USD",
            }
        },
        {
            name: "category",
            type: "relationship",
            relationTo: 'categories',
            hasMany: false,
        },
        {
            name: "images",
            type: "upload",
            relationTo: 'media',
            hasMany: true,
        },
        {
            name: "refundPolicy",
            type: "select",
            options: ["30-day","14-day","7-day","3-day","1-day","no-refund"],
        },
    ],
}