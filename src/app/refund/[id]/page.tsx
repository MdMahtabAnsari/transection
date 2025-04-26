"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { editSchema } from "@/schema/refund.schema";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getRefund,updateRefund } from "@/api/refund.api";
import { toast } from "sonner"
import paypal from "@/assets/paypal.png";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { LoaderCircle } from 'lucide-react';
import { useParams } from "next/navigation";
import { useEffect } from "react";



export default function Page() {
    const router = useRouter();
    const { id } = useParams();

    const form = useForm<z.infer<typeof editSchema>>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            name: "",
            email: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
            bankName: "",
            isUsingInternetBanking: false,
            dob: new Date(),
            amount: 0,
        },
    })

    useEffect(() => {
       if(id) {
            fetchRefund(id as string);
        }
    }, [id, form])

    const fetchRefund = async (id:string) => {
        try {
            const response = await getRefund(id);
            if (response.status === "success") {
                form.reset(response.data);
                toast.success("Refund data fetched successfully");
            } else {
                toast.error("Failed to fetch refund data");
                router.push("/refund");
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while fetching refund data");
            router.push("/refund");
        }
    }

    async function onSubmit(data: z.infer<typeof editSchema>) {
        console.log(data)
        try {
            const response = await updateRefund(id as string, data);
            if (response.status === "success") {
                toast.success("Refund updated successfully")
                router.push(`/confirmation/${response.data.id}`)
            } else {
                toast.error("Failed to update refund")
            }
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while updating refund")
        }
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-10 p-4">
            <CardHeader>
                <CardContent className="flex justify-center mb-4">
                    <img src={paypal.src} alt="PayPal" className="w-56 h-30" />
                </CardContent>
                <Separator />
                <CardTitle className="text-center font-bold text-2xl">Edit Refund Request </CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground">
                    Please fill out the form below to edit your refund request.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="New York" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder="NY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="zip"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="10001" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="(123) 456-7890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bank Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bank of America" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isUsingInternetBanking"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel>Are you using Internet Banking?</FormLabel>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Date of birth</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Your date of birth is used to calculate your age.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Refund Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0.00" {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full cursor-pointer" disabled={form.formState.isSubmitting || !form.formState.isValid}>{
                        form.formState.isSubmitting ? (
                            <LoaderCircle className="animate-spin" size={16} />
                        ) : (
                            "Submit Edit Request"
                        )
                        }</Button>
                </form>
            </Form>
        </Card>
    )

}