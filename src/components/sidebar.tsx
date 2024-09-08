import { Button, Link } from "@nextui-org/react";
import { AiOutlineBook, AiOutlineComment, AiOutlineDashboard, AiOutlineGroup } from "react-icons/ai";

export function Sidebar({ children }: { children: React.ReactNode }) {
    return <div className='w-full flex'>
        <div className="w-1/6 h-full">
            <Button className='w-full mx-1' as={Link} href="/dashboard" variant="light">
              <AiOutlineDashboard /><span>Dashboard</span>
            </Button>
            <Button className='w-full mx-1' as={Link} href="/bookshelfs" variant="light">
                <AiOutlineGroup /><span>Bookshelfs</span>
            </Button>
            <Button className='w-full mx-1' as={Link} href="/clubs" variant="light">
                <AiOutlineComment /><span>Clubs</span>
            </Button>
            <Button className='w-full mx-1' as={Link} href="/books" variant="light">
                <AiOutlineBook /><span>Books</span>
            </Button>
        </div>
        <div className="w-5/6">
            {children}
        </div>
    </div>
}