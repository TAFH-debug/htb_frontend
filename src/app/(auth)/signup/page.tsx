import { Button, Card, CardHeader, Input, Link } from "@nextui-org/react";

export default function Page() {
    return <div className='min-h-screen flex items-center justify-center'>
        <Card className="rounded-lg px-8 py-5 gap-4">
            <CardHeader className="font-bold text-large">Sign Up</CardHeader>
            <div className="flex gap-2">
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    defaultValue="junior@nextui.org"
                    className="max-w-xs"
                />
                <Input
                    isRequired
                    type="password"
                    label="Password"
                    className="max-w-xs"
                />
            </div>
            <div className="flex gap-2">
                <Input
                    isRequired
                    type="name"
                    label="Name"
                    className="max-w-xs"
                />
                <Input
                    isRequired
                    type="surname"
                    label="Surname"
                    className="max-w-xs"
                />
            </div>

            <Button color="primary">Sign Up</Button>
            <Link href="/signin" className="text-sm">Already have an account?</Link>
        </Card>
    </div>
}