import { Button, Link } from "@nextui-org/react";
import { AiOutlineBook, AiOutlineComment, AiOutlineDashboard } from "react-icons/ai";

export function Sidebar({ children }: { children: React.ReactNode }) {
    return <div className='w-full flex'>
        <div className="w-1/6 h-full">
            <Button className='w-full mx-1' as={Link} href="#" variant="light">
              <AiOutlineDashboard /><span>Dashboard</span>
            </Button>
            <Button className='w-full mx-1' as={Link} href="/bookshelfs" variant="light">
                <AiOutlineBook /><span>Bookshelfs</span>
            </Button>
            <Button className='w-full mx-1' as={Link} href="/clubs" variant="light">
                <AiOutlineComment /><span>Clubs</span>
            </Button>
        </div>
        <div className="w-5/6">
            {children}
        </div>
    </div>
}