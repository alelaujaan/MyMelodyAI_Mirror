import * as THREE from "three";

import type { AvatarRig } from "./AvatarRig";
import { AvatarBehaviour } from "./AvatarBehaviour";

const deg = THREE.MathUtils.degToRad;
function getPosture(mode: "idle" | "listening" | "thinking" | "talking") {

    switch (mode) {

        case "listening":

            return {
                neckPitch: deg(-3),
                headPitch: deg(-2),
                breathe: 1.1,
            };

        case "thinking":

            return {
                neckPitch: deg(10),
                headPitch: deg(8),
                breathe: 0.6,
            };

        case "talking":

            return {
                neckPitch: deg(-6),
                headPitch: deg(-4),
                breathe: 1.0,
            };

        default:

            return {
                neckPitch: deg(-8),
                headPitch: deg(-5),
                breathe: 1.0,
            };

    }

}

export function idle(
    rig: AvatarRig,
    time: number,
    blend: number,
    behaviour: AvatarBehaviour,
    mode: "idle" | "listening" | "thinking" | "talking"
) {
    const posture = getPosture(mode);

    // -------------------------
    // Respiración
    // -------------------------

    const breathe =
        Math.sin(time * 1.5)
        * 0.015
        * behaviour.breathe
        * posture.breathe
        * blend;

    // -------------------------
    // Torso
    // -------------------------

    if (rig.spine) {

        rig.spine.position.y = THREE.MathUtils.lerp(
            rig.spine.position.y,
            breathe,
            0.08
        );

        rig.spine.rotation.z = THREE.MathUtils.lerp(
            rig.spine.rotation.z,
            deg(Math.sin(time * 0.45) * 1),
            0.08
        );

    }

    // -------------------------
    // Cuello
    // -------------------------

    if (rig.neck) {

        const targetPitch =
            deg(Math.sin(time * 0.5) * 2)
            + behaviour.lookPitch
            + posture.neckPitch;

        const targetYaw =
            behaviour.lookYaw;

        rig.neck.rotation.x = THREE.MathUtils.lerp(
            rig.neck.rotation.x,
            targetPitch,
            0.05
        );

        rig.neck.rotation.y = THREE.MathUtils.lerp(
            rig.neck.rotation.y,
            targetYaw,
            0.05
        );

    }

    // -------------------------
    // Cabeza
    // -------------------------

    if (rig.head) {

        let headPitch =
            deg(Math.sin(time * 0.7) * 1)
            + posture.headPitch;

        let headRoll =
            deg(Math.sin(time * 0.35) * 1);

        let headYaw = 0;

        if (mode === "talking") {

            headPitch += deg(Math.sin(time * 3.2) * 2);

            headYaw = deg(Math.sin(time * 2.1) * 3);

            headRoll += deg(Math.sin(time * 2.7) * 1);

        }

        rig.head.rotation.x = THREE.MathUtils.lerp(
            rig.head.rotation.x,
            headPitch,
            0.08
        );

        rig.head.rotation.y = THREE.MathUtils.lerp(
            rig.head.rotation.y,
            headYaw,
            0.08
        );

        rig.head.rotation.z = THREE.MathUtils.lerp(
            rig.head.rotation.z,
            headRoll,
            0.08
        );

    }

    // -------------------------
    // Orejas
    // -------------------------

    if (rig.earLeft) {

        rig.earLeft.rotation.z = THREE.MathUtils.lerp(
            rig.earLeft.rotation.z,
            deg(Math.sin(time * 2.2) * 4),
            0.08
        );

    }

    if (rig.earRight) {

        rig.earRight.rotation.z = THREE.MathUtils.lerp(
            rig.earRight.rotation.z,
            deg(-Math.sin(time * 2.2) * 4),
            0.08
        );

    }

    // -------------------------
    // Hombros
    // -------------------------

    if (rig.shoulderLeft) {

        rig.shoulderLeft.rotation.z = THREE.MathUtils.lerp(
            rig.shoulderLeft.rotation.z,
            deg(30),
            0.04
        );

    }

    if (rig.shoulderRight) {

        rig.shoulderRight.rotation.z = THREE.MathUtils.lerp(
            rig.shoulderRight.rotation.z,
            deg(-30),
            0.04
        );

    }

}