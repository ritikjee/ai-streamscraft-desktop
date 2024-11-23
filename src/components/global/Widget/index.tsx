import { ClerkLoading, SignedIn, useUser } from "@clerk/clerk-react";
import { Loader } from "../Loader";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/user";
import { useMediaResource } from "@/hooks/useMediaResource";
import MediaConfiguration from "../MediaConfiguration";

function Widget() {
  const { user } = useUser();
  const [profile, setProfile] = useState<{
    status: number;
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
  } | null>(null);

  const { state, fetchMediaResource } = useMediaResource();

  useEffect(() => {
    fetchMediaResource();
    if (user && user.id) {
      getUserProfile(user.id)
        .then((data) => {
          setProfile(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
  return (
    <div className="p-5">
      <ClerkLoading>
        <Loader />
      </ClerkLoading>
      <SignedIn>
        {profile ? (
          <MediaConfiguration state={state} user={profile.user} />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Loader color="#fff" />
          </div>
        )}
      </SignedIn>
    </div>
  );
}

export default Widget;
