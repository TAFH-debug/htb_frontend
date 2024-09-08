"use client";
import axiosInstance from "@/axiosInstance";
import BookCard from "@/components/bookCard";
import { Book } from "@/types/types";
import { useEffect, useState } from "react";

export default function Page() {
    const [books, setBooks] = useState<Book[]>([]);
    [
        {
            title: "Sherlock Holmes",
            author: "Arthur Konan Doyle",
            description: "Very interesting book about adventures of famous detective",
            id: "1",
            archive_url: "#",
            preview_url: "#",
        },
        {
            title: "Harry Potter",
            author: "J.K. Rowling",
            description: "A book about a young wizard",
            id: "2",
            archive_url: "#",
            preview_url: "#",
        },
        {
            title: "Harry Potter",
            author: "J.K. Rowling",
            description: "A book about a young wizard",
            id: "2",
            archive_url: "#",
            preview_url: "#",
        },
        {
            title: "Harry Potter",
            author: "J.K. Rowling",
            description: "A book about a young wizard",
            id: "2",
            archive_url: "#",
            preview_url: "#",
        },
        {
            title: "Harry Potter",
            author: "J.K. Rowling",
            description: "A book about a young wizard",
            id: "2",
            archive_url: "#",
            preview_url: "#",
        },
    ]

    useEffect(() => {
        try {
            axiosInstance.get('/books').then((res) => {
                setBooks(res.data);
            });
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }, []);
    
    return <div className="w-full grid grid-cols-1 md:grid-cols-4">
        {
            books.map(book => <BookCard {...book} key={book.id} />)
        }
    </div>
}
