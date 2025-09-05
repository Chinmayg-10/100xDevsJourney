import { LinkIcon } from "../icons/Link";
import { TitleIcon } from "../icons/Title";
import { CrossIcon } from "../icons/Cross";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { backendUrl } from "../config";
import axios from "axios";

interface Props {
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContentModel({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  async function addContent() {
    if (!title || !link) {
      setError("⚠️ Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token=localStorage.getItem("token");
      await axios.post(
        `${backendUrl}/api/v1/content`,
        { link, title, type },
        {
          headers: {
            Authorization:`Bearer ${token}`,
          },
        }
      );
      onClose();
      // ✅ reset fields
      setTitle("");
      setLink("");
      setType(ContentType.Youtube);

      // ✅ close modal after success
      onClose();
    } catch (err) {
      setError("❌ Failed to add content. Try again.");
      console.error("Error adding content:", err);
    } finally {
      setLoading(false);
      console.log("Content Added!")
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        className="bg-white relative p-10 rounded-xl text-slate-500 shadow-md w-[400px]"
        onSubmit={(e) => e.preventDefault()} // ✅ prevent page reload
      >
        {/* Close button */}
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
        <p className="text-sm text-blue-900 mb-6">
          Share a YouTube or Twitter link
        </p>

        {/* Title input */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <TitleIcon />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            required
            className="outline-none text-sm w-full"
          />
        </div>

        {/* Link input */}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-3">
          <LinkIcon />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="url"
            placeholder="Link"
            required
            className="outline-none text-sm w-full"
          />
        </div>

        {/* Type selection */}
        <div>
          <h1 className="text-lg mt-6 text-center">Type Selection</h1>
          <div className="flex gap-2 pt-2 p-6 justify-center">
            <Button
              text="Youtube"
              varient={type === ContentType.Youtube ? "primary" : "secondary"}
              size="md"
              onClick={() => setType(ContentType.Youtube)}
              type="button"
            />
            <Button
              text="Twitter"
              varient={type === ContentType.Twitter ? "primary" : "secondary"}
              size="md"
              onClick={() => setType(ContentType.Twitter)}
              type="button"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        {/* Submit button */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={addContent}
            disabled={loading}
            className={`${
              loading ? "bg-purple-300" : "bg-purple-500 hover:bg-purple-600"
            } text-white px-4 py-2 rounded-full transition flex items-center`}
          >
            {loading ? "Submitting..." : "Submit"}
            {!loading && <ArrowRightIcon size={18} className="pl-1" />}
          </button>
        </div>
      </form>
    </div>
  );
}



