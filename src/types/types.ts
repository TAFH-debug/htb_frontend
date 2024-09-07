export type Book = {
    id: string;
    title: string;
    author: string;
    description: string;
    archive_url: string;
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
    books?: Book[];
    clubs?: Club[];
    bookshelfs?: Bookshelf[];
}

export type Post = {
    id: string;
    title: string;
    text: string;
    user?: User;
}