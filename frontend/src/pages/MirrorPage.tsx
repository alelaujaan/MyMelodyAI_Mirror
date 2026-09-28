import { useEffect } from "react";

import WeatherWidget from "../widgets/Weather/WeatherWidget";
import CalendarWidget from "../widgets/Calendar/CalendarWidget";
import NewsWidget from "../widgets/News/NewsWidget";
import MirrorLayout from "../layouts/MirrorLayout";
import ClockWidget from "../widgets/Clock/ClockWidget";
import { MirrorState } from "../store/mirrorTypes";
import { useMirrorStore } from "../store/mirrorStore";
import AvatarWidget from "../components/avatar3d/AvatarWidget";

export default function MirrorPage() {
    const setMirrorState = useMirrorStore(
        (state) => state.setMirrorState
    );

    const setCurrentUser = useMirrorStore(
        (state) => state.setCurrentUser
    );

    useEffect(() => {
        setCurrentUser("Ana");

        const sequence = [
            MirrorState.BOOTING,
            MirrorState.WAITING_PRESENCE,
            MirrorState.USER_DETECTED,
            MirrorState.READY,
            MirrorState.LISTENING,
            MirrorState.THINKING,
            MirrorState.TALKING,
            MirrorState.READY,
        ];

        let index = 0;

        const timer = setInterval(() => {
            setMirrorState(sequence[index]);
            index = (index + 1) % sequence.length;
        }, 2500);

        return () => clearInterval(timer);
    }, [setMirrorState, setCurrentUser]);

    useEffect(() => {
        const websocket = new WebSocket(
            "ws://localhost:8000/ws/mirror"
        );

        websocket.onopen = () => {
            console.log("🟢 Mirror WebSocket connected");
        };

        websocket.onmessage = (event) => {
            console.log(
                "📨 Mirror WebSocket message:",
                event.data
            );

            try {
                const data = JSON.parse(event.data);

                if (data.type === "luna_response") {
                    useMirrorStore.setState({
                        speechBubble: data.message,
                        avatarState: "talking",
                        isThinking: false,
                    });
                }
            } catch (error) {
                console.error(
                    "🔴 Error parsing WebSocket message:",
                    error
                );
            }
        };

        websocket.onerror = (error) => {
            console.error(
                "🔴 Mirror WebSocket error:",
                error
            );
        };

        websocket.onclose = () => {
            console.log(
                "🟡 Mirror WebSocket disconnected"
            );
        };

        return () => {
            websocket.close();
        };
    }, []);

    return (
        <MirrorLayout>
            <div className="relative w-full h-full">
                <div className="absolute top-8 left-8">
                    <ClockWidget />
                </div>

                <div className="absolute top-8 right-8 w-72">
                    <WeatherWidget />
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="h-[600px] w-[500px]">
                        <AvatarWidget />
                    </div>
                </div>

                <div className="absolute bottom-10 left-10">
                    <div className="w-80">
                        <CalendarWidget />
                    </div>
                </div>

                <div className="absolute bottom-10 right-10">
                    <div className="w-[420px]">
                        <NewsWidget />
                    </div>
                </div>
            </div>
        </MirrorLayout>
    );
}