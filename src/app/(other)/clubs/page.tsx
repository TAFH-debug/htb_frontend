"use client";
import axiosInstance from "@/axiosInstance";
import { Club } from "@/types/types";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react"
import { useEffect, useState } from "react";

export default function Page() {
    return <div className="w-full flex justify-center">
        <Clubs />
    </div>
}

function Clubs() {

    const [clubs, setClubs] = useState<Club[]>([]);

    useEffect(() => {
        async function fetchClubs() {
            const clubs = await axiosInstance.get("/clubs");
            setClubs(clubs.data);
        }
        fetchClubs();
    }, []);
    
    return <Card className="w-5/6 m-5">
        <h1 className="text-xl font-bold mx-5 mt-5">Clubs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {
                clubs.map(club => <ClubCard key={club.id} {...club} />)
            }
        </div>
    </Card>
}

function ClubCard({ name, president, description }: Club) {
    return <Card className="m-5" shadow="sm">
        <CardBody className="overflow-visible p-2 flex-col items-center">
            <b className="text-lg">{name}</b>
            <span>{president!.name} {president!.surname}</span>
            <p className="text-default-500 mx-3">{description}</p>
        </CardBody>
        <CardFooter className="text-small">
          <Button color="primary" className='w-full'>Join</Button>
        </CardFooter>
    </Card>
}