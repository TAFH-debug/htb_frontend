'use client';
import axiosInstance from "@/axiosInstance";
import { PostCard } from "@/components/postCard";
import { Club } from "@/types/types";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function ClubPage() {
    const { id } = useParams();

    const [club, setClub] = useState<Club | null>(null);
    const [isPresident, setIsPresident] = useState(false);
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
            await axiosInstance.post(`/club-posts`, {
                ...postData,
                clubID: id,
            });
            setPostData({ title: '', text: '' });
            window.location.reload();
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
        <div className="flex flex-col justify-center md:w-1/3">
        {
            club?.clubPosts?.map(post => <PostCard key={post.id} {...post} />)
        }
        </div>
    </div>;
}