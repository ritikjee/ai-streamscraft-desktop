import httpClient from "@/lib/api";

export const getUserProfile = async (userId: string) => {
  const { data } = await httpClient.get(`/auth/${userId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};
