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
import { Provider } from "react-redux";
import reduxStore from '../redux/store/store';

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
  // useEffect(() => {
  //   const storedToken = localStorage.getItem('access_token');

  //   if (storedToken) {
  //     // If the token is present, redirect to any page except for login and register
  //     if (router.pathname === '/login'
  //       // || router.pathname === '/register'
  //     ) {
  //       router.push('/');
  //     }
  //   } else {
  //     // If the token is not present, redirect to login or register
  //     if (router.pathname !== '/login'
  //       // && router.pathname !== '/register'
  //     ) {
  //       router.push('/login');
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      // Manually parse the token to extract the payload
      const base64Url = storedToken.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const payload = JSON.parse(window.atob(base64));
      const currentTime = Date.now() / 1000;
      // Check if the token is expired
      // console.log(payload.exp)
      // console.log(currentTime)
      // const expDate = new Date(payload.exp * 1000);
      // const currentDate = new Date(currentTime * 1000);
      // console.log(expDate.toLocaleString());
      // console.log(currentDate.toLocaleString());
      if (payload.exp < currentTime) {
        // If the token is expired, remove it from local storage
        localStorage.removeItem('access_token');
      } else {
        // If the token is not expired, continue with your existing logic
        // if (router.pathname === '/login') {
          if (router.pathname === '/login' ) {
          
          router.push('/occupations');
        }
      }
    } else {
      // if (router.pathname !== '/login') {
        if (router.pathname !== '/login' ) {
        router.push('/login');
      }
    }
  }, []);
  return (
    <>
    <Provider store={reduxStore}>
      <DndProvider backend={TouchBackend} options={HTML5toTouch}>

        <Component {...pageProps} />
      </DndProvider>
      </Provider>

    </>
  );
}

