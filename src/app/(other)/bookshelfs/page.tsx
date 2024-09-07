"use client";
import BookCard from "@/components/bookCard";
import { Card } from "@nextui-org/react"

export default function Page() {
    return <div className="w-full flex justify-center">
        <Bookshelf />
    </div>
}

function Bookshelf() {
    return <Card className="w-5/6 m-5">
        <h1 className="text-xl font-bold mx-5 mt-5">Bookshelf</h1>
        <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            <BookCard
                title="Sherlock Holmes"
                author="Arthur Konan Doyle"
                description="Very interesting book about adventures of famous detective"
                id={"1"}
                archive_url={"#"} 
                preview_url={"#"}
                />
        </div>
    </Card>
}

