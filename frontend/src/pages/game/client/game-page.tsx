import styled from "@emotion/styled";
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Background } from "./background";
import { SwordImpulse } from "./sword-impulse";
import { BlastImpulse } from "./blast-impulse";
import { Lifebar } from "./lifebar";
import { Health } from "./health";
import { WinLogo } from "./win-logo";
import { LoseLogo } from "./lose-logo";
import { DrawLogo } from "./draw-logo";
import { Timer } from "./timer";
import { useNavigate } from "react-router-dom";
import { GET_BACKGROUND_MUSIC } from "./config";
import { updatePoint } from "../../../api/api-point";
import useUser from "../../../contexts/user-context";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #309cd4;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: #309cd4;
  min-height: 50rem;
`;

const GameCanvas = styled.canvas`
  margin: 3rem;
`;

const PlayButton = styled.button`
  border-radius: 0.5rem;
  font-weight: 600;
  background-color: #ff5c1c;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  padding: 0.8rem;
  width: 8rem;

  &:hover {
    background-color: #e0440c;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #309cd4;
  padding: 2rem;
  margin-top: 3rem;
`;

const GamePage = () => {
  let swordImpulse: SwordImpulse | null = null;
  let blastImpulse: BlastImpulse | null = null;
  let swordImpulseHealth: Health | null = null;
  let blastImpulseHealth: Health | null = null;
  let timer: Timer | null = null;
  let gameOver = false;
  let gameCondition = "";

  const socket = io("http://localhost:5174");
  const { user } = useUser();
  const navigate = useNavigate();
  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const [playerNumber, setPlayerNumber] = useState<number | null>(null);
  const [playerNumberAssigned, setPlayerNumberAssigned] =
    useState<boolean>(false);
  const [gameInitialized, setGameInitialized] = useState(false);

  function sendMessage(name: any, object: any) {
    socket.emit("send_message", {
      name: name,
      object: object,
    });
  }

  function sendClientInformation() {
    if (!playerNumberAssigned) {
      socket.emit("client_connected", {});
    }
  }

  const startGame = (gameCanvas: HTMLCanvasElement) => {
    const ctx = gameCanvas.getContext("2d");

    const FRAME_RATE = 60;
    const FRAME_INTERVAL = 1000 / FRAME_RATE;

    let backgroundMusic: HTMLAudioElement | null = null;

    function handleKeyDownSwordImpulse(event: KeyboardEvent) {
      if (!swordImpulse) return;
      if (swordImpulse.isJumping || swordImpulse.isLowKick) return;

      if (event.code === "KeyA") {
        swordImpulse.isAKeySwordImpulse = true;
        swordImpulse.isMovingLeft = true;
      } else if (event.code === "KeyD") {
        swordImpulse.isDKeySwordImpulse = true;
        swordImpulse.isMovingRight = true;
      } else if (event.code === "KeyS") {
        swordImpulse.isSKeySwordImpulse = true;
      } else if (event.code === "Space") {
        swordImpulse.isSpaceKeySwordImpulse = true;
        swordImpulse.checkFrontKick();
        swordImpulse.checkLowKick();
        if (!swordImpulse.isFrontKick && !swordImpulse.isLowKick) {
          swordImpulse.checkJump();
        }
      }

      swordImpulse.setState();
      checkAttack();
      sendMessage("Sword Impulse", swordImpulse);
    }

    function handleKeyUpSwordImpulse(event: KeyboardEvent) {
      if (!swordImpulse) return;
      if (swordImpulse.isJumping) return;

      if (event.code === "KeyA") {
        swordImpulse.isAKeySwordImpulse = false;
        swordImpulse.isMovingLeft = false;
      } else if (event.code == "KeyD") {
        swordImpulse.isDKeySwordImpulse = false;
        swordImpulse.isMovingRight = false;
      } else if (event.code == "KeyS") {
        swordImpulse.isSKeySwordImpulse = false;
        swordImpulse.checkLowKick();
      } else if (event.code === "Space") {
        swordImpulse.isSpaceKeySwordImpulse = false;
        swordImpulse.checkFrontKick();
        if (
          !swordImpulse.isDKeySwordImpulse &&
          !swordImpulse.isSpaceKeySwordImpulse
        ) {
          swordImpulse.isFrontKick = false;
        }
      }

      swordImpulse.setState();
      checkAttack();
      sendMessage("Sword Impulse", swordImpulse);
    }

    function updateSwordImpulsePosition() {
      if (!swordImpulse) return;
      swordImpulse.updateJumping();

      if (swordImpulse.x > 880) {
        swordImpulse.x = 880;
      }

      if (swordImpulse.x < 100) {
        swordImpulse.x = 100;
      }

      if (
        swordImpulse.isMovingRight &&
        swordImpulse.currentState !== "FRONT_KICK"
      ) {
        swordImpulse.x += swordImpulse.movementSpeed;
      } else if (
        swordImpulse.isMovingLeft &&
        swordImpulse.currentState !== "FRONT_KICK"
      ) {
        swordImpulse.x -= swordImpulse.movementSpeed;
      }

      swordImpulse.checkMirrored(blastImpulse?.x ?? 0);
    }

    function handleKeyDownBlastImpulse(event: KeyboardEvent) {
      if (!blastImpulse) return;
      if (blastImpulse.isJumping || blastImpulse.isLowKick) return;

      if (event.code === "KeyA") {
        blastImpulse.isAKeyBlastImpulse = true;
        blastImpulse.isMovingLeft = true;
      } else if (event.code === "KeyD") {
        blastImpulse.isDKeyBlastImpulse = true;
        blastImpulse.isMovingRight = true;
      } else if (event.code === "KeyS") {
        blastImpulse.isSKeyBlastImpulse = true;
      } else if (event.code === "Space") {
        blastImpulse.isSpaceKeyBlastImpulse = true;
        blastImpulse.checkLowKick();
        blastImpulse.checkFrontKick();
        if (!blastImpulse.isFrontKick && !blastImpulse.isLowKick) {
          blastImpulse.checkJump();
        }
      }

      blastImpulse.setState();
      checkAttack();
      sendMessage("Blast Impulse", blastImpulse);
    }

    function handleKeyUpBlastImpulse(event: KeyboardEvent) {
      if (!blastImpulse) return;
      if (blastImpulse.isJumping) return;

      if (event.code === "KeyA") {
        blastImpulse.isAKeyBlastImpulse = false;
        blastImpulse.isMovingLeft = false;
      } else if (event.code === "KeyD") {
        blastImpulse.isDKeyBlastImpulse = false;
        blastImpulse.isMovingRight = false;
      } else if (event.code === "KeyS") {
        blastImpulse.isSKeyBlastImpulse = false;
        blastImpulse.checkLowKick();
      } else if (event.code === "Space") {
        blastImpulse.isSpaceKeyBlastImpulse = false;
        blastImpulse.checkFrontKick();
        if (
          !blastImpulse.isDKeyBlastImpulse &&
          !blastImpulse.isSpaceKeyBlastImpulse
        ) {
          blastImpulse.isFrontKick = false;
        }
      }

      blastImpulse.setState();
      checkAttack();
      sendMessage("Blast Impulse", blastImpulse);
    }

    function updateBlastImpulsePosition() {
      if (!blastImpulse) return;
      blastImpulse.updateJumping();

      if (blastImpulse.x > 880) {
        blastImpulse.x = 880;
      }

      if (blastImpulse.x < 100) {
        blastImpulse.x = 100;
      }

      if (
        blastImpulse.isMovingRight &&
        blastImpulse.currentState !== "FRONT_KICK"
      ) {
        blastImpulse.x += blastImpulse.movementSpeed;
      } else if (
        blastImpulse.isMovingLeft &&
        blastImpulse.currentState !== "FRONT_KICK"
      ) {
        blastImpulse.x -= blastImpulse.movementSpeed;
      }

      blastImpulse.checkMirrored(swordImpulse?.x ?? 0);
    }

    if (playerNumber === 1) {
      window.addEventListener("keydown", handleKeyDownSwordImpulse);
      window.addEventListener("keyup", handleKeyUpSwordImpulse);
    } else if (playerNumber === 2) {
      window.addEventListener("keydown", handleKeyDownBlastImpulse);
      window.addEventListener("keyup", handleKeyUpBlastImpulse);
    }

    window.addEventListener("keydown", function (event) {
      const targetElement = event.target as Element;
      if (
        event.code === "Space" &&
        !targetElement.classList.contains("disable-space-scroll")
      ) {
        event.preventDefault();
      }
    });

    //////////////////////////////////////////////////////////

    function loadAndPlayBackgroundMusic() {
      backgroundMusic = GET_BACKGROUND_MUSIC();
      backgroundMusic.loop = true;
      backgroundMusic.volume = 0.2;
      backgroundMusic.play();
    }

    //////////////////////////////////////////////////////////
    swordImpulse = new SwordImpulse(ctx);
    blastImpulse = new BlastImpulse(ctx);
    timer = new Timer(ctx, 180);
    const lifebar = new Lifebar(ctx, gameCanvas.width);
    const background = new Background(ctx, gameCanvas.width, gameCanvas.height);
    const winLogo = new WinLogo(ctx);
    const loseLogo = new LoseLogo(ctx);
    const drawLogo = new DrawLogo(ctx);
    swordImpulseHealth = new Health(ctx, 80, 60, 100, "Sword Impulse");
    blastImpulseHealth = new Health(ctx, 600, 60, 100, "Blast Impulse");

    let lastFrameTime = performance.now();
    function animateSprite() {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime;

      if (deltaTime >= FRAME_INTERVAL) {
        swordImpulse?.updateSprite();
        blastImpulse?.updateSprite();
        lastFrameTime = currentTime - (deltaTime % FRAME_INTERVAL);
      }

      requestAnimationFrame(animateSprite);
    }

    function checkAttack() {
      if (!swordImpulse || !blastImpulse) return;

      if (swordImpulse.isMirrored) {
        if (
          swordImpulse.getLeftX() >= blastImpulse.getLeftX() &&
          swordImpulse.getLeftX() <= blastImpulse.getRightX()
        ) {
          if (swordImpulse?.currentState === "LOW_KICK") {
            blastImpulse.hp -= swordImpulse.lowKickDamage;
          } else if (swordImpulse?.currentState === "FRONT_KICK") {
            blastImpulse.hp -= swordImpulse.frontKickDamage;
          }
          blastImpulseHealth!.health = blastImpulse.hp;
        }
      } else {
        if (
          swordImpulse.getRightX() >= blastImpulse.getLeftX() &&
          swordImpulse.getRightX() <= blastImpulse.getRightX()
        ) {
          if (swordImpulse?.currentState === "LOW_KICK") {
            blastImpulse.hp -= swordImpulse.lowKickDamage;
          } else if (swordImpulse?.currentState === "FRONT_KICK") {
            blastImpulse.hp -= swordImpulse.frontKickDamage;
          }
        }
        blastImpulseHealth!.health = blastImpulse.hp;
      }

      if (blastImpulse.isMirrored) {
        if (
          blastImpulse.getRightX() >= swordImpulse.getLeftX() &&
          blastImpulse.getRightX() <= swordImpulse.getRightX()
        ) {
          if (blastImpulse?.currentState === "LOW_KICK") {
            swordImpulse.hp -= blastImpulse.lowKickDamage;
          } else if (blastImpulse?.currentState === "FRONT_KICK") {
            swordImpulse.hp -= blastImpulse.frontKickDamage;
          }
          swordImpulseHealth!.health = swordImpulse.hp;
        }
      } else {
        if (
          blastImpulse.getLeftX() >= swordImpulse.getLeftX() &&
          blastImpulse.getLeftX() <= swordImpulse.getRightX()
        ) {
          if (blastImpulse?.currentState === "LOW_KICK") {
            swordImpulse.hp -= blastImpulse.lowKickDamage;
          } else if (blastImpulse?.currentState === "FRONT_KICK") {
            swordImpulse.hp -= blastImpulse.frontKickDamage;
          }
          swordImpulseHealth!.health = swordImpulse.hp;
        }
      }
      sendMessage("Sword Impulse", swordImpulse);
      sendMessage("Blast Impulse", blastImpulse);
    }

    function drawBox() {
      ctx!.fillStyle = "red";
      ctx?.fillRect(
        swordImpulse?.getLeftX() ?? 0,
        300,
        swordImpulse?.getWidth() ?? 0,
        swordImpulse?.getHeight() ?? 0
      );
      ctx?.fillRect(
        blastImpulse?.getLeftX() ?? 0,
        300,
        blastImpulse?.getWidth() ?? 0,
        blastImpulse?.getHeight() ?? 0
      );
      ctx!.fillStyle = "blue";
    }

    function checkGameCondition() {
      if (timer!.time <= 0) {
        if (blastImpulse!.hp > 0 && swordImpulse!.hp > 0) {
          gameOver = true;
          gameCondition = "Draw";
          return;
        }
      }

      if (blastImpulse!.hp <= 0 || swordImpulse!.hp <= 0) {
        gameOver = true;

        if (swordImpulse!.hp > 0) {
          if (playerNumber === 1) {
            gameCondition = "Win";
          } else if (playerNumber === 2) {
            gameCondition = "Lose";
          }
        } else {
          if (playerNumber === 1) {
            gameCondition = "Lose";
          } else if (playerNumber === 2) {
            gameCondition = "Win";
          }
        }
      }
    }

    function render() {
      if (gameOver) {
        if (gameCondition === "Win") {
          updatePoint(user?.ID ?? 0, 100);
          winLogo.render();
        } else if (gameCondition === "Lose") {
          loseLogo.render();
        } else if (gameCondition === "Draw") {
          drawLogo.render();
        }

        setTimeout(() => {
          navigate("/view-point");
        }, 5000);

        return;
      }
      requestAnimationFrame(render);
      checkGameCondition();
      updateSwordImpulsePosition();
      updateBlastImpulsePosition();
      background.render();
      swordImpulseHealth?.render();
      blastImpulseHealth?.render();
      lifebar.render();
      timer?.render();
      drawBox();
      swordImpulse?.render();
      blastImpulse?.render();
    }

    loadAndPlayBackgroundMusic();
    animateSprite();
    render();
  };

  useEffect(() => {
    socket.on("player_number", (data: any) => {
      if (!playerNumberAssigned) {
        setPlayerNumber(data);
        setPlayerNumberAssigned(true);
      }
    });

    socket.on("receive_message", ({ name, object }) => {
      if (!swordImpulse || !blastImpulse) return;

      if (name === "Sword Impulse") {
        swordImpulse.currentState = object.currentState;
        swordImpulse.isAKeySwordImpulse = object.isAKeySwordImpulse;
        swordImpulse.isDKeySwordImpulse = object.isDKeySwordImpulse;
        swordImpulse.isSKeySwordImpulse = object.isSKeySwordImpulse;
        swordImpulse.isSpaceKeySwordImpulse = object.isSpaceKeySwordImpulse;
        swordImpulse.isMovingLeft = object.isMovingLeft;
        swordImpulse.isMovingRight = object.isMovingRight;
        swordImpulse.isJumping = object.isJumping;
        swordImpulse.isMirrored = object.isMirrored;
        swordImpulse.x = object.x;
        swordImpulse.y = object.y;
        swordImpulse.hp = object.hp;
        swordImpulseHealth!.health = swordImpulse.hp;
      } else if (name === "Blast Impulse") {
        blastImpulse.currentState = object.currentState;
        blastImpulse.isAKeyBlastImpulse = object.isAKeyBlastImpulse;
        blastImpulse.isDKeyBlastImpulse = object.isDKeyBlastImpulse;
        blastImpulse.isSKeyBlastImpulse = object.isSKeyBlastImpulse;
        blastImpulse.isSpaceKeyBlastImpulse = object.isSpaceKeyBlastImpulse;
        blastImpulse.isMovingLeft = object.isMovingLeft;
        blastImpulse.isMovingRight = object.isMovingRight;
        blastImpulse.isJumping = object.isJumping;
        blastImpulse.isMirrored = object.isMirrored;
        blastImpulse.x = object.x;
        blastImpulse.y = object.y;
        blastImpulse.hp = object.hp;
        blastImpulseHealth!.health = blastImpulse.hp;
      }
    });

    socket.on("start_timer", () => {
      timer?.startCountdown();
    });
  }, [socket, playerNumberAssigned]);

  const initializeGame = () => {
    if (playerNumber && gameCanvasRef.current && !gameInitialized) {
      startGame(gameCanvasRef.current);
      setGameInitialized(true);
      if (playerNumber === 2) {
        timer!.startCountdown();
      }
    }
  };

  useEffect(() => {
    initializeGame();
  }, [playerNumber, gameInitialized]);

  return (
    <Container>
      <Navbar />
      <ButtonContainer>
        <PlayButton onClick={sendClientInformation}>Play</PlayButton>
      </ButtonContainer>
      <InnerContainer>
        <GameCanvas ref={gameCanvasRef} width={1200} height={600} />
      </InnerContainer>
      <Footer />
    </Container>
  );
};

export default GamePage;
