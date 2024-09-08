"use client";
import axiosInstance from "@/axiosInstance";
import { Club } from "@/types/types";
import { Button, Card, CardBody, CardFooter, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function Page() {
    return <div className="w-full flex justify-center">
        <Clubs />
    </div>
}

function Clubs() {

    const [clubs, setClubs] = useState<Club[]>([]);
    const [clubData, setClubData] = useState({
        name: '',
        description: ''
    });
    const {isOpen, onOpenChange, onOpen} = useDisclosure();
    
    useEffect(() => {
        async function fetchClubs() {
            const clubs = await axiosInstance.get("/clubs");
            setClubs(clubs.data);
        }
        fetchClubs();
    }, []);
    
    const postNewClub = async () => {
        try {
            await axiosInstance.post('/clubs', clubData);
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
        setClubData({
            name: '',
            description: ''
        })
    }
    
    return <Card className="w-5/6 m-5">
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mx-5 m-5">Clubs</h1>
            <Button className="min-w-0 m-5" color="primary" onClick={onOpen}>
                <AiOutlinePlus></AiOutlinePlus>
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
                    <Input
                        isRequired
                        type="text"
                        label="Name"
                        variant="bordered"
                        onChange={(e) => setClubData({ ...clubData, name: e.target.value })}
                        value={clubData.name}
                        className="max-w-xs"
                    />
                    <Textarea
                        isRequired
                        variant="bordered"
                        label="Text"
                        onChange={(e) => setClubData({ ...clubData, description: e.target.value })}
                        value={clubData.description}
                        className="max-w-xs"
                    />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={() => {
                        postNewClub();
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {
                clubs.map(club => <ClubCard key={club.id} {...club} />)
            }
        </div>
    </Card>
}

function ClubCard({ name, president, description, id }: Club) {
    return <Card className="m-5" shadow="sm">
        <CardBody className="overflow-visible p-2 flex-col items-center">
            <b className="text-lg mx-3">{name}</b>
            <span className="mx-3 text-sm text-default-500">{president!.name} {president!.surname}</span>
            <p className="mx-3 mt-2">{description}</p>
        </CardBody>
        <CardFooter className="text-small">
          <Button color="primary" className='w-full' as={Link} href={`/clubs/${id}`}>Join</Button>
        </CardFooter>
    </Card>
}