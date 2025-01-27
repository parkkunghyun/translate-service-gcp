"use client";

import Image from "next/image";
import Header from "./components/Header";
import HomeComponent from "./components/HomeComponent";
import AboutService from "./components/AboutService";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <HomeComponent />
      <AboutService/>
    </>
  );
}
