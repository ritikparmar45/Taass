"use client";

import { useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";

export const usePresence = () => {
    const updatePresence = useMutation(api.presence.update);

    useEffect(() => {
        updatePresence({ status: "online" });

        const interval = setInterval(() => {
            updatePresence({ status: "online" });
        }, 10000); // Heartbeat every 10s

        const handleHide = () => {
            if (document.visibilityState === "hidden") {
                updatePresence({ status: "offline" });
            } else {
                updatePresence({ status: "online" });
            }
        };

        window.addEventListener("beforeunload", () => {
            updatePresence({ status: "offline" });
        });

        document.addEventListener("visibilitychange", handleHide);

        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", handleHide);
        };
    }, [updatePresence]);
};
