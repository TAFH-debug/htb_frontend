"use client";
import axiosInstance from '@/axiosInstance';
import CommentCard from '@/components/commentCard';
import { Book, User } from '@/types/types';
import { Card, Image, Divider, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, useDisclosure, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, Spinner } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillFilePdf, AiOutlineLike } from 'react-icons/ai';
import { IoBookmarkOutline } from 'react-icons/io5';

export default function Page() {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [commentData, setCommentData] = useState({ text: '' });
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        try {
            axiosInstance.get('/users/me').then((res) => {
                setUser(res.data);
            });
            axiosInstance.get(`/books/${id}`).then((res) => {
                setBook(res.data);
            });
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching the book data');
        }
    }, [id]);

    const postNewComment = async () => {
        try {
            await axiosInstance.patch(`/books/${id}/add_comment`, commentData);
            setCommentData({ text: '' });
        } catch (error) {
            console.error(error);
            alert('An error occurred while posting the comment');
        }
    }

    const patchLike = async () => {
        try {
            await axiosInstance.patch(`/books/${id}/like`);
        } catch (error) {
            console.error(error);
            alert('An error occurred while liking the book');
        }
    }

    const patchBookshelf = async (bookshelfID: string) => {
        try {
            await axiosInstance.patch(`/bookshelfs/${bookshelfID}/add-book`, {
                bookID: id
            });
        } catch (error) {
            console.error(error);
            alert('An error occurred while liking the book');
        }
    }

    if (!book) {
        return <div className="w-full flex items-center flex-col">
            <Spinner />
        </div>
    }
    return <div className="w-full flex flex-col items-center">
        <Card className="w-2/3 m-4 p-5">
            <div className="flex items-center w-full m-2 justify-between">
                <div className="flex items-center">
                    <Image 
                        src={book?.preview_url}
                        alt="Book cover" 
                        width={100} 
                        className=""
                    />
                    <div className="m-5">
                        <h1 className="font-bold text-3xl">{book?.title}</h1>
                        <h2 className="text-default-500">{book?.author}</h2>
                        <h2 className="text-primary">{book.likedUsersIDs?.length} likes</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button color="primary" className="min-w-0" as={Link} href={book?.archive_url}>
                        <AiFillFilePdf />
                    </Button>
                    <Button color="primary" className="min-w-0" onClick={patchLike}>
                        <AiOutlineLike />
                    </Button>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button color="primary" className="min-w-0">
                            <IoBookmarkOutline />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        {
                            user?.bookshelfs?.map((bookshelf, index) => {
                                return <DropdownItem key={index} onClick={() => patchBookshelf(bookshelf.id)}>
                                    {bookshelf.name}
                                </DropdownItem>
                            }) || <></>
                        }
                      </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className="m-2">
                <h1 className="font-bold text-xl">Description</h1>
                <p>{book?.description}</p>
            </div>
            <Divider className="m-2"/>
            <div className="">
                <div className="w-full flex justify-between items-center">
                    <h1 className="font-bold text-xl m-2">Comments</h1>
                    <Button color="primary" onClick={onOpen}>
                        Add comment
                    </Button>
                    <Modal 
                        isOpen={isOpen} 
                        onOpenChange={onOpenChange} 
                    >
                        <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">Add new post</ModalHeader>
                            <ModalBody>
                            <Textarea
                                isRequired
                                label="Text"
                                onChange={(e) => setCommentData({ text: e.target.value })}
                                value={commentData.text}
                                className="max-w-xs"
                            />
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" variant="light" onPress={onClose}>
                                Close
                              </Button>
                              <Button color="primary" onPress={() => {
                                postNewComment();
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
                <div className="">
                    {
                        book?.comments.map((comment, index) => {
                            return <CommentCard key={index} {...comment} />
                        })
                    }
                </div>
            </div>
        </Card>
    </div>
}
