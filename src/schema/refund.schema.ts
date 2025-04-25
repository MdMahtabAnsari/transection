// model Refund{
//     id          String   @id @default(uuid())
//     name        String
//     email       String
//     address     String
//     city        String
//     state       String
//     zip         String
//     phone       String
//     bankName   String
//     isUsingInternetBanking Boolean
//     dob        DateTime
//     amount     Float
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

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

export type Refund = z.infer<typeof refundSchema>;
