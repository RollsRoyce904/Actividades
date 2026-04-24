import { useLocalObservable } from "mobx-react-lite"
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr"
import { useEffect, useRef } from "react";
import { runInAction } from "mobx";
import { ru } from "zod/v4/locales";

export const useComments = (actividadId?: string) => {
    const created = useRef(false);
    const commentStore = useLocalObservable(() => ({
        comments: [] as ChatComment[],
        hubConnection: null as HubConnection | null,

        createHubConnection(actividadId: string) {
            if (!actividadId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENT_URL}?actividadId=${actividadId}`,
                    { withCredentials: true }
                )
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnection.start().catch(error => console.log("Error establishing connection: ", error));

            this.hubConnection.on("LoadComments", (comments: ChatComment[]) => {
                runInAction(() => {
                    this.comments = comments;
                });
            });

            this.hubConnection.on("ReceiveComment", (comment: ChatComment) => {
                runInAction(() => {
                    this.comments.unshift(comment);
                });
            });
        },
        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection?.stop().catch(error => console.log("Error stopping connection: ", error));
            }
        }
    }));

    useEffect(() => {
        if (actividadId && !created.current) {
            commentStore.createHubConnection(actividadId);
            created.current = true;
        }
        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = [];
        };
    }, [actividadId, commentStore]);

    return { commentStore };
}