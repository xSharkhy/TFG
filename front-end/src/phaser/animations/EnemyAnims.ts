const createChortAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'idle_chort',
        frames: anims.generateFrameNames('chort', {
            prefix: 'chort_idle_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_chort',
        frames: anims.generateFrameNames('chort', {
            prefix: 'chort_run_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });
}

export { createChortAnims };