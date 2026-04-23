import { useLocalObservable } from "mobx-react-lite"
import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr"
import { useEffect } from "react";

export const useComments = (actividadId?: string) => {
    const commentStore = useLocalObservable(() => ({
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
        },
        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection?.stop().catch(error => console.log("Error stopping connection: ", error));
            }
        }
    }));

    useEffect(() => {
        if (actividadId) {
            commentStore.createHubConnection(actividadId);
        }
        return () => {
            commentStore.stopHubConnection();
        };
    }, [actividadId, commentStore]);

    return { commentStore };
}