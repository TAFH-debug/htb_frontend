"use client";
import axiosInstance from "@/axiosInstance";
import { PostCard } from "@/components/postCard";
import { User } from "@/types/types";
import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, Textarea, ModalFooter, useDisclosure, Spinner, Card } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Page() {
    const { id } = useParams();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [postData, setPostData] = useState({ title: '', text: '' });
    const [user, setUser] = useState<User | null>(null);
    const [isThisUser, setIsThisUser] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            const user = (await axiosInstance.get(`/users/${id}`)).data;
            const myUser = (await axiosInstance.get(`/users/me`)).data;
            setIsThisUser(myUser.id === user.id);
            setUser(user);
        }
        fetchUser();
    }, [id]);
    
    const postNewPost = async () => {
        try {
            await axiosInstance.post(`/club-posts`, {
                ...postData,
            });
            setPostData({ title: '', text: '' });
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    if (!user) {
        return <div className="w-full flex items-center flex-col">
            <Spinner />
        </div>
    }

    return <div className="w-full flex flex-col items-center">
    <Card className="w-2/3 flex items-center flex-col p-4 m-2">
        <div className="flex justify-between w-full m-3 items-center">
            <div>
                <h1 className="font-bold text-2xl mx-2">{user?.name} {user?.surname}</h1>
                <p className="mx-2">Email: {user?.email}</p>
            </div>
            <div className="font-semibold text-xl text-primary m-2">
                {`Level ${Math.floor(user!.score / 100)}`}
            </div>
        </div>
        <div className="flex justify-between w-full m-3">
            <h1 className="m-2 text-xl font-bold">User posts</h1>
            {
                isThisUser &&
                <Button color="primary" className="min-w-0" onClick={onOpen}><AiOutlinePlus /></Button>   
            }
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange} 
            >
                <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Add new post</ModalHeader>
                    <ModalBody>
                    <Input
                        isRequired
                        type="text"
                        label="Title"
                        variant="bordered"
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        value={postData.title}
                        className="max-w-xs"
                    />
                    <Textarea
                        isRequired
                        label="Text"
                        onChange={(e) => setPostData({ ...postData, text: e.target.value })}
                        value={postData.text}
                        className="max-w-xs"
                    />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={() => {
                        postNewPost();
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
        <div className="flex flex-col justify-center">
        {
            user?.clubPosts?.map(post => <PostCard key={post.id} {...post} />)
        }
        </div>
    </Card>
    </div>
}