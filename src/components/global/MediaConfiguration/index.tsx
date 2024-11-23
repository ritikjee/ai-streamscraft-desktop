import { useStudioSettings } from "@/hooks/useStudioSetting";
import { SourceDeviceStateProps } from "@/types/index.type";
import { Loader } from "../Loader";
import { Headphones, Monitor } from "lucide-react";

type Props = {
  state: SourceDeviceStateProps;
  user:
    | ({
        subscription: {
          plan: "PRO" | "FREE";
        } | null;
        studio: {
          id: string;
          screen: string | null;
          mic: string | null;
          preset: "HD" | "SD";
          camera: string | null;
          userId: string | null;
        } | null;
      } & {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        createdAt: Date;
        clerkid: string;
      })
    | null;
};

function MediaConfiguration({ state, user }: Props) {
  const activeScreen = state.displays?.find(
    (screen) => screen.id === user?.studio?.id
  );

  console.log("activeScreen", state, activeScreen);

  const activeAudio = state.audioInputs?.find(
    (device) => device.deviceId === user?.studio?.mic
  );

  const { isPending, onPresets, register } = useStudioSettings(
    user!.id,
    user?.studio?.screen || state.displays?.[0]?.id,
    user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
    user?.studio?.preset,
    user?.subscription?.plan
  );
  return (
    <form className="flex h-full relative w-full flex-col gap-y-5">
      {isPending && (
        <div className="fixed z-50 w-full top-0 left-0 right-0 bottom-0 rounded-2xl h-full bg-black/80 flex justify-center items-center">
          <Loader />
        </div>
      )}

      <div className="flex gap-x-5 justify-center items-center">
        <Monitor fill="#575655" color="575655" size={36} />
        <select
          {...register("screen")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full"
        >
          {state.displays?.map((screen) => (
            <option
              key={screen.id}
              value={screen.id}
              className="bg-[#171717] cursor-pointer"
              selected={activeScreen && activeScreen.id === screen.id}
            >
              {screen.id + " " + screen.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-x-5 justify-center items-center">
        <Headphones fill="#575655" color="575655" size={36} />
        <select
          {...register("screen")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full"
        >
          {state.audioInputs?.map((screen) => (
            <option
              key={screen.deviceId}
              value={screen.deviceId}
              className="bg-[#171717] cursor-pointer"
              selected={activeAudio && activeAudio.deviceId === screen.deviceId}
            >
              {screen.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-x-5 justify-center items-center">
        <Headphones fill="#575655" color="575655" size={36} />
        <select
          {...register("preset")}
          className="outline-none cursor-pointer px-5 py-2 rounded-xl border-2 text-white border-[#575655] bg-transparent w-full"
        >
          <option
            disabled={user?.subscription?.plan === "FREE"}
            selected={onPresets === "HD" || user?.studio?.preset === "HD"}
            value={"HD"}
            className="bg-[#171717] cursor-pointer"
          >
            1080{" "}
            {user?.subscription?.plan === "FREE" && "Upgrade to a PRO plan"}
          </option>
          <option
            selected={onPresets === "SD" || user?.studio?.preset === "SD"}
            value={"SD"}
            className="bg-[#171717] cursor-pointer"
          >
            720
          </option>
        </select>
      </div>
    </form>
  );
}

export default MediaConfiguration;
