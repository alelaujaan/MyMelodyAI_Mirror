import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

import { useMirrorStore } from "../../store/mirrorStore";

import { buildAvatarRig } from "./AvatarRig";
import { AvatarAnimator } from "./AvatarAnimator";

export default function Avatar3D() {

    const { scene } = useGLTF("/models/luna.glb");

    const avatarState = useMirrorStore(
        (state) => state.avatarState
    );

    const rig = useMemo(
        () => buildAvatarRig(scene),
        [scene]
    );

    const animator = useMemo(
        () => new AvatarAnimator(),
        []
    );

    useFrame((state, delta) => {

        animator.update(
            rig,
            avatarState,
            delta,
            state.clock.elapsedTime
        );

    });

    return (
        <primitive
            object={scene}
            scale={2.2}
            position={[0, -1.2, 0]}
        />
    );

}

useGLTF.preload("/models/luna.glb");