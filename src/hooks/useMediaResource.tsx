import { getMediaSources } from "@/services/media";
import {
  DisplayDeviceActionProps,
  SourceDeviceStateProps,
} from "@/types/index.type";
import { useReducer } from "react";

export const useMediaResource = () => {
  const [state, action] = useReducer(
    (state: SourceDeviceStateProps, action: DisplayDeviceActionProps) => {
      switch (action.type) {
        case "GET_DEVICES":
          return { ...state, ...action.payload };

        default:
          return state;
      }
    },
    {
      displays: [],
      audioInputs: [],
      error: null,
      isPending: false,
    }
  );

  const fetchMediaResource = () => {
    action({
      type: "GET_DEVICES",
      payload: {
        isPending: true,
      },
    });
    getMediaSources().then((sources) =>
      action({
        type: "GET_DEVICES",
        payload: {
          displays: sources.displays,
          audioInputs: sources.audio,
          isPending: false,
        },
      })
    );
  };

  return { state, fetchMediaResource };
};
