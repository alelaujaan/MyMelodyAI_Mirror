import { Bone, Group } from "three";

export type AvatarRig = {
    spine?: Bone;

    neck?: Bone;
    head?: Bone;

    earLeft?: Bone;
    earRight?: Bone;

    shoulderLeft?: Bone;
    elbowLeft?: Bone;

    shoulderRight?: Bone;
    elbowRight?: Bone;
};

export function buildAvatarRig(group: Group): AvatarRig {

    const rig: AvatarRig = {};

    group.traverse((object) => {

        if (!(object instanceof Bone))
            return;

        switch (object.name) {

            case "Bone":
                rig.spine = object;
                break;

            case "Bone003":
                rig.neck = object;
                break;

            case "Bone004":
                rig.head = object;
                break;

            case "Bone005":
                rig.earLeft = object;
                break;

            case "Bone006":
                rig.earRight = object;
                break;

            case "Bone002":
                rig.shoulderLeft = object;
                break;

            case "Bone007":
                rig.elbowLeft = object;
                break;

            case "Bone009":
                rig.shoulderRight = object;
                break;

            case "Bone010":
                rig.elbowRight = object;
                break;

        }

    });

    return rig;

}