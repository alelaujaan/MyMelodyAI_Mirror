import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Avatar3D from "./Avatar3D";

export default function AvatarScene() {

    return (

        <Canvas
            camera={{
                position: [0, 0, 4],
                fov: 40,
            }}
        >

            <ambientLight intensity={2} />

            <directionalLight
                position={[2, 4, 2]}
                intensity={3}
            />

            <Avatar3D />


        </Canvas>

    );

}