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

const createDokAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'idle_dok',
        frames: anims.generateFrameNames('dok', {
            prefix: 'doc_idle_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_dok',
        frames: anims.generateFrameNames('dok', {
            prefix: 'doc_run_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });
}

const createLankAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'idle_lank',
        frames: anims.generateFrameNames('lank', {
            prefix: 'elf_f_idle_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_lank',
        frames: anims.generateFrameNames('lank', {
            prefix: 'elf_f_run_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });
}

const createEldelbarAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'idle_eldelbar',
        frames: anims.generateFrameNames('eldelbar', {
            prefix: 'dwarf_m_idle_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_eldelbar',
        frames: anims.generateFrameNames('eldelbar', {
            prefix: 'dwarf_m_run_anim_f',
            start: 0,
            end: 3,
            suffix: '.png'
        }),
        frameRate: 10,
        repeat: -1
    });
}

export { createLonkAnims, createDokAnims, createLankAnims, createEldelbarAnims };