import { BrainIcon } from "../icons/Brain";
import { HashIcon } from "../icons/Hash";
import { LinkIcon } from "../icons/Link";
import { TextIcon } from "../icons/Text";
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/Youtube";
import { SidebarItem } from "./SidebarItem";
import { useNavigate } from "react-router-dom";


export function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="h-full bg-white w-72 fixed border-r left-0 top-0 pl-6 flex flex-col">
      <div className="flex text-2xl pt-4 font-bold items-center">
        <BrainIcon /> Brainly
      </div>

      <div className="pt-6 pl-4">
        <SidebarItem text="Tweets" icon={<TwitterIcon />} />
        <SidebarItem text="Videos" icon={<YoutubeIcon />} />
        <SidebarItem text="Documents" icon={<TextIcon />} />
        <SidebarItem text="Links" icon={<LinkIcon />} />
        <SidebarItem text="Tags" icon={<HashIcon />} />
      </div>
      <div className="mt-auto mb-6 pl-4">
        <SidebarItem
          text="Logout"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H3"
              />
            </svg>
          }
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}
