import { LinkIcon } from "../icons/Link";
import { TitleIcon } from "../icons/Title";
import { CrossIcon } from "../icons/Cross";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { backendUrl } from "../config";
interface Props {
  onClose: () => void;
}
enum ContentType{
  Youtube="youtube",
  Twitter="twitter"
}

export function CreateContentModel({ onClose }: Props) {
  const[title,setTitle]=useState("");
  const[link,setLink]=useState("");
  const[type,setType]=useState(ContentType.Youtube);
  async function addContent(){
    await axios.post(`${backendUrl}/api/v1/content`,{
      link,title,type
    },{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })

  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form className="bg-white relative p-10 rounded-xl text-slate-500 shadow-md">
        <button
          type="button"
          className="absolute top-4 right-4 text-slate-500 hover:text-black"
          aria-label="Close"
          onClick={onClose}
        >
          <CrossIcon />
        </button>
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-2">
          Create Content
        </h1>
        <p className="text-sm text-blue-900 mb-9"></p>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <TitleIcon />
          <input
            onChange={(e)=>setTitle(e.target.value)}
            type="text"
            name="Title"
            id="Title"
            placeholder="Title"
            required
            className="outline-none text-sm w-full"
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <LinkIcon />
          <input
            onChange={(e)=>setLink(e.target.value)}
            type="url"
            name="url"
            id="url"
            placeholder="Link"
            required
            className="outline-none text-sm w-full"
          />
        </div>
        <div>
          <h1 className="text-lg mt-6 text-center">Type Selection</h1>
          <div className="flex gap-2 pt-2 p-8">
            <Button text="Youtube" varient={type===ContentType.Youtube?"primary":"secondary"} size="md" onClick={()=>{
              setType(ContentType.Youtube)
            }}></Button>
            <Button text="Twitter" varient={type===ContentType.Twitter?"primary":"secondary"} size="md" onClick={()=>{
              setType(ContentType.Twitter)
            }}></Button>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={addContent} className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition flex items-center">
            Submit
            <ArrowRightIcon size={18} className="pl-1" />
          </button>
        </div>
      </form>
    </div>
  );
}

