import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import '@/styles/styles.css';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
   
    if (storedToken) {
      // If the token is present, redirect to any page except for login and register
      if (router.pathname === '/login' 
      // || router.pathname === '/register'
      )
       {
        router.push('/');
      }
    } else {
      // If the token is not present, redirect to login or register
      if (router.pathname !== '/login' 
      // && router.pathname !== '/register'
      ) {
        router.push('/login');
      }
    }
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
