'use client'
import { redirect } from "next/navigation";

export default function Home() {
  if (localStorage.getItem('token')) {
    redirect('/dashboard');
  }
  else {
    redirect('/signin');
  }
}
