import { z } from "zod";

export const refundSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zip: z.string().min(6, { message: "Zip code is required" }),
    phone: z.string().min(10, { message: "Phone number is required" }),
    bankName: z.string().min(1, { message: "Bank name is required" }),
    isUsingInternetBanking: z.boolean(),
    dob:z.coerce.date({message:"dob must be a valid date"}),
    amount: z.number().positive({ message: "Amount must be a positive number" }),
});

export const editSchema = refundSchema.extend({
    id: z.string().uuid({ message: "Invalid ID format" }),
});

export type EditRefund = z.infer<typeof editSchema>;

export type Refund = z.infer<typeof refundSchema>;
