import "../index.css"
import { Button } from "../component/Button";
import { useEffect, useState } from "react";
import { CreateContentModel } from "../component/ContentAdd";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../component/Card";
import { Sidebar } from "../component/Sidebar";
import { useContent } from "../hooks/UseContent";
import axios from "axios";
import { backendUrl } from "../config";
function DashBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {contents,refresh}=useContent();
  useEffect(()=>{
    refresh();
  },[isModalOpen])
  return (
    <div className="bg-xlo-300 min-h-screen w-full">
      {isModalOpen && (
        <CreateContentModel onClose={() => setIsModalOpen(false)} />
      )}
      <div className="p-8 flex justify-between ml-72">
        <div className="text-3xl font-bold">All Notes</div>
        <div className="flex justify-end gap-4">
          <Button
            varient="secondary"
            text="Share Brain"
            size="md"
            startIcon={<ShareIcon />}
            onClick={async() => {
              const response=await axios.post(`${backendUrl}/api/v1/brain/share/`,{
                sharelink:true
              },{
                headers:{
                  "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
              })
              const url=`http://localhost:1573/share/${response.data.hash}`;
              alert(url);
            }}
          />
          <Button
            varient="primary"
            text="Add Content"
            size="md"
            startIcon={<PlusIcon />}
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>
      <div className="flex gap-4 pl-8 ml-72 flex-wrap">
  {contents.length === 0 ? (
    <div className="flex flex-col items-center justify-center w-full h-64 text-gray-500">
        <img src="/empty-state.svg" alt="Empty state" className="w-60 h-56 mb-4" />
      <p className="text-lg font-medium">No notes yet</p>
      <p className="text-sm text-gray-400">Click <span className="font-semibold">"Add Content"</span> to create your first note</p>
    </div>
  ) : (
    contents.map(({ type, link, title }) => (
      <Card key={link} type={type} link={link} title={title || "Untitled"} />
    ))
  )}
</div>

      <Sidebar />
    </div>
  );
}

export default DashBoard;