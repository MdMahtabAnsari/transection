import {
    Html,
    Head,
    Body,
    Container,
    Text,
    Heading,
    Hr,
    Section,
} from '@react-email/components';

interface ConfirmationEmailProps {
    id: string;
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    bankName: string;
    isUsingInternetBanking: boolean;
    dob: string; // formatted date string
    amount: number;
}

export const ConfirmationEmail = ({
    id,
    name,
    email,
    address,
    city,
    state,
    zip,
    phone,
    bankName,
    isUsingInternetBanking,
    dob,
    amount,
}: ConfirmationEmailProps) => {
    return (
        <Html lang="en">
            <Head />
            <Body className="bg-[#f2f4f6] text-[#333] font-sans p-6">
                <Container className="bg-white p-8 rounded-lg shadow-md max-w-[600px] mx-auto">
                    {/* Header */}
                    <Section className="mb-6 text-center">
                        {/* You can replace this with an actual logo image */}
                        <Heading className="text-2xl font-bold text-[#0f172a]">YourCompany</Heading>
                        <Text className="text-sm text-[#64748b]">Confirmation Receipt</Text>
                    </Section>

                    <Hr className="border-gray-300 my-4" />

                    {/* Main Heading */}
                    <Heading className="text-xl font-semibold text-[#1a202c] mb-4 text-center">
                        🎉 Thank you, {name}!
                    </Heading>
                    <Text className="text-center text-sm text-[#4b5563] mb-6">
                        We’ve received your submission. Below are your confirmation details.
                    </Text>

                    {/* Personal Information */}
                    <Section className="mb-6">
                        <Text className="font-semibold text-[#4a5568] mb-1">Personal Details</Text>
                        <Text><strong>ID:</strong> {id}</Text>
                        <Text><strong>Name:</strong> {name}</Text>
                        <Text><strong>Date of Birth:</strong> {dob}</Text>
                        <Text><strong>Email:</strong> {email}</Text>
                        <Text><strong>Phone:</strong> {phone}</Text>
                    </Section>

                    <Hr className="my-4 border-gray-300" />

                    {/* Address Information */}
                    <Section className="mb-6">
                        <Text className="font-semibold text-[#4a5568] mb-1">Address</Text>
                        <Text>{address}</Text>
                        <Text>{city}, {state} - {zip}</Text>
                    </Section>

                    <Hr className="my-4 border-gray-300" />

                    {/* Bank Information */}
                    <Section className="mb-6">
                        <Text className="font-semibold text-[#4a5568] mb-1">Banking Information</Text>
                        <Text><strong>Bank Name:</strong> {bankName}</Text>
                        <Text><strong>Internet Banking:</strong> {isUsingInternetBanking ? 'Yes' : 'No'}</Text>
                        <Text><strong>Amount:</strong> ₹{amount.toFixed(2)}</Text>
                    </Section>

                    <Hr className="my-6 border-gray-300" />

                    {/* Footer Message */}
                    <Text className="text-center text-sm text-[#718096]">
                        If you have any questions, feel free to reply to this email or contact our support.
                    </Text>
                    <Text className="text-center text-xs text-[#a0aec0] mt-6">
                        © {new Date().getFullYear()} YourCompany. All rights reserved.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default ConfirmationEmail;
