import {z} from "zod";

export const apiResponseSchema = z.object({
    status: z.enum(["success", "error","fail"]),
    message: z.string(),
    data: z.any().optional()
});

export type ApiResponse = z.infer<typeof apiResponseSchema>;