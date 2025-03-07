import NextAuth from "next-auth";

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      username?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      bio?: string | null;
      profilePicture?: string | null;
      contact?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    bio?: string;
    profilePicture?: string;
    contact?: string;
  }

  interface JWT {
    id: string;
    role: string;
  }
}


 
interface Categories {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  postId: number;
  userId: number;
  like: number;
  user: {
    username: string;
  };
}


interface PostListProps {
  categoryParams: string;
  searchParams: string;
  sortParams: string;
}

type Post ={
  id: number;
  title: string;
  content: string;
  image: string;
  userId: number;
  categoryId: number;
  like: number;
  status: string;
  user: {
    username: string;
  };
}

declare module "@prisma/client" {
  
}

// Define other interfaces


