import { isSuperAdmin } from '@/lib/access'
import { Tenant } from '@/payload-types';
import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    access: {
        create: ({ req }) => {
            if (isSuperAdmin(req.user)) return true;

            const tenant = req.user?.tenants?.[0]?.tenant as Tenant

            return Boolean(tenant?.stripeDetailsSubmited);
        },
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin : {
        useAsTitle: "name",
    },
    fields: [  
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: "description",
            type: "richText",
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
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true,
        },
        {
            name: "image",
            type: "upload",
            relationTo: 'media',
            hasMany: true,
        },
        {
            name: "refundPolicy",
            type: "select",
            options: ["30-day","14-day","7-day","3-day","1-day","no-refunds"],
        },
        {
            name: "content",
            type: "richText",
            admin: {
                description:
                "Protected content only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, and bonus materials. Supports Markdown formatting"
            }
        },
        {
            name: "isArchived",
            label: "Archive",
            defaultValue: false,
            type: "checkbox",
            admin: {
                description: "If checked, this product will be archived"
            }
        },
        {
            name: "isPrivate",
            label: "Private",
            defaultValue: false,
            type: "checkbox",
            admin: {
                description: "If checked, this product will be not be shown on the public storefront"
            }
        }
    ],
}