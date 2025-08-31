
import type { ReactElement } from "react";

interface ItemContent{
    text:string,
    icon:ReactElement
}
export function SidebarItem(props:ItemContent){
    return(
        <div className="flex text-gray-800 py-4 cursor-pointer hover:bg-gray-200 max-w-48 rounded pl-4 transition-all duration-150">
            <div className="pr-2">
                {props.icon}
            </div>
            <div className="pl-2">
                {props.text}
            </div>
            
        </div>
    )
}