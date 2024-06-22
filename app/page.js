import { FileAudio, FileImage, FileText, FileVideo, Video } from "lucide-react";
import { Supermercado_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const supermercado = Supermercado_One({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="box-border grid place-items-center w-screen h-screen">
      <div className="flex flex-col gap-8 justify-center items-center bg-glass shadow-2xl py-8 px-8 md:py-16 md:px-24">
        <h1 className={`${supermercado.className} text-6xl`}>Compressio</h1>
        <h2 className="text-center md:text-xl">
          Select the type of file you want to compress
        </h2>
        <div className="flex flex-wrap gap-12 w-80 md:w-full justify-center items-center">
          <Link
            href="/text_compressor"
            className="group flex flex-col gap-2 items-center justify-center cursor-pointer transition-all ease-in-out hover:text-blue-500 hover:scale-110 hover:animate-pulse"
          >
            <FileText className="size-16" />
            <p className="hidden md:block md:invisible group-hover:visible font-bold">
              Text
            </p>
          </Link>

          <Link
            href="#"
            className="group flex flex-col gap-2 items-center justify-center cursor-pointer transition-all ease-in-out hover:text-yellow-500 hover:scale-110 hover:animate-pulse"
          >
            <FileImage className="size-16" />
            <p className="hidden md:block md:invisible group-hover:visible font-bold">
              Image
            </p>
          </Link>

          <Link
            href="#"
            className="group flex flex-col gap-2 items-center justify-center cursor-pointer transition-all ease-in-out  hover:text-green-500 hover:scale-110 hover:animate-pulse"
          >
            <FileAudio className="size-16" />
            <p className="hidden md:block md:invisible group-hover:visible font-bold">
              Audio
            </p>
          </Link>

          <Link
            href="#"
            className="group flex flex-col gap-2 items-center justify-center cursor-pointer transition-all ease-in-out  hover:hover:text-red-500 hover:scale-110 hover:animate-pulse"
          >
            <FileVideo className="size-16" />
            <p className="hidden md:block md:invisible group-hover:visible font-bold">
              Video
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}
