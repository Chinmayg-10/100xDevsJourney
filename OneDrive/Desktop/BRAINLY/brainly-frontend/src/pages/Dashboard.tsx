import "../index.css"
import { Button } from "../component/Button";
import { useState } from "react";
import { CreateContentModel } from "../component/ContentAdd";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../component/Card";
import { Sidebar } from "../component/Sidebar";

function DashBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-xlo-300">
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
            onClick={() => {}}
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
      <div className="flex gap-4 pl-8 ml-72">
        <Card
          type="twitter"
          link="https://x.com/gharkekalesh/status/1926594848464810388/"
          title="First tweet"
        />
        <Card
          type="youtube"
          link="https://youtu.be/UCiB-iuWkEc?si=I94UR2JH8msGv84u"
          title="Will Dhoni leave CSK or not?"
        />
      </div>
      <Sidebar />
    </div>
  );
}

export default DashBoard;