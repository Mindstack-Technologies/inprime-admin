import React, { useState, useEffect } from "react";
import FormBuilder from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import Demobar from "@/components/DemoBar";
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend } from "react-dnd-multi-backend";
import { TouchTransition } from "react-dnd-multi-backend";
import AdminLayout from "@/layouts/AdminLayout";

import Head from "next/head";

// Form Data
const url = "/api/formdata";
const saveUrl = "/api/formdata";
const postUrl = "/api/form";

const onPost = (data) => {
  console.log("onPost=", data);
};

export default function IncomeAssessmentTemplate() {
  return (
    <div>
      <Head>
        <title>Income Assessment Template</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>
      <AdminLayout>
        <DndProvider backend={TouchBackend}>
          <Demobar postUrl={postUrl} />

          <FormBuilder.ReactFormBuilder
            onPost={onPost}
            url={url}
            saveUrl={saveUrl}
          />
        </DndProvider>
      </AdminLayout>
    </div>
  );
}
