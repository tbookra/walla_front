"use client";
import { useState } from "react";
import UrlsForm from "@/components/forms/UrlsForm";
import GetShortUrlForm from "@/components/forms/GetShortUrlForm";
import GetFullUrlForm from "@/components/forms/GetFullUrlForm";


const BASE_URL = "http://localhost:4000";

export default function Home() {
  const [uniqueString, setUniqueString] = useState<string>("");
  const [existsShortString, setExistsShortString] = useState<string>("");
  const [fullUrl, setFullUrl] = useState<string>("");
  const [browseTxt, setBrowseTxt] = useState<string>("");
  const newUrl = uniqueString
    ? uniqueString.includes("something went wrong")
      ? uniqueString
      : `${BASE_URL}/${uniqueString}`
    : "";

    const handleBrowseClick = () => {

    }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1 className="text-xl">Wellcome to the short URL generator</h1>
        <div>
          <h2>get your <strong>new</strong> short url here:</h2>
          <UrlsForm setResults={setUniqueString} />
          {newUrl}
        </div>
        <div>
          <h2>get your short url here:</h2>
          <GetShortUrlForm setResults={setExistsShortString} />
          {existsShortString}
        </div>
        <div>
          <h2>get your full url here:</h2>
          <GetFullUrlForm setResults={setFullUrl} />
          
          {fullUrl}
            
          
        </div>
        <div>
        <input type="text" onChange={(e)=>setBrowseTxt(e.target.value) value={browseTxt}} />
        <button className="button" onClick={handleBrowseClick}>Browse</button>
        </div>
      </main>
    </div>
  );
}
