import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import '@/styles/styles.css';
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend } from "react-dnd-multi-backend";
import { TouchTransition } from "react-dnd-multi-backend";


export default function App({ Component, pageProps }) {
  const router = useRouter();
  const HTML5toTouch = {
    backends: [
      {
        backend: HTML5Backend,
      },
      {
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  };
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');

    if (storedToken) {
      // If the token is present, redirect to any page except for login and register
      if (router.pathname === '/login'
        // || router.pathname === '/register'
      ) {
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
      <DndProvider backend={TouchBackend} options={HTML5toTouch}>

        <Component {...pageProps} />
      </DndProvider>

    </>
  );
}
