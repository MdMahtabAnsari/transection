import { resend } from "@/lib/resend";
import ConfirmationEmail from '../../emails/confirmation.email';

import { ApiResponse } from '@/schema/apiResponse.schema';
import { Refund } from "@/schema/refund.schema";
import { format } from "date-fns";

type RefundEmailProps = Refund & {
    id: string;
};

export const sendConfirmationEmail = async (refundData: RefundEmailProps): Promise<ApiResponse> => {

    const formattedData = {
        ...refundData,
        dob: format(refundData.dob, 'dd/MM/yyyy'),
    };
    const emailContent = ConfirmationEmail(formattedData);

    try {
        const response = await resend.emails.send({
            from: `${process.env.EMAIL_FROM}`,
            to: formattedData.email,
            subject: "Refund Confirmation",
            react: emailContent,
        });
        return {
            status: "success",
            message: "Email sent successfully",
            data: response,
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            status: "error",
            message: "Failed to send email",
            data: error,
        };
    }
}
