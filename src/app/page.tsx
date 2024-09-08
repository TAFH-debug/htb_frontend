'use client'
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    if (window && localStorage.getItem('token')) {
      window.location.href = '/dashboard'
    }
    else {
      window.location.href = '/signin'
    }
  }, []);

  return <></>
}
