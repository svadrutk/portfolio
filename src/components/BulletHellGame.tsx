'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type GameState = 'playing' | 'paused' | 'game-over' | 'won';

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  id: number;
}

interface Spaceship {
  x: number;
  y: number;
  direction: number;
  lastShot: number;
  id: number;
  side: 'top' | 'bottom' | 'left' | 'right';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  life: number;
  maxLife: number;
  color: string;
}

const INITIAL_LIVES = 3;
const INVINCIBILITY_DURATION = 1500;
const SPACESHIP_SPAWN_INTERVAL = 15000;
const MAX_SPACESHIPS = 8;
const BULLET_SPEED_INCREASE_INTERVAL = 10000;
const BASE_BULLET_SPEED = 2.5;
const BASE_SHOOT_INTERVAL = 600;
const HITBOX_SIZE = 16;
const PARTICLE_CHARS = ['*', '+', 'x', '#', '@', '•'];
const PARTICLE_COLORS = ['#ef4444', '#f97316', '#fbbf24', '#ffffff'];
const INTRO_DURATION = 3000;
const CURSOR_OFFSET_X = 5;
const CURSOR_OFFSET_Y = 5;
const WIN_TIME = 30;

export default function BulletHellGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [score, setScore] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isInvincible, setIsInvincible] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const gameRef = useRef({
    bullets: [] as Bullet[],
    spaceships: [] as Spaceship[],
    particles: [] as Particle[],
    mouseX: 0,
    mouseY: 0,
    bulletId: 0,
    spaceshipId: 0,
    lastSpaceshipSpawn: 0,
    lastSpeedIncrease: 0,
    bulletSpeedMultiplier: 1,
    shootIntervalMultiplier: 1,
    startTime: Date.now(),
    animationId: 0,
    lives: INITIAL_LIVES,
    isInvincible: false,
  });

  useEffect(() => {
    const checkDesktop = () => {
      const isDesktopDevice = typeof navigator !== 'undefined' &&
        navigator.maxTouchPoints === 0 &&
        window.matchMedia('(min-width: 1024px)').matches;
      setIsDesktop(isDesktopDevice);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const createInitialSpaceships = useCallback((width: number, height: number) => {
    return [
      { x: width * 0.25, y: 40, direction: 1, lastShot: Date.now(), id: 0, side: 'top' as const },
      { x: width * 0.75, y: 40, direction: -1, lastShot: Date.now(), id: 1, side: 'top' as const },
      { x: width * 0.5, y: height - 40, direction: 1, lastShot: Date.now(), id: 2, side: 'bottom' as const },
      { x: 40, y: height * 0.5, direction: 1, lastShot: Date.now(), id: 3, side: 'left' as const },
      { x: width - 40, y: height * 0.5, direction: -1, lastShot: Date.now(), id: 4, side: 'right' as const },
    ];
  }, []);

  const resetGame = useCallback(() => {
    const game = gameRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    game.bullets = [];
    game.particles = [];
    game.spaceships = createInitialSpaceships(width, height);
    game.bulletId = 0;
    game.spaceshipId = 5;
    game.lastSpaceshipSpawn = Date.now();
    game.lastSpeedIncrease = Date.now();
    game.bulletSpeedMultiplier = 1;
    game.shootIntervalMultiplier = 1;
    game.startTime = Date.now();
    game.lives = INITIAL_LIVES;
    game.isInvincible = false;
    setLives(INITIAL_LIVES);
    setScore(0);
    setIsInvincible(false);
    setShowIntro(true);
    setTimeout(() => setShowIntro(false), INTRO_DURATION);
    setGameState('playing');
  }, [createInitialSpaceships]);

  useEffect(() => {
    if (!isDesktop) return;

    const game = gameRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    game.spaceships = createInitialSpaceships(width, height);
    game.startTime = Date.now();
    game.lastSpaceshipSpawn = Date.now();
    game.lastSpeedIncrease = Date.now();

    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, INTRO_DURATION);

    const handleMouseMove = (e: MouseEvent) => {
      game.mouseX = e.clientX;
      game.mouseY = e.clientY;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setGameState(prev => prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(introTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDesktop, createInitialSpaceships]);

  useEffect(() => {
    if (!isDesktop || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const game = gameRef.current;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const getSpaceshipChar = (side: string): string => {
      switch (side) {
        case 'top': return '<^>';
        case 'bottom': return '<v>';
        case 'left': return '<<';
        case 'right': return '>>';
        default: return '<^>';
      }
    };

    const shootBullet = (ship: Spaceship) => {
      const speed = BASE_BULLET_SPEED * game.bulletSpeedMultiplier * (0.8 + Math.random() * 0.4);
      let vx = 0, vy = 0, char = '>';
      const angleVariation = (Math.random() - 0.5) * 0.5;

      switch (ship.side) {
        case 'top':
          vx = angleVariation * speed;
          vy = speed;
          char = 'v';
          break;
        case 'bottom':
          vx = angleVariation * speed;
          vy = -speed;
          char = '^';
          break;
        case 'left':
          vx = speed;
          vy = angleVariation * speed;
          char = '>';
          break;
        case 'right':
          vx = -speed;
          vy = angleVariation * speed;
          char = '<';
          break;
      }

      game.bullets.push({
        x: ship.x,
        y: ship.y,
        vx,
        vy,
        char,
        id: game.bulletId++,
      });
    };

    const createExplosion = (x: number, y: number) => {
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const speed = 3 + Math.random() * 5;
        game.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          char: PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)],
          life: 30 + Math.random() * 20,
          maxLife: 50,
          color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        });
      }
    };

    const gameLoop = () => {
      if (gameState !== 'playing') return;

      const now = Date.now();
      const elapsed = now - game.startTime;
      const elapsedSeconds = Math.floor(elapsed / 1000);
      setScore(elapsedSeconds);

      if (elapsedSeconds >= WIN_TIME) {
        game.bullets = [];
        game.spaceships = [];
        game.particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setGameState('won');
        return;
      }

      if (now - game.lastSpeedIncrease > BULLET_SPEED_INCREASE_INTERVAL) {
        game.bulletSpeedMultiplier *= 1.1;
        game.shootIntervalMultiplier *= 0.95;
        game.lastSpeedIncrease = now;
      }

      if (now - game.lastSpaceshipSpawn > SPACESHIP_SPAWN_INTERVAL && game.spaceships.length < MAX_SPACESHIPS) {
        const sides: ('top' | 'bottom' | 'left' | 'right')[] = ['top', 'bottom', 'left', 'right'];
        const side = sides[Math.floor(Math.random() * sides.length)];
        let x, y;

        switch (side) {
          case 'top':
            x = Math.random() * (canvas.width - 100) + 50;
            y = 40;
            break;
          case 'bottom':
            x = Math.random() * (canvas.width - 100) + 50;
            y = canvas.height - 40;
            break;
          case 'left':
            x = 40;
            y = Math.random() * (canvas.height - 100) + 50;
            break;
          case 'right':
            x = canvas.width - 40;
            y = Math.random() * (canvas.height - 100) + 50;
            break;
        }

        game.spaceships.push({
          x: x!,
          y: y!,
          direction: Math.random() > 0.5 ? 1 : -1,
          lastShot: now,
          id: game.spaceshipId++,
          side,
        });
        game.lastSpaceshipSpawn = now;
      }

      game.spaceships.forEach(ship => {
        if (ship.side === 'top' || ship.side === 'bottom') {
          ship.x += ship.direction * 0.8;
          if (ship.x < 50 || ship.x > canvas.width - 50) {
            ship.direction *= -1;
          }
        } else {
          ship.y += ship.direction * 0.8;
          if (ship.y < 50 || ship.y > canvas.height - 50) {
            ship.direction *= -1;
          }
        }

        const shootInterval = BASE_SHOOT_INTERVAL * game.shootIntervalMultiplier;
        if (now - ship.lastShot > shootInterval) {
          shootBullet(ship);
          ship.lastShot = now;
        }
      });

      game.bullets.forEach(bullet => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
      });

      game.bullets = game.bullets.filter(bullet => 
        bullet.x > -20 && bullet.x < canvas.width + 20 &&
        bullet.y > -20 && bullet.y < canvas.height + 20
      );

      game.particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.life -= 1;
      });

      game.particles = game.particles.filter(p => p.life > 0);

      if (!game.isInvincible) {
        for (const bullet of game.bullets) {
          const dx = game.mouseX - bullet.x;
          const dy = game.mouseY - bullet.y;
          if (Math.abs(dx) < HITBOX_SIZE && Math.abs(dy) < HITBOX_SIZE) {
            createExplosion(game.mouseX, game.mouseY);
            game.lives -= 1;
            setLives(game.lives);
            game.bullets = game.bullets.filter(b => b.id !== bullet.id);

            if (game.lives <= 0) {
              game.bullets = [];
              game.spaceships = [];
              game.particles = [];
              setGameState('game-over');
            } else {
              game.isInvincible = true;
              setIsInvincible(true);
              setTimeout(() => {
                game.isInvincible = false;
                setIsInvincible(false);
              }, INVINCIBILITY_DURATION);
            }
            break;
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = '16px var(--font-geist-mono), monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      game.spaceships.forEach(ship => {
        ctx.fillStyle = '#22c55e';
        ctx.fillText(getSpaceshipChar(ship.side), ship.x, ship.y);
      });

      ctx.fillStyle = '#fbbf24';
      game.bullets.forEach(bullet => {
        ctx.fillText(bullet.char, bullet.x, bullet.y);
      });

      game.particles.forEach(particle => {
        const alpha = particle.life / particle.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.fillText(particle.char, particle.x, particle.y);
      });
      ctx.globalAlpha = 1;

      if (game.isInvincible) {
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(game.mouseX + CURSOR_OFFSET_X, game.mouseY + CURSOR_OFFSET_Y, HITBOX_SIZE + 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      game.animationId = requestAnimationFrame(gameLoop);
    };

    game.animationId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(game.animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDesktop, gameState]);

  useEffect(() => {
    if (!isDesktop || gameState !== 'playing') return;

    const scoreInterval = setInterval(() => {
      const elapsed = Date.now() - gameRef.current.startTime;
      setScore(Math.floor(elapsed / 1000));
    }, 100);

    return () => clearInterval(scoreInterval);
  }, [isDesktop, gameState]);

  if (!isDesktop) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed inset-0 z-50 ${gameState === 'game-over' || gameState === 'won' ? 'pointer-events-none' : ''}`}>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${gameState === 'paused' || gameState === 'game-over' || gameState === 'won' ? 'pointer-events-none' : 'pointer-events-auto'}`}
      />

      <div className="absolute top-4 left-4 font-mono text-lg pointer-events-none">
        <span className="text-green-500">
          {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
            <span key={i} className={i < lives ? '' : 'opacity-30'}>♥</span>
          ))}
        </span>
      </div>

      <div className="absolute top-4 right-4 font-mono text-amber-400 text-lg pointer-events-none">
        TIME: {formatTime(score)}
      </div>

      {gameState === 'playing' && (
        <button
          onClick={() => setGameState('paused')}
          className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-500 hover:text-gray-300 transition-colors px-3 py-1 border border-gray-700 rounded hover:border-gray-500"
        >
          [PAUSE]
        </button>
      )}

      {gameState === 'playing' && showIntro && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 font-mono text-sm text-green-500 pointer-events-none animate-pulse">
          dodge bullets with your cursor
        </div>
      )}

      {gameState === 'paused' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center pointer-events-auto">
            <p className="font-mono text-2xl text-green-500 mb-4">PAUSED</p>
            <button
              onClick={() => setGameState('playing')}
              className="font-mono text-sm text-amber-400 hover:text-amber-300 transition-colors px-4 py-2 border border-amber-600 rounded hover:border-amber-400"
            >
              [RESUME]
            </button>
            <p className="font-mono text-xs text-gray-600 mt-4">press ESC to resume</p>
          </div>
        </div>
      )}

      {gameState === 'game-over' && (
        <div className="absolute bottom-4 right-4 pointer-events-none">
          <div className="text-right pointer-events-auto">
            <p className="font-mono text-2xl text-red-500 mb-1">GAME OVER</p>
            <p className="font-mono text-sm text-amber-400 mb-3">TIME: {formatTime(score)}</p>
            <button
              onClick={resetGame}
              className="font-mono text-xs text-green-500 hover:text-green-400 transition-colors px-3 py-1.5 border border-green-600 rounded hover:border-green-400"
            >
              [RESTART]
            </button>
          </div>
        </div>
      )}

      {gameState === 'won' && (
        <div className="absolute bottom-4 right-4 pointer-events-none">
          <div className="text-right pointer-events-auto">
            <p className="font-mono text-2xl text-green-500 mb-1">YOU WIN!</p>
            <p className="font-mono text-sm text-amber-400 mb-3">survived 30 seconds</p>
            <button
              onClick={resetGame}
              className="font-mono text-xs text-green-500 hover:text-green-400 transition-colors px-3 py-1.5 border border-green-600 rounded hover:border-green-400"
            >
              [PLAY AGAIN]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
