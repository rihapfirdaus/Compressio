import { Home } from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <main className="box-border grid place-items-center w-screen h-screen">
      <div className="flex flex-col gap-4 justify-center items-center bg-glass shadow-2xl py-8 px-4 md:py-16 md:px-24">
        <Link
          href="/"
          className="text-bold hover:bg-blue-500 p-2 rounded-full hover:text-white"
        >
          <Home />
        </Link>
        <h1 className="text-2xl underline">Our Team</h1>
        <p>Muhammad Raihan Firdaus - 1217050101</p>
        <p>Muhammad Rihap Firdaus - 1217050102</p>
        <p>Muhammad Syamil Hamami - 1217050103</p>
        <p>Pancadrya Yashoda Pasha - 1217050114</p>
        <h2 className="text-xl underline mt-8">Attribution</h2>{" "}
        <p>
          Loading assets by{" "}
          <a
            href="https://loading.io/"
            target="_blank"
            className="underline text-blue-500"
          >
            Loading.io
          </a>
        </p>
      </div>
    </main>
  );
}
