import { Post } from "@/types/types";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Link from "next/link";

export function PostCard(props: Post) {
    return <Link href={`/posts/${props.id}`}>
        <Card className="m-3" isPressable>
            <CardHeader><h1 className="font-bold text-2xl w-full text-center">{props.title}</h1></CardHeader>
            <CardBody>
                <p className="line-clamp-2">{props.text}</p>
            </CardBody>
            <CardFooter>
                <Button color="primary" as={Link} href={`/posts/${props.id}`}>Read more...</Button>
            </CardFooter>
        </Card>
    </Link>
}