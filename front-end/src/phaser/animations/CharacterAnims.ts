const createLonkAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'idle_lonk',
        frames: anims.generateFrameNames('lonk', {
            prefix: 'elf_m_idle_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_lonk',
        frames: anims.generateFrameNames('lonk', {
            prefix: 'elf_m_run_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });
}

export { createLonkAnims };