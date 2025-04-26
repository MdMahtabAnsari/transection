import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/schema/apiResponse.schema";
import { refundSchema, Refund } from "@/schema/refund.schema";
import { sendConfirmationEmail } from "@/helpers/confirmationMail";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const parsedBody = refundSchema.safeParse(body);
    if (!parsedBody.success) {
        const errorResponse: ApiResponse = {
            status: "error",
            message: "Validation failed",
            data: parsedBody.error.format(),
        };
        return NextResponse.json(errorResponse, { status: 400 });
    }

    const refundData: Refund = parsedBody.data;

    try {
        const refund = await prisma.refund.create({
            data: refundData,
        });
        await sendConfirmationEmail(refund);

        const successResponse: ApiResponse = {
            status: "success",
            message: "Refund created successfully",
            data: refund,
        };
        return NextResponse.json(successResponse, { status: 201 });
    } catch (error) {
        const errorResponse: ApiResponse = {
            status: "error",
            message: "Failed to create refund",
            data: error,
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}
