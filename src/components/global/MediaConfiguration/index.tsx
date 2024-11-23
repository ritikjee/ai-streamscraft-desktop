import { useStudioSettings } from "@/hooks/useStudioSetting";
import { SourceDeviceStateProps } from "@/types/index.type";

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
    (screen) => screen.id === user?.studio?.screen
  );
  const activeAudio = state.audioInputs?.find(
    (device) => device.deviceId === user?.studio?.mic
  );
  const { isPending, onPreset, register } = useStudioSettings(
    user!.id,
    user?.studio?.screen || state.displays?.[0]?.id,
    user?.studio?.mic || state.audioInputs?.[0]?.deviceId,
    user?.studio?.preset,
    user?.subscription?.plan
  );
  return <div>MediaConfiguration</div>;
}

export default MediaConfiguration;
