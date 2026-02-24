"use client";

import { useConvexAuth, useMutation } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { usePresence } from "@/hooks/use-presence";

export const AuthSync = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const storeUser = useMutation(api.users.store);
    usePresence();

    useEffect(() => {
        if (isAuthenticated) {
            storeUser();
        }
    }, [isAuthenticated, storeUser]);

    return null;
};
