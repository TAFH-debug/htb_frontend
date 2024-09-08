"use client";
import axiosInstance from "@/axiosInstance";
import BookCard from "@/components/bookCard";
import { Book, User } from "@/types/types";
import { Card, CardFooter, Chip, CircularProgress, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [topBooks, setTopBooks] = useState<Book[]>([]);

    useEffect(() => {
        try {
            axiosInstance.get("/users/me-full").then((res) => {
                setUser(res.data);
            });

            axiosInstance.get("/books/top").then((res) => {
                setTopBooks(res.data);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    if (!user) {
        return <div className="w-full flex justify-center">
            <Spinner />
        </div>
    }

    return <div className="w-full">
        <div className="flex w-full">
            <Card className="w-3/4 m-2">
                <h1 className="font-bold text-xl mx-5 mt-5">Top 3 books</h1>
                <div className='horizontal-scroll grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                    {
                        topBooks.map((book) => <BookCard key={book.id} {...book} />)
                    }
                </div>
            </Card>
            <Card className="w-1/4 m-2 bg-gradient-to-br from-primary to-primary-500 text-background">
                <h1 className="font-bold text-xl mx-5 mt-5">Progress</h1>
                <div className="flex items-center justify-center m-3">
                    <CircularProgress
                        classNames={{
                            svg: "w-48 h-48 drop-shadow-md",
                            indicator: "stroke-background",
                            track: "stroke-white/20",
                            value: "text-3xl font-semibold text-white",
                        }}
                        value={user?.score}
                        strokeWidth={4}
                        showValueLabel={true}
                    />
                </div>
                <CardFooter className="justify-center items-center pt-0">
                    <Chip
                      classNames={{
                        base: "border-1 border-background",
                        content: "text-background text-xl font-semibold",
                      }}
                      variant="bordered"
                    >
                      {`Level ${Math.floor(user!.score / 100)}`}
                    </Chip>
                </CardFooter>
            </Card>
        </div>
        <div className="flex">
            <Card className="w-3/4 m-2">
                <h1 className="font-bold text-xl mx-5 mt-5">Favorite books</h1>
                <div className='horizontal-scroll grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                    {
                        user.favorites?.length === 0 ? <div className="text-default-500 w-full justify-center min-h-64 flex items-center">
                            <h1 className="text-center text-lg">No favorite books</h1>
                        </div> :
                        user?.favorites?.map((book) => <BookCard key={book.id} {...book} />)
                    }
                </div>
            </Card>
        </div>
    </div>
}