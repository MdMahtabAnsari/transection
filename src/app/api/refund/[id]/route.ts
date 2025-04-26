import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/schema/apiResponse.schema";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    try {
        const refund = await prisma.refund.findUnique({
            where: { id },
        });
        if (!refund) {
            const errorResponse: ApiResponse = {
                status: "error",
                message: "Refund not found",
                data: null,
            };
            return NextResponse.json(errorResponse, { status: 404 });
        }
        const successResponse: ApiResponse = {
            status: "success",
            message: "Refund retrieved successfully",
            data: refund,
        };
        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        const errorResponse: ApiResponse = {
            status: "error",
            message: "Failed to retrieve refund",
            data: error,
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    try {
        const refund = await prisma.refund.update({
            where: { id },
            data: body,
        });
        const successResponse: ApiResponse = {
            status: "success",
            message: "Refund updated successfully",
            data: refund,
        };
        return NextResponse.json(successResponse, { status: 200 });
    } catch (error) {
        const errorResponse: ApiResponse = {
            status: "error",
            message: "Failed to update refund",
            data: error,
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}