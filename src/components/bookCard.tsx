import { Book } from "@/types/types";
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";

export default function BookCard({ id, title, preview_url, author, description }: Book) {
    return <Link href={`/books/${id}`}>
        <Card className="m-5 min-h-64" shadow="sm" isPressable isHoverable>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={title}
                className="w-full object-cover h-[140px]"
                src={preview_url}
              />
            </CardBody>
            <CardFooter className="text-small flex-col">
              <b>{title}</b>
              <span>{author}</span>
              <p className="mt-2 text-default-500 line-clamp-2">{description}</p>
            </CardFooter>
        </Card>
    </Link>
}