export type Book = {
    id: string;
    title: string;
    author: string;
    description: string;
    comments: Comment[];
    archive_url: string;
    likedUsersIDs?: string[];
    preview_url: string;
}

export type Club = {
    id: string;
    name: string;
    description: string;
    president?: User;
    clubPosts?: Post[];
}

export type Bookshelf = {
    id: string;
    name: string;
    books?: Book[];
}

export type User = {
    id: string;
    name: string;
    email: string;
    surname: string;
    about: string;
    score: number;
    books?: Book[];
    clubs?: Club[];
    bookshelfs?: Bookshelf[];
    favorites?: Book[];
    clubPosts?: Post[];
}

export type Post = {
    id: string;
    title: string;
    text: string;
    user?: User;
    likedIDs?: string[];
    comments?: Comment[];
}

export type Comment = {
    id: string;
    text: string;
    user?: User;
    book?: Book;
    clubPost?: Post;
}