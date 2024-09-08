'use client';
import axiosInstance from "@/axiosInstance";
import { Button, Card, CardHeader, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();

    const postLogin = async () => {
        try {
            const response = await axiosInstance.post('/auth/login', loginData);
            localStorage.setItem('token', response.data.access_token);
            router.push('/');
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <div className='min-h-screen flex items-center justify-center'>
        <Card className="rounded-lg px-8 py-5 gap-4 md:w-1/3">
            <CardHeader className="font-bold text-large">Sign In</CardHeader>
            <Input
                isRequired
                type="email"
                label="Email"
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                value={loginData.email}
                className="max-w-xs"
            />
            <Input
                isRequired
                type="password"
                label="Password"
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                value={loginData.password}
                className="max-w-xs"
            />

            <Button color="primary" onClick={postLogin}>Sign In</Button>
            <Link href="/signin" className="text-sm">Don&apos;t have an account?</Link>
        </Card>
    </div>
}