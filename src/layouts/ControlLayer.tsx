import { cn, onCloseApp } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { Sparkle, X } from "lucide-react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function ControlLayer({ children, className }: Props) {
  const [isVisisble, setIsVisible] = useState(false);

  window.ipcRenderer.on("hide-plugin", (event, payload) => {
    console.log("hide-plugin", event);
    setIsVisible(payload.state);
  });
  return (
    <div
      className={cn(
        className,
        isVisisble && "invisible",
        "bg-[#171717] flex px-1 flex-col rounded-3xl overflow-hidden min-w-96"
      )}
    >
      <div className="flex justify-between items-center p-5 draggable">
        <span className="non-draggable">
          <UserButton />
        </span>
        <X
          size={20}
          className="text-gray-400 non-draggable hover:text-white cursor-pointer"
          onClick={onCloseApp}
        />
      </div>
      <div className="flex-1 h-0 overflow-auto">{children}</div>
      <div className="p-5 flex w-full">
        <div className="flex items-center gap-x-2">
          <Sparkle size={20} className="text-white" />
          <p className="text-white">AI StreamsCraft</p>
        </div>
      </div>
    </div>
  );
}

export default ControlLayer;
