import * as THREE from "three";

import type { AvatarRig } from "./AvatarRig";
import { AvatarBehaviour } from "./AvatarBehaviour";

const deg = THREE.MathUtils.degToRad;

export function idle(
    rig: AvatarRig,
    time: number,
    blend: number,
    behaviour: AvatarBehaviour
) {

    // -------------------------
    // Respiración
    // -------------------------

    const breathe =
        Math.sin(time * 1.5)
        * 0.015
        * behaviour.breathe
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
            + behaviour.lookPitch;

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

        rig.head.rotation.x = THREE.MathUtils.lerp(
            rig.head.rotation.x,
            deg(Math.sin(time * 0.7) * 1),
            0.05
        );

        rig.head.rotation.z = THREE.MathUtils.lerp(
            rig.head.rotation.z,
            deg(Math.sin(time * 0.35) * 1),
            0.05
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