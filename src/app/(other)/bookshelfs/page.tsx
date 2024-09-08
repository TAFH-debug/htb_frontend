"use client";
import axiosInstance from "@/axiosInstance";
import BookCard from "@/components/bookCard";
import { Bookshelf } from "@/types/types";
import { Button, Card, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react";

export default function Page() {
    const [bookshelfs, setBookshelfs] = useState<Bookshelf[] | null>(null);
    const [bookshelfData, setBookshelfData] = useState({ name: '' });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        try {
            axiosInstance.get('/bookshelfs/my').then((res) => {
                setBookshelfs(res.data);
            });
        }
        catch (error) {
            console.error(error);
            alert('An error occurred while fetching the bookshelfs data');
        }
    }, []);

    const postBookshelf = async () => {
        try {
            await axiosInstance.post('/bookshelfs', bookshelfData);
            window.location.reload();
        }
        catch (error) {
            console.error(error);
            alert('An error occurred while creating the bookshelf');
        }
    }

    if (!bookshelfs) {
        return <div className="w-full flex items-center flex-col">
            <Spinner />
        </div>
    }

    return <div className="w-full flex justify-center flex-col items-center">
        {
            bookshelfs?.map((bookshelf) => <BookshelfCard key={bookshelf.id} {...bookshelf} />)
        }
        <Button className="w-1/3" color="primary" onClick={onOpen}>
            Create bookshelf
        </Button>
        <Modal 
            isOpen={isOpen} 
            onOpenChange={onOpenChange} 
        >
            <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add bookshelf</ModalHeader>
                <ModalBody>
                <Input
                    isRequired
                    type="text"
                    label="Name"
                    variant="bordered"
                    onChange={(e) => setBookshelfData({ name: e.target.value })}
                    value={bookshelfData.name}
                    className="max-w-xs"
                />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={() => {
                    postBookshelf();
                    onClose();
                  }}>
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
            </ModalContent>
        </Modal>
    </div>
}

function BookshelfCard(props: Bookshelf) {
    return <Card className="w-5/6 m-5">
        <h1 className="text-xl font-bold mx-5 mt-5">{props.name}</h1>
        <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {
                props.books?.map((book) => <BookCard key={book.id} {...book} />)
            }
        </div>
    </Card>
}
