import { ShareIcon } from "../icons/ShareIcon";
import { BinIcon } from "../icons/Bin";
import { YoutubeIcon } from "../icons/Youtube";
import { TwitterIcon } from "../icons/Twitter";
import { TextIcon } from "../icons/Text";
interface Cardprops {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "text";
}
function getYouTubeVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
export function Card(props: Cardprops) {
  return (
    <>
      <div className="bg-white rounded-md max-w-72 border border-gray-200 p-4 shadow-sm min-h-48">
        <div className="flex justify-between">
          <div className="flex items-center text-md font-medium">
            <div className="text-gray-500 pr-2">
              {props.type==="youtube" && <YoutubeIcon/>}
              {props.type==="twitter" && <TwitterIcon/>}
              {props.type==="text" && <TextIcon/>}
            </div>
            {props.title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-400">
              <a href={props.link} target="_blank"></a>
              <ShareIcon />
            </div>
            <div className="text-gray-400">
              <BinIcon />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {props.type === "youtube" && (
            <iframe
              className="w-full rounded-md"
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                props.link
              )}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {props.type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
      </div>
    </>
  );
}
