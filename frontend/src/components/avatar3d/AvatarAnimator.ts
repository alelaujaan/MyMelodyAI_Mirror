import type { AvatarRig } from "./AvatarRig";
import { AvatarBehaviour } from "./AvatarBehaviour";
import { idle } from "./AvatarAnimations";

export class AvatarAnimator {

    private currentState = "idle";

    private blend = 1;

    private behaviour = new AvatarBehaviour();

    update(
        rig: AvatarRig,
        avatarState: string,
        delta: number,
        elapsed: number
    ) {

        // Actualizamos el comportamiento
        this.behaviour.update(delta, elapsed);

        // Cambio de estado
        if (avatarState !== this.currentState) {

            this.currentState = avatarState;
            this.blend = 0;

        }

        // Mezcla suave entre estados
        this.blend = Math.min(
            this.blend + delta * 2,
            1
        );

        switch (this.currentState) {

            case "idle":

                idle(
                    rig,
                    elapsed,
                    this.blend,
                    this.behaviour
                );

                break;

            case "listening":

                idle(
                    rig,
                    elapsed,
                    this.blend,
                    this.behaviour
                );

                break;

            case "thinking":

                idle(
                    rig,
                    elapsed,
                    this.blend,
                    this.behaviour
                );

                break;

            case "talking":

                idle(
                    rig,
                    elapsed,
                    this.blend,
                    this.behaviour
                );

                break;

            default:

                idle(
                    rig,
                    elapsed,
                    this.blend,
                    this.behaviour
                );

        }

    }

}