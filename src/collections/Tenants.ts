import { isSuperAdmin } from '@/lib/access'
import type { CollectionConfig } from 'payload'

const Tenants: CollectionConfig = {
  slug: 'tenants',
  access : {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),    
  },
  admin: {
    useAsTitle: 'slug',
  },
  fields: [
   {
    name: "name",
    required: true,
    type: "text",
    label: "Store name",
    admin: {
    description: "This is the name of the store"
   }
   },
   {
    name:"slug",
    type: "text",
    index: true,
    required: true,
    unique: true,
    access: {
      update : ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
    description: "This is the subdomain for the store"
   },
   },
   {
    name: "image",
    type: "upload",
    relationTo: "media",
   },
   {
    name: "stripeAccountId",
    type: "text",
    required: true,
    access: {
        update: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
      description: "Stripe Account ID associated with your shop",
    }
   },
   {
    name: "stripeDetailsSubmited",
    type: "checkbox",
    admin: {
        description: "you cannot create products until your stripe details submitted"
    }
   }
  ],
}
export default Tenants

