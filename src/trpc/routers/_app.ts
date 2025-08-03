import { categoriesRouter } from '@/modules/categories/server/procedures';
import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedures';
import { productsRouter } from '@/modules/products/server/procedures';
import { tagsRouter } from '@/modules/tags/server/procedures';
import { tenantsRouter } from '@/modules/tenants/server/procedures';
export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  categories: categoriesRouter,
  products: productsRouter, // Ensure productsRouter is imported from the correct path
  // Add other routers here as needed
});
// export type definition of API
export type AppRouter = typeof appRouter;