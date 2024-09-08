'use client';
import axiosInstance from "@/axiosInstance";
import { useUpload } from "@/hooks/hooks";
import { Button, Card, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { AiFillBook, AiFillPlusCircle } from "react-icons/ai";

export default function Page() {
    const [logined, setLogined] = useState(false);
    
    if (!logined) {
        return <AdminLogin setLogined={setLogined} />
    }

    return <div className="flex w-full min-h-screen items-center flex-col justify-center gap-3">
        <h1 className="text-3xl font-bold">Admin actions</h1>
        <AddBookAction />
    </div>
}

function AddBookAction() {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        description: "",
        archive_url: "",
        preview_url: "",
    }); 
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { uploadForm:uploadImage } = useUpload();
    const { uploadForm:uploadPDF } = useUpload();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePreview = async (e: any) => {
        const formData = new FormData();
        if (e.target.files !== null) formData.append("file", e.target.files[0]);

        uploadImage(formData).then((res) => {
            setBookData({
                ...bookData,
                preview_url: res.data.url,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBook = async (e: any) => {
        const formData = new FormData();
        if (e.target.files !== null) formData.append("file", e.target.files[0]);

        uploadPDF(formData).then((res) => {
            setBookData({
                ...bookData,
                archive_url: res.data.url,
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    const postNewBook = async () => {
        try {
            await axiosInstance.post('/books', bookData);
            setBookData({
                title: "",
                author: "",
                description: "",
                archive_url: "",
                preview_url: "",
            })
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <>
    <Card className="md:w-1/6 bg-primary text-background" isPressable isBlurred onPress={onOpen}>
        <CardHeader className="flex justify-between">
            <div className="flex gap-3 items-center">
                <AiFillBook />
                <p>Add new book</p>
            </div>
            <AiFillPlusCircle />
        </CardHeader>
    </Card>
    <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
    >
        <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add new book</ModalHeader>
            <ModalBody>
                <Input
                    isRequired
                    type="text"
                    label="Title"
                    variant="bordered"
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                    value={bookData.title}
                    className="max-w-xs"
                />
                <Input
                    isRequired
                    type="text"
                    label="Author"
                    variant="bordered"
                    onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
                    value={bookData.author}
                    className="max-w-xs"
                />
                <Textarea
                    isRequired
                    label="Description"
                    variant="bordered"
                    onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
                    value={bookData.description}
                    className="max-w-xs"
                />
                <Input 
                    labelPlacement="inside"
                    label="Preview image"
                    type="file"
                    variant="bordered"
                    color="primary"
                    onChange={handlePreview}
                />
                <Input 
                    labelPlacement="inside"
                    label="PDF File"
                    type="file"
                    variant="bordered"
                    color="primary"
                    onChange={handleBook}
                />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={() => {
                postNewBook();
                onClose();
              }}>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
        </ModalContent>
    </Modal>
    </>
}

function AdminLogin({ setLogined }: { setLogined: (logined: boolean) => void }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const postLogin = async () => {
        try {
            const response = await axiosInstance.post('/auth/admin_login', loginData);
            if (response.data.ok) {
                setLogined(true);
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred');
        }
    }

    return <div className='min-h-screen flex items-center justify-center'>
    <Card className="rounded-lg px-8 py-5 gap-4 md:w-1/3">
        <CardHeader className="font-bold text-large">Admin Panel</CardHeader>
        <Input
            isRequired
            type="email"
            label="Email"
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            value={loginData.email}
            className="max-w-xs"
        />
        <Input
            isRequired
            type="password"
            label="Password"
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            value={loginData.password}
            className="max-w-xs"
        />

        <Button color="primary" onClick={postLogin}>Login</Button>
    </Card>
</div>
}