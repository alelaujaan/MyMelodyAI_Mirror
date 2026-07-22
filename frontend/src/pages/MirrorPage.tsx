import { useEffect } from "react";
import WeatherWidget from "../widgets/Weather/WeatherWidget";
import CalendarWidget from "../widgets/Calendar/CalendarWidget";
import ShoppingWidget from "../widgets/Shopping/ShoppingWidget";
import MirrorLayout from "../layouts/MirrorLayout";
import ClockWidget from "../widgets/Clock/ClockWidget";
//import AvatarWidget from "../widgets/Avatar/AvatarWidget";
import GreetingWidget from "../widgets/Greeting/GreetingWidget";
import { MirrorState } from "../store/mirrorTypes";
import { useMirrorStore } from "../store/mirrorStore";
import AvatarScene from "../components/avatar3d/AvatarScene";

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

    return (

        <MirrorLayout>

            <div className="relative w-full h-full">

                {/* Reloj */}
                <div className="absolute top-8 left-8">
                    <ClockWidget />
                </div>

                {/* Clima */}
                <div className="absolute top-8 right-8 w-72">
                    <WeatherWidget />
                </div>

                {/* Centro */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <div className="h-[600px] w-[500px]">
                        <AvatarScene />
                    </div>

                    <div className="mt-8">
                        <GreetingWidget />
                    </div>

                </div>

                {/* Inferior */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8">

                    <div className="w-80">
                        <CalendarWidget />
                    </div>

                    <div className="w-80">
                        <ShoppingWidget />
                    </div>

                </div>

            </div>

        </MirrorLayout>

    );
}