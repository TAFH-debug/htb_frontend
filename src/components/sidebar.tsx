import { Button, Link } from "@nextui-org/react";
import { AiOutlineDashboard } from "react-icons/ai";

export function Sidebar({ children }: { children: React.ReactNode }) {
    return <div className='w-full flex'>
        <div className="w-1/6 h-full fixed">
            <Button className='w-full mx-1' as={Link} href="#" variant="light">
              <AiOutlineDashboard /><span>Dashboard</span>
            </Button>
        </div>
        <div className="w-4/5">
            {children}
        </div>
    </div>
}