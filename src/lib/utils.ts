import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onCloseApp = () => window.ipcRenderer.send("close-app");

export const hidePlugin = (state: boolean) =>
  window.ipcRenderer.send("hide-plugin", { state });
