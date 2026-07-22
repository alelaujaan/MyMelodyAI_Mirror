export class AvatarBehaviour {

    public lookYaw = 0;

    public lookPitch = 0;

    private targetYaw = 0;

    private targetPitch = 0;

    private nextDecision = 0;

    private breatheMultiplier = 1;

    private targetBreatheMultiplier = 1;

    update(delta: number, elapsed: number) {

        if (elapsed >= this.nextDecision) {

            this.nextDecision =
                elapsed + 2 + Math.random() * 3;

            this.targetYaw =
                (Math.random() - 0.5) * 0.35;

            this.targetPitch =
                (Math.random() - 0.5) * 0.18;

            this.targetBreatheMultiplier =
                0.9 + Math.random() * 0.3;

        }

        this.lookYaw +=
            (this.targetYaw - this.lookYaw)
            * delta * 2;

        this.lookPitch +=
            (this.targetPitch - this.lookPitch)
            * delta * 2;

        this.breatheMultiplier +=
            (
                this.targetBreatheMultiplier
                - this.breatheMultiplier
            )
            * delta;

    }

    get breathe() {

        return this.breatheMultiplier;

    }

}