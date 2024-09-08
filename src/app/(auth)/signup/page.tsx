'use client';
import axiosInstance from "@/axiosInstance";
import { Button, Card, CardHeader, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        name: '',
        surname: ''
    });

    const router = useRouter();

    const postRegister = async () => {
        try {
            await axiosInstance.post('/auth/register', registerData);
            router.push('/signin');
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
        setRegisterData({
            email: '',
            password: '',
            name: '',
            surname: ''
        })
    }

    return <div className='min-h-screen flex items-center justify-center'>
        <Card className="rounded-lg px-8 py-5 gap-4">
            <CardHeader className="font-bold text-large">Sign Up</CardHeader>
            <div className="flex gap-2">
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    className="max-w-xs"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
                <Input
                    isRequired
                    type="password"
                    label="Password"
                    className="max-w-xs"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
            </div>
            <div className="flex gap-2">
                <Input
                    isRequired
                    type="name"
                    label="Name"
                    className="max-w-xs"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                />
                <Input
                    isRequired
                    type="surname"
                    label="Surname"
                    className="max-w-xs"
                    value={registerData.surname}
                    onChange={(e) => setRegisterData({ ...registerData, surname: e.target.value })}
                />
            </div>

            <Button color="primary" onClick={postRegister}>Sign Up</Button>
            <Link href="/signin" className="text-sm">Already have an account?</Link>
        </Card>
    </div>
}