import httpClient from "@/lib/api";

export const getMediaSources = async () => {
  const displays = await window.ipcRenderer.invoke("getSources");

  const enumerateDevices =
    await window.navigator.mediaDevices.enumerateDevices();

  const audioIputs = enumerateDevices.filter(
    (device) => device.kind === "audioinput"
  );

  console.log("getting sources");

  return { displays, audio: audioIputs };
};

export const updateStudioSettings = async (
  id: string,
  screen: string,
  audio: string,
  preset: "HD" | "SD"
) => {
  const response = await httpClient.post(
    `/studio/${id}`,
    {
      screen,
      audio,
      preset,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
