'use client';
import axiosInstance from "@/axiosInstance";
import { Club, Post } from "@/types/types";
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function ClubPage() {
    const { id } = useParams();

    const [club, setClub] = useState<Club | null>(null);
    const [isPresident, setIsPresident] = useState(true);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [postData, setPostData] = useState({ title: '', text: '' });

    useEffect(() => {
        async function fetchClub() {
            const user = (await axiosInstance.get("/users/me")).data;
            const club = await axiosInstance.get(`/clubs/${id}`);
            setClub(club.data);
            setIsPresident(club.data.president?.id === user.id);
        }
        fetchClub();
    }, [id]);

    const postNewPost = async () => {
        try {
            // await axiosInstance.post(`/clubs/${id}/posts`, postData);
            // setPostData({ title: '', text: '' });
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <div className="w-full flex items-center flex-col">
        <div className="flex my-3 justify-between md:w-1/3">
            <h1 className="m-2 text-xl font-bold">Club posts</h1>
            {
                isPresident &&
                <Button color="primary" className="aspect-square" onClick={onOpen}><AiOutlinePlus /></Button>   
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
        <div className="flex flex-col justify-center md:w-1/3">
        {
            club?.clubPosts?.map(post => <PostCard key={post.id} {...post} />)
        }
        </div>
    </div>;
}

function PostCard(props: Post) {
    return <Card className="" isPressable>
        <CardHeader><h1 className="font-bold w-full text-center">{props.title}</h1></CardHeader>
        <CardBody>
            <p>{props.text}</p>
        </CardBody>
    </Card>
}