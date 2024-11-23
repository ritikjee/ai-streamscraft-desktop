import httpClient from "@/lib/api";

export const getMediaSources = async () => {
  try {
    const displays = await window.ipcRenderer.invoke("getSources");
    console.log("displays", displays);

    const enumerateDevices =
      await window.navigator.mediaDevices.enumerateDevices();

    console.log("enumerateDevices", enumerateDevices);
    const audioIputs = enumerateDevices.filter(
      (device) => device.kind === "audioinput"
    );

    console.log("getting sources");

    return { displays, audio: audioIputs };
  } catch (error) {
    console.error(error);
    return { displays: [], audio: [] };
  }
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
