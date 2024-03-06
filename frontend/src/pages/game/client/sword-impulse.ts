import {
  GET_SWORD_IMPULSE_BACKWARD_MIRRORED_SPRITES,
  GET_SWORD_IMPULSE_BACKWARD_SPRITES,
  GET_SWORD_IMPULSE_FRONT_KICK_MIRRORED_SPRITES,
  GET_SWORD_IMPULSE_FRONT_KICK_SPRITES,
  GET_SWORD_IMPULSE_IDLE_MIRRORED_SPRITES,
  GET_SWORD_IMPULSE_IDLE_SPRITES,
  GET_SWORD_IMPULSE_JUMP_MIRRORED_SPRITES,
  GET_SWORD_IMPULSE_JUMP_SPRITES,
  GET_SWORD_IMPULSE_LOW_KICK_MIRRORED_SPRITES,
  GET_SWORD_IMPULSE_LOW_KICK_SPRITES,
  GET_SWORD_IMPULSE_WALKING_MIRRORED_SPRITES,
  GET_SWORD_IMPULSE_WALKING_SPRITES,
} from "./config";

export class SwordImpulse {
  x: number;
  y: number;
  states: Record<string, HTMLImageElement[]>;
  currentState: string;
  currentSpriteIndex: number;
  movementSpeed: number;
  isMovingRight: boolean;
  isMovingLeft: boolean;
  isLowKick: boolean;
  isFrontKick: boolean;
  isJumping: boolean;
  spriteChangeTimer: number;
  isGrounded: boolean;
  isMirrored: boolean;
  isAKeySwordImpulse: boolean;
  isSKeySwordImpulse: boolean;
  isDKeySwordImpulse: boolean;
  isSpaceKeySwordImpulse: boolean;
  hp: number;
  lowKickDamage: number;
  frontKickDamage: number;
  ctx: any;

  constructor(ctx: any) {
    this.x = 100;
    this.y = 300;
    this.states = {
      IDLE: GET_SWORD_IMPULSE_IDLE_SPRITES(),
      WALKING: GET_SWORD_IMPULSE_WALKING_SPRITES(),
      BACKWARD: GET_SWORD_IMPULSE_BACKWARD_SPRITES(),
      LOW_KICK: GET_SWORD_IMPULSE_LOW_KICK_SPRITES(),
      FRONT_KICK: GET_SWORD_IMPULSE_FRONT_KICK_SPRITES(),
      JUMP: GET_SWORD_IMPULSE_JUMP_SPRITES(),
    };
    this.currentState = "IDLE";
    this.currentSpriteIndex = 0;
    this.movementSpeed = 1;
    this.spriteChangeTimer = 0;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isLowKick = false;
    this.isFrontKick = false;
    this.isJumping = false;
    this.isGrounded = true;
    this.isMirrored = false;
    this.isAKeySwordImpulse = false;
    this.isSKeySwordImpulse = false;
    this.isDKeySwordImpulse = false;
    this.isSpaceKeySwordImpulse = false;
    this.ctx = ctx;
    this.hp = 100;
    this.lowKickDamage = 15;
    this.frontKickDamage = 10;
  }

  setState() {
    if (this.isJumping) {
      this.currentState = "JUMP";
    } else if (this.isFrontKick) {
      this.currentState = "FRONT_KICK";
      this.y = 305;
    } else if (this.isLowKick) {
      this.currentState = "LOW_KICK";
      this.y = 305;
    } else if (this.isMovingRight) {
      this.currentState = "WALKING";
      this.y = 310;
    } else if (this.isMovingLeft) {
      this.currentState = "BACKWARD";
      this.y = 310;
    } else {
      this.currentState = "IDLE";
      this.y = 300;
    }
  }

  updateSprite() {
    this.spriteChangeTimer++;
    if (this.spriteChangeTimer >= 5) {
      this.nextSprite();
      this.spriteChangeTimer = 0;
    }
  }

  nextSprite() {
    const currentSprites = this.states[this.currentState];
    this.currentSpriteIndex =
      (this.currentSpriteIndex + 1) % currentSprites.length;
  }

  updateJumping() {
    if (this.isJumping) {
      if (this.y > 200) {
        this.y -= 2;
      } else {
        this.isJumping = false;
      }
    } else {
      if (this.y < 300) {
        this.y += 2;
        if (this.y == 300) {
          this.currentState = "IDLE";
        }
      } else {
        this.isGrounded = true;
      }
    }
  }

  checkJump() {
    if (this.isSpaceKeySwordImpulse && this.isGrounded) {
      this.isJumping = true;
      this.isGrounded = false;
    } else {
      this.isJumping = false;
    }
  }

  checkLowKick() {
    if (this.isSKeySwordImpulse && this.isSpaceKeySwordImpulse) {
      this.isLowKick = true;
    } else {
      this.isLowKick = false;
    }
  }

  checkFrontKick() {
    if (this.isMirrored) {
      if (this.isAKeySwordImpulse && this.isSpaceKeySwordImpulse) {
        this.isFrontKick = true;
      } else {
        this.isFrontKick = false;
      }
    } else {
      if (this.isDKeySwordImpulse && this.isSpaceKeySwordImpulse) {
        this.isFrontKick = true;
      } else {
        this.isFrontKick = false;
      }
    }
  }

  checkMirrored(blastImpulseX: number) {
    if (this.x > blastImpulseX) {
      this.isMirrored = true;
      this.states.IDLE = GET_SWORD_IMPULSE_IDLE_MIRRORED_SPRITES();
      this.states.WALKING = GET_SWORD_IMPULSE_WALKING_MIRRORED_SPRITES();
      this.states.BACKWARD = GET_SWORD_IMPULSE_BACKWARD_MIRRORED_SPRITES();
      this.states.LOW_KICK = GET_SWORD_IMPULSE_LOW_KICK_MIRRORED_SPRITES();
      this.states.FRONT_KICK = GET_SWORD_IMPULSE_FRONT_KICK_MIRRORED_SPRITES();
      this.states.JUMP = GET_SWORD_IMPULSE_JUMP_MIRRORED_SPRITES();
    } else {
      this.isMirrored = false;
      this.states.IDLE = GET_SWORD_IMPULSE_IDLE_SPRITES();
      this.states.WALKING = GET_SWORD_IMPULSE_WALKING_SPRITES();
      this.states.BACKWARD = GET_SWORD_IMPULSE_BACKWARD_SPRITES();
      this.states.LOW_KICK = GET_SWORD_IMPULSE_LOW_KICK_SPRITES();
      this.states.FRONT_KICK = GET_SWORD_IMPULSE_FRONT_KICK_SPRITES();
      this.states.JUMP = GET_SWORD_IMPULSE_JUMP_SPRITES();
    }
  }

  getLeftX() {
    return this.x;
  }

  getRightX() {
    const currentSprites = this.states[this.currentState];
    const characterWidth = currentSprites[0].width * 3.5;
    return this.x + characterWidth;
  }

  getHeight() {
    const currentSprites = this.states[this.currentState];
    const characterHeight = currentSprites[0].height * 3.5;
    return characterHeight;
  }

  getWidth() {
    return this.getRightX() - this.getLeftX();
  }

  render() {
    const currentSprites = this.states[this.currentState];
    this.ctx.drawImage(
      currentSprites[this.currentSpriteIndex],
      this.x,
      this.y,
      currentSprites[0].width * 3.5,
      currentSprites[0].height * 3.5
    );
  }
}
