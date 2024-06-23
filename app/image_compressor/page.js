"use client";
import { ArrowLeft, FileImage, Home, RotateCcw, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ImageCompressor() {
  const [spinner, setSpinner] = useState(false);

  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("");
  const [preview, setPreview] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [response, setResponse] = useState({
    type: "",
    algorithm: "",
    url: "",
    size: {
      original: "",
      compressed: "",
    },
    time: "",
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !algorithm) {
      alert("Please select a file and an algorithm.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setSpinner(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/compress?algorithm=${algorithm}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setResponse(result.data);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      alert(`An error occurred: ${error.message}. Please tell the developer.`);
    }
  };

  return (
    <main className="box-border grid place-items-center w-screen h-screen">
      {spinner && (
        <div className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-md w-full h-full grid place-items-center z-10">
          <img src="/loading.svg" className="size-20" />
        </div>
      )}
      {showImage && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-md w-full h-full grid place-items-center z-10"
          onClick={() => setShowImage(false)}
        >
          <button
            className="text-bold hover:bg-blue-500 p-2 rounded-full hover:text-white absolute top-0 right-0 m-4"
            onClick={() => setShowImage(false)}
          >
            <X />
          </button>
          <div
            className="flex gap-4 flex-wrap justify-center items-center p-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 justify-center items-center">
              <p>{response.url ? "before:" : "preview:"}</p>
              <img
                src={preview}
                className="max-w-96"
                alt={response.url ? "image before" : "image preview"}
              />
            </div>
            {response.url && (
              <div className="flex flex-col gap-2 justify-center items-center">
                <p>after:</p>
                <img
                  src={response.url}
                  className="max-w-96"
                  alt="image after"
                />
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-8 justify-center items-center bg-glass shadow-2xl py-8 px-8 md:py-16 md:px-24 relative">
        <FileImage className="size-16" />
        <h1 className="text-3xl">Image Compressor</h1>

        {response.algorithm ? (
          <div className="flex flex-col gap-4 w-80 md:w-full md:min-w-96">
            <div className="flex flex-col w-full gap-2">
              <p className="font-bold">Selected file:</p>
              <p>{file?.name}</p>
              <p className="font-bold">Algorithm:</p>
              <p>{response.algorithm}</p>
              <p className="font-bold">Size: </p>
              <ol className="list-disc list-inside">
                <li>Original: {response.size.original} mb</li>
                <li>Compressed: {response.size.compressed} mb</li>
              </ol>

              <p className="font-bold">Time: </p>
              <p>{response.time} s</p>
            </div>

            <p className="w-full text-center mt-4">download:</p>
            <a
              href={response.url}
              download
              className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded-xl self-center cursor-pointer hover:scale-105 text-center"
            >
              Compressed
            </a>
            <button
              className="hover:underline"
              onClick={() => setShowImage(true)}
            >
              see the difference
            </button>

            <div className="w-full flex justify-center items-center p-2 gap-2">
              <Link
                href="/"
                className="text-bold hover:bg-blue-500 p-2 rounded-full hover:text-white"
              >
                <Home />
              </Link>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="text-bold hover:bg-blue-500 p-2 rounded-full hover:text-white"
              >
                <RotateCcw />
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/"
              className="text-bold hover:bg-blue-500 p-2 rounded-full hover:text-white absolute top-0 left-0 m-4"
            >
              <ArrowLeft />
            </Link>
            <form
              className="flex flex-col gap-4 text-center justify-center items-center w-80 min-w-80 md:w-full md:min-w-96"
              onSubmit={handleSubmit}
            >
              <input
                required
                type="file"
                className="border border-white rounded-2xl p-1 file:py-2 file:border-none file:px-4 file:rounded-xl"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}
              />

              <button
                type="button"
                className={`${
                  preview ? "visible" : "invisible"
                } hover:underline cursor-pointer`}
                onClick={() => {
                  setShowImage(true);
                }}
              >
                preview
              </button>

              <p>Select Algorithm:</p>
              <div className="flex w-fit">
                <label className="flex gap-2 justify-center items-center py-2 px-4">
                  <input
                    type="radio"
                    name="algorithm"
                    value="jpeg"
                    className="accent-blue-500"
                    onChange={handleAlgorithmChange}
                  />
                  jpeg
                </label>
                <label className="flex gap-2 justify-center items-center py-2 px-4">
                  <input
                    type="radio"
                    name="algorithm"
                    value="webp"
                    className="accent-blue-500"
                    onChange={handleAlgorithmChange}
                  />
                  webp
                </label>
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-xl hover:scale-105"
              >
                Compress Image
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
