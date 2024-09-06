"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react"

export default function Page() {
    return <div className="w-full flex justify-center">
        <Bookshelf />
    </div>
}

function Bookshelf() {
    return <Card className="w-5/6 m-5">
        <h1 className="text-xl font-bold mx-5 mt-5">Bookshelf</h1>
        <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            <Book 
            title="Sherlock Holmes" 
            img="https://google.com" 
            author="Arthur Konan Doyle"
            description="Very interesting book about adventures of famous detective"/>
        </div>
    </Card>
}

function Book({ title, img, author, description }: { title?: string, img?: string, author: string, description?: string }) {
    return <Card className="m-5" shadow="sm" isPressable onPress={() => console.log("item pressed")}>
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={title}
            className="w-full object-cover h-[140px]"
            src={img}
          />
        </CardBody>
        <CardFooter className="text-small flex-col">
          <b>{title}</b>
          <span>{author}</span>
          <p className="mt-2 text-default-500">{description}</p>
        </CardFooter>
    </Card>
}