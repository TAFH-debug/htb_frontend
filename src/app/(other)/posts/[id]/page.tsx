"use client";
import axiosInstance from "@/axiosInstance";
import CommentCard from "@/components/commentCard";
import { Post } from "@/types/types";
import { Button, Card, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

export default function Page() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [commentData, setCommentData] = useState({ text: '' });

    useEffect(() => {
        try {
            axiosInstance.get(`/club-posts/${id}`).then((res) => {
                setPost(res.data);
                console.log(res.data);
            });
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching the post data');
        }
    }, [id]);
    
    const postNewComment = async () => {
        try {
            await axiosInstance.patch(`/club-posts/${id}/add_comment`, commentData);
            setCommentData({ text: '' });
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert('An error occurred while posting the comment');
        }
    }

    const patchLike = async () => {
        try {
            await axiosInstance.patch(`/club-posts/${id}/like`);
        } catch (error) {
            console.error(error);
            alert('An error occurred while liking the post');
        }
    }

    return <div className="w-full flex flex-col items-center">
    <Card className="w-1/2 m-4 p-5">
        <div className="flex items-center w-full m-2 justify-between">
            <div className="">
                <h1 className="font-bold text-2xl">{post?.title}</h1>
                <h2 className="text-default-500">{post?.user?.name} {post?.user?.surname}</h2>
            </div>
            <Button color="primary" className="min-w-0" onClick={patchLike}>
                <AiOutlineLike />
            </Button>
        </div>
        <div className="m-2">
            <p>{post?.text}</p>
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
                        <ModalHeader className="flex flex-col gap-1">Add new comment</ModalHeader>
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
                    post?.comments?.map((comment, index) => {
                        return <CommentCard key={index} {...comment} />
                    })
                }
            </div>
        </div>
    </Card>
</div>
}