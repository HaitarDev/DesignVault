"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function HeroSection() {
  const [bgColor, setBgColor] = useState<String>("bg-sky-300");
  const navigate = useRouter();

  const isAuth = false;
  const href = !isAuth ? "/login" : "/discover";

  useEffect(() => {
    const colors = ["bg-sky-100", "bg-rose-100", "bg-emerald-100"];
    const intervalId = setInterval(() => {
      const random = Math.floor(Math.random() * colors.length);
      setBgColor(colors[random]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [setBgColor]);

  return (
    <div className="mx-auto flex flex-col gap-8 items-center justify-center mt-32">
      <Link
        className={`shadow-lg font-medium text-center rounded-full ${bgColor} transition-all duration-500 ease-in-out sm:p-3 p-2 border-br border`}
        href={href}
      >
        Over 3 million ready-to-work creatives!
      </Link>

      <h1 className="font-semibold sm:text-6xl  text-4xl text-center">
        The world’s destination <br /> for design
      </h1>
      <p className="text-pretty text-base px-2 text-center ms:text-lg ">
        Get inspired by the work of millions of top-rated designers & agencies
        around the world.
      </p>

      <Button
        onClick={() => {
          navigate.push("/discover");
        }}
        size={"lg"}
        className="rounded-full shadow-lg"
      >
        Get Started
      </Button>

      <h2 className="sm:text-4xl text-2xl font-medium mt-12">
        Explore inspiring designs
      </h2>
      {/* designs */}
    </div>
  );
}

export default HeroSection;
