import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

import Avatar3D from "./Avatar3D";

export default function AvatarScene() {

    return (

        <Canvas
            camera={{
                position: [0, 1.5, 3],
                fov: 35,
            }}
        >

            <ambientLight intensity={1.5} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={2}
            />

            <Environment preset="city" />

            <Avatar3D />

        </Canvas>

    );

}