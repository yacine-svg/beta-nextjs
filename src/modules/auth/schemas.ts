import { z } from "zod";
export const registreSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3),
        username: z
            .string()
            .min(3, "Username must be at least 3 characters long")
            .max(63, "Username must be at most 63 characters long")
            .regex(
            /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
            "Username can only contain lowercase letters, numbers, and hyphens, and must start and end with a letter or number"
            )
            .refine(
                (val) => !val.includes("--"),
                "Username cannot contain consecutive hyphens"
            )
            .transform((val) => val.toLowerCase()), // Ensure username is lowercase
    })
    export const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3),
    });