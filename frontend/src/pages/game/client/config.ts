const BACKGROUND_URL = "/src/game-assets/background/background.png";
const LIFEBAR_URL = "/src/game-assets/lifebar_full.png";
const WIN_LOGO_URL = "/src/game-assets/win.png";
const LOSE_LOGO_URL = "/src/game-assets/lose.png";
const DRAW_LOGO_URL = "/src/game-assets/draw.png";
const BACKGROUND_MUSIC_URL = "/src/game-assets/background music 1.mp3";
const SWORD_IMPULSE_IDLE_DIR = "/src/game-assets/sword_impulse/idle/";
const SWORD_IMPULSE_IDLE_MIRRORED_DIR =
  "/src/game-assets/sword_impulse/idle_mirrored/";
const SWORD_IMPULSE_WALKING_DIR = "/src/game-assets/sword_impulse/walking/";
const SWORD_IMPULSE_WALKING_MIRRORED_DIR =
  "/src/game-assets/sword_impulse/backward/";
const SWORD_IMPULSE_BACKWARD_DIR = "/src/game-assets/sword_impulse/walking/";
const SWORD_IMPULSE_BACKWARD_MIRRORED_DIR =
  "/src/game-assets/sword_impulse/backward/";
const SWORD_IMPULSE_LOW_KICK_DIR = "/src/game-assets/sword_impulse/low_kick/";
const SWORD_IMPULSE_LOW_KICK_MIRRORED_DIR =
  "/src/game-assets/sword_impulse/low_kick_mirrored/";
const SWORD_IMPULSE_FRONT_KICK_DIR =
  "/src/game-assets/sword_impulse/front_kick/";
const SWORD_IMPULSE_FRONT_KICK_MIRRORED_DIR =
  "/src/game-assets/sword_impulse/front_kick_mirrored/";
const SWORD_IMPULSE_JUMP_DIR = "/src/game-assets/sword_impulse/jump/";
const SWORD_IMPULSE_JUMP_MIRRORED_DIR =
  "/src/game-assets/sword_impulse/jump_mirrored/";
const BLAST_IMPULSE_IDLE_DIR = "/src/game-assets/blast_impulse/idle/";
const BLAST_IMPULSE_IDLE_MIRRORED_DIR =
  "/src/game-assets/blast_impulse/idle_mirrored/";
const BLAST_IMPULSE_WALKING_DIR =
  "/src/game-assets/blast_impulse/walking_mirrored/";
const BLAST_IMPULSE_WALKING_MIRRORED_DIR =
  "/src/game-assets/blast_impulse/walking/";
const BLAST_IMPULSE_BACKWARD_DIR =
  "/src/game-assets/blast_impulse/backward_mirrored/";
const BLAST_IMPULSE_BACKWARD_MIRRORED_DIR =
  "/src/game-assets/blast_impulse/backward/";
const BLAST_IMPULSE_LOW_KICK_DIR =
  "/src/game-assets/blast_impulse/low_kick_mirrored/";
const BLAST_IMPULSE_LOW_KICK_MIRRORED_DIR =
  "/src/game-assets/blast_impulse/low_kick/";
const BLAST_IMPULSE_FRONT_KICK_DIR =
  "/src/game-assets/blast_impulse/front_kick_mirrored/";
const BLAST_IMPULSE_FRONT_KICK_MIRRORED_DIR =
  "/src/game-assets/blast_impulse/front_kick/";
const BLAST_IMPULSE_JUMP_DIR = "/src/game-assets/blast_impulse/jump_mirrored/";
const BLAST_IMPULSE_JUMP_MIRRORED_DIR = "/src/game-assets/blast_impulse/jump/";

export function LOAD_IMAGE(IMAGE_URL: string) {
  const image = new Image();
  image.src = IMAGE_URL;
  return image;
}

export function LOAD_AUDIO(AUDIO_URL: string) {
  const audio = new Audio();
  audio.src = AUDIO_URL;
  return audio;
}

export function GET_BACKGROUND_IMAGE() {
  return LOAD_IMAGE(BACKGROUND_URL);
}

export function GET_LIFEBAR_IMAGE() {
  return LOAD_IMAGE(LIFEBAR_URL);
}

export function GET_WIN_LOGO_IMAGE() {
  return LOAD_IMAGE(WIN_LOGO_URL);
}

export function GET_LOSE_LOGO_IMAGE() {
  return LOAD_IMAGE(LOSE_LOGO_URL);
}

export function GET_DRAW_LOGO_IMAGE() {
  return LOAD_IMAGE(DRAW_LOGO_URL);
}

// AUDIO
export function GET_BACKGROUND_MUSIC() {
  return LOAD_AUDIO(BACKGROUND_MUSIC_URL);
}

// SWORD IMPULSE
export function GET_SWORD_IMPULSE_IDLE_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 6; i++) {
    const spriteUrl = SWORD_IMPULSE_IDLE_DIR + `idle_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_IDLE_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 6; i++) {
    const spriteUrl =
      SWORD_IMPULSE_IDLE_MIRRORED_DIR + `idle_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_WALKING_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 10; i++) {
    const spriteUrl = SWORD_IMPULSE_WALKING_DIR + `walking_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_WALKING_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 10; i++) {
    const spriteUrl = SWORD_IMPULSE_WALKING_MIRRORED_DIR + `backward_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_BACKWARD_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 10; i++) {
    const spriteUrl = SWORD_IMPULSE_BACKWARD_DIR + `walking_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_BACKWARD_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 10; i++) {
    const spriteUrl = SWORD_IMPULSE_BACKWARD_MIRRORED_DIR + `backward_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_LOW_KICK_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl = SWORD_IMPULSE_LOW_KICK_DIR + `low_kick_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_LOW_KICK_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl =
      SWORD_IMPULSE_LOW_KICK_MIRRORED_DIR + `low_kick_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_FRONT_KICK_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 4; i++) {
    const spriteUrl = SWORD_IMPULSE_FRONT_KICK_DIR + `front_kick_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_FRONT_KICK_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 4; i++) {
    const spriteUrl =
      SWORD_IMPULSE_FRONT_KICK_MIRRORED_DIR + `front_kick_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_JUMP_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 6; i++) {
    const spriteUrl = SWORD_IMPULSE_JUMP_DIR + `jump_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_SWORD_IMPULSE_JUMP_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 6; i++) {
    const spriteUrl =
      SWORD_IMPULSE_JUMP_MIRRORED_DIR + `jump_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

// BLAST IMPULSE
export function GET_BLAST_IMPULSE_IDLE_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 6; i++) {
    const spriteUrl = BLAST_IMPULSE_IDLE_DIR + `idle_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_IDLE_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 6; i++) {
    const spriteUrl =
      BLAST_IMPULSE_IDLE_MIRRORED_DIR + `idle_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_WALKING_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl = BLAST_IMPULSE_WALKING_DIR + `walking_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_WALKING_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl = BLAST_IMPULSE_WALKING_MIRRORED_DIR + `walking_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_BACKWARD_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl = BLAST_IMPULSE_BACKWARD_DIR + `backward_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_BACKWARD_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl = BLAST_IMPULSE_BACKWARD_MIRRORED_DIR + `backward_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_LOW_KICK_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 4; i++) {
    const spriteUrl = BLAST_IMPULSE_LOW_KICK_DIR + `low_kick_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_LOW_KICK_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 4; i++) {
    const spriteUrl = BLAST_IMPULSE_LOW_KICK_MIRRORED_DIR + `low_kick_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_FRONT_KICK_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl =
      BLAST_IMPULSE_FRONT_KICK_DIR + `front_kick_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_FRONT_KICK_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 3; i++) {
    const spriteUrl =
      BLAST_IMPULSE_FRONT_KICK_MIRRORED_DIR + `front_kick_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_JUMP_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 1; i++) {
    const spriteUrl = BLAST_IMPULSE_JUMP_DIR + `jump_${i}_mirrored.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}

export function GET_BLAST_IMPULSE_JUMP_MIRRORED_SPRITES() {
  let sprites = [];
  for (let i = 1; i <= 1; i++) {
    const spriteUrl = BLAST_IMPULSE_JUMP_MIRRORED_DIR + `jump_${i}.png`;
    const sprite = LOAD_IMAGE(spriteUrl);
    sprites.push(sprite);
  }
  return sprites;
}
