import axios from "axios"
import { Refund } from "@/schema/refund.schema"
import { ApiResponse } from "@/schema/apiResponse.schema"

export const createRefund = async (data: Refund): Promise<ApiResponse> => {
    try {
        const response = await axios.post<ApiResponse>("/api/refund", data)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const apiError = error.response?.data as ApiResponse
            return apiError || { status: "error", message: "Unknown error" }
        }
        return { status: "error", message: "Unknown error" }
    }
}