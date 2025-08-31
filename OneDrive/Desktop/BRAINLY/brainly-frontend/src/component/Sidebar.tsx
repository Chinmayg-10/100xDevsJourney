import { BrainIcon } from "../icons/Brain";
import { HashIcon } from "../icons/Hash";
import { LinkIcon } from "../icons/Link";
import { TextIcon } from "../icons/Text";
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/Youtube";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    return(
        <div className="h-full bg-white w-72 fixed border-r left-0 top-0 pl-6">
            <div className="flex text-2xl pt-4 font-bold items-center">
               <BrainIcon/> Brainly
            </div>
            <div className="pt-6 pl-4">
                <SidebarItem text="Tweets" icon={<TwitterIcon/>}/>
                <SidebarItem text="Videos" icon={<YoutubeIcon/>}/>
                <SidebarItem text="Documents" icon={<TextIcon/>}/>
                <SidebarItem text="Links" icon={<LinkIcon/>}/>
                <SidebarItem text="Tags" icon={<HashIcon/>}/>
            </div>
            
        </div>
    )
}
