import type { CollectionConfig } from 'payload'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
   {
    name: "username",
    required: true,
    type: "text",
    unique: true,
   },
  ],
}
export default Users

