"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import Header from "./components/(home-ui)/Header";
import HomeComponent from "./components/(home-ui)/HomeComponent";
import AboutService from "./components/(home-ui)/AboutService";

export default function Home() {
  return (
    <>
      <Header />
      <HomeComponent />
      <AboutService/>
    </>
  );
}
