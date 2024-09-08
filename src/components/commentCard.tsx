import { IoCaretForwardCircle } from "react-icons/io5";
import { Comment } from "../types/types";

export default function CommentCard(props: Comment) {
    return <div className="m-2">
        <h1 className="font-bold text-sm flex items-center">
            <IoCaretForwardCircle className="m-1" /><span>{props.user?.name} {props.user?.surname}</span>
        </h1>
        <p className="mx-6">{props.text}</p>
    </div>
}