import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

function StudioTray() {
  const [preview, setPreview] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [sources, setSources] = useState<
    | {
        screen: string;
        id: string;
        audio: string;
        preset: "HD" | "SD";
        plan: "PRO" | "FREE";
      }
    | undefined
  >(undefined);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  return (
    <div className="flex flex-col justify-end gap-y-5 h-screen draggable">
      <video
        autoPlay
        ref={videoElementRef}
        className={cn("w-6/12 border-2 self-end", preview ? "hidden" : "")}
      />
      <div className="rounded-full flex justify-around items-center h-20 w-full border-2 bg-[#171717] border-white/40">
        <div
          {...(sources && {
            onClick: () => {
              setRecording(true);
            },
          })}
        ></div>
      </div>
    </div>
  );
}

export default StudioTray;
