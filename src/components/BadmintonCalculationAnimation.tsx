import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Crosshair, Zap, Eye, Gauge, Compass } from 'lucide-react';

interface BadmintonAnimationProps {
  className?: string;
}

export const BadmintonCalculationAnimation: React.FC<BadmintonAnimationProps> = ({
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLockedInBulletTime, setIsLockedInBulletTime] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(3.1); // default near bullet-time
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [viewTheme, setViewTheme] = useState<'white' | 'dark'>('white'); // prompt requested clean white background

  const animRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);

  const LOOP_DURATION = 6.0; // 6 seconds seamless loop

  useEffect(() => {
    if (!isPlaying || isLockedInBulletTime) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const deltaSec = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      // In the bullet-time phase (between 2.2s and 4.2s), slow down time calculation rate naturally
      let timeRate = 1.0;
      if (currentTime >= 2.0 && currentTime <= 4.2) {
        timeRate = 0.35; // slow-motion bullet time
      }

      setCurrentTime((prev) => {
        const next = prev + deltaSec * speedMultiplier * timeRate;
        return next >= LOOP_DURATION ? 0 : next;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, isLockedInBulletTime, currentTime, speedMultiplier]);

  // Derived state for animation phases
  // Phase 0: Serve (0.0 -> 1.4)
  // Phase 1: High Return Clear (1.4 -> 2.2)
  // Phase 2: Bullet-time Mental Calculation Freeze (2.2 -> 4.2)
  // Phase 3: Explosive Smash & Impact (4.2 -> 5.2)
  // Phase 4: Recovery & Loop Reset (5.2 -> 6.0)
  const isBulletTime = currentTime >= 2.0 && currentTime <= 4.2;
  const isSmashing = currentTime > 4.2 && currentTime < 5.0;

  // Calculate coordinates for shuttlecock
  let shuttleX = 180;
  let shuttleY = 280;
  let shuttleAngle = 45;
  let smashProgress = 0;

  if (currentTime < 1.4) {
    // Serve arc from player (left, x: 180, y: 280) over net (x: 450, y: 220) to right (x: 700, y: 310)
    const t = currentTime / 1.4;
    shuttleX = 180 + t * 520;
    shuttleY = 280 - Math.sin(t * Math.PI) * 160 + t * 30;
    shuttleAngle = 30 - t * 60;
  } else if (currentTime < 2.2) {
    // Opponent high defensive return from x: 700 back to high player backcourt x: 260, y: 140
    const t = (currentTime - 1.4) / 0.8;
    shuttleX = 700 - t * 440;
    shuttleY = 310 - Math.sin(t * Math.PI * 0.9) * 220 - t * 50;
    shuttleAngle = 180 + t * 30;
  } else if (currentTime <= 4.2) {
    // Bullet-time hover near player jump height! (x: 260, y: 130)
    const t = (currentTime - 2.2) / 2.0;
    shuttleX = 260 + Math.sin(t * Math.PI * 2) * 5;
    shuttleY = 130 + Math.cos(t * Math.PI * 2) * 3;
    shuttleAngle = -20 + t * 15;
  } else if (currentTime < 5.0) {
    // Explosive smash streak from (260, 130) down to opponent front-corner line (720, 360)
    smashProgress = (currentTime - 4.2) / 0.8;
    shuttleX = 260 + smashProgress * 460;
    shuttleY = 130 + smashProgress * 230;
    shuttleAngle = -32;
  } else {
    // Floor rest & recovery
    shuttleX = 720;
    shuttleY = 360;
    shuttleAngle = -75;
  }

  // Player position and jump height
  let playerJumpY = 0;
  let playerArmAngle = 0;
  if (currentTime < 1.4) {
    // Serve stance
    playerArmAngle = Math.sin((currentTime / 1.4) * Math.PI) * 40;
  } else if (currentTime >= 2.0 && currentTime <= 4.2) {
    // In mid-air jumping posture
    const jumpT = (currentTime - 2.0) / 2.2;
    playerJumpY = Math.sin(jumpT * Math.PI) * 45;
    playerArmAngle = -65; // Cocked back ready to smash
  } else if (currentTime > 4.2 && currentTime < 4.8) {
    // Explosive forward swing
    playerJumpY = 40 * (1 - (currentTime - 4.2) / 0.6);
    playerArmAngle = 70; // Smashed through
  }

  const isWhite = viewTheme === 'white';

  return (
    <div className={`relative border rounded-xl overflow-hidden shadow-2xl transition-colors ${
      isWhite
        ? 'bg-white border-neutral-200 text-neutral-900'
        : 'bg-[#09090d] border-white/15 text-white'
    } ${className}`}>
      
      {/* Top Controls Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b text-xs font-mono ${
        isWhite ? 'border-neutral-200 bg-neutral-50/80' : 'border-white/10 bg-white/[0.02]'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            2D VECTOR SIMULATION · QUANTUM MENTAL CALCULATION
          </span>
          <span className={`${isWhite ? 'text-neutral-400' : 'text-neutral-600'}`}>·</span>
          <span className={`${isWhite ? 'text-neutral-500' : 'text-neutral-400'} hidden sm:inline`}>
            PHYSICS & BULLET-TIME HUD
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          {/* Bullet time lock */}
          <button
            onClick={() => setIsLockedInBulletTime(!isLockedInBulletTime)}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer flex items-center gap-1.5 font-semibold text-[11px] ${
              isLockedInBulletTime
                ? 'bg-amber-500 text-black shadow-md'
                : isWhite
                ? 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300'
                : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
            title="Lock in mental calculation freeze"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isLockedInBulletTime ? 'FREEZE ACTIVE' : 'FREEZE HUD'}</span>
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isWhite ? 'hover:bg-neutral-200 text-neutral-700' : 'hover:bg-white/10 text-neutral-300'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              setCurrentTime(0);
              setIsLockedInBulletTime(false);
            }}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isWhite ? 'hover:bg-neutral-200 text-neutral-700' : 'hover:bg-white/10 text-neutral-300'
            }`}
            title="Reset Loop"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Theme Switcher: Clean White (prompt requirement) / Dark */}
          <button
            onClick={() => setViewTheme(isWhite ? 'dark' : 'white')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
              isWhite
                ? 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-100'
                : 'border-white/20 bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            {isWhite ? 'Clean White View' : 'Tactical Dark View'}
          </button>
        </div>
      </div>

      {/* Main SVG Vector Canvas */}
      <div className={`relative w-full h-[420px] sm:h-[480px] overflow-hidden select-none ${
        isWhite ? 'bg-white' : 'bg-[#060608]'
      }`}>
        <svg
          viewBox="0 0 900 480"
          className="w-full h-full block"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Neon Glow Filters */}
            <filter id="neonGlowCyan" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="neonGlowAmber" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Shuttlecock Smash Speed Trail Gradient */}
            <linearGradient id="smashTrail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.0" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
            </linearGradient>

            {/* Badminton Net Mesh Pattern */}
            <pattern id="netMesh" width="8" height="8" patternUnits="userSpaceOnUse">
              <path
                d="M 0 0 L 8 8 M 8 0 L 0 8"
                fill="none"
                stroke={isWhite ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)"}
                strokeWidth="0.75"
              />
            </pattern>
          </defs>

          {/* 1. Badminton Court Floor (Flat Minimalist Isometric Perspective) */}
          <g id="badmintonCourt" transform="translate(0, 0)">
            {/* Court Mat Surface */}
            <polygon
              points="100,410 800,410 740,240 160,240"
              fill={isWhite ? "#f8fafc" : "#0d1117"}
              stroke={isWhite ? "#e2e8f0" : "#1f2937"}
              strokeWidth="2"
            />

            {/* Inner Court Boundary Lines */}
            {/* Doubles outer boundary */}
            <polygon
              points="115,400 785,400 730,250 170,250"
              fill="none"
              stroke={isWhite ? "#cbd5e1" : "#334155"}
              strokeWidth="1.5"
            />
            {/* Singles side boundary */}
            <line x1="140" y1="400" x2="190" y2="250" stroke={isWhite ? "#94a3b8" : "#475569"} strokeWidth="1.2" />
            <line x1="760" y1="400" x2="710" y2="250" stroke={isWhite ? "#94a3b8" : "#475569"} strokeWidth="1.2" />

            {/* Service Back Lines */}
            <line x1="130" y1="375" x2="770" y2="375" stroke={isWhite ? "#94a3b8" : "#475569"} strokeWidth="1.2" />
            {/* Front Short Service Line */}
            <line x1="150" y1="320" x2="750" y2="320" stroke={isWhite ? "#94a3b8" : "#475569"} strokeWidth="1.2" />

            {/* Center Service Line */}
            <line x1="450" y1="400" x2="450" y2="250" stroke={isWhite ? "#94a3b8" : "#475569"} strokeWidth="1.2" />

            {/* Tactical Landing Crosshairs Target on Court (where the calculated smash lands) */}
            <g transform="translate(720, 360)">
              <circle cx="0" cy="0" r="14" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="0" cy="0" r="4" fill="#06b6d4" />
              <line x1="-18" y1="0" x2="18" y2="0" stroke="#06b6d4" strokeWidth="1" />
              <line x1="0" y1="-18" x2="0" y2="18" stroke="#06b6d4" strokeWidth="1" />
              {isBulletTime && (
                <text
                  x="20"
                  y="4"
                  fill={isWhite ? "#0284c7" : "#38bdf8"}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  TARGET [99.2% ACE]
                </text>
              )}
            </g>

            {/* The Net in the Center */}
            {/* Net Posts */}
            <line x1="450" y1="330" x2="450" y2="180" stroke={isWhite ? "#1e293b" : "#e2e8f0"} strokeWidth="3" />
            {/* Net Mesh Rectangle */}
            <rect
              x="448"
              y="185"
              width="4"
              height="145"
              fill={isWhite ? "#0f172a" : "#f8fafc"}
            />
            {/* Net Tape (White Top Cord) */}
            <line x1="100" y1="230" x2="800" y2="230" stroke={isWhite ? "#64748b" : "#94a3b8"} strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
          </g>

          {/* 2. Opponent Player (Minimalist Flat 2D Vector Silhouette on right side) */}
          <g transform="translate(680, 275)" opacity="0.85">
            {/* Shadow */}
            <ellipse cx="0" cy="25" rx="16" ry="5" fill={isWhite ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"} />
            {/* Torso */}
            <rect x="-8" y="-20" width="16" height="26" rx="4" fill={isWhite ? "#64748b" : "#475569"} />
            {/* Head */}
            <circle cx="0" cy="-28" r="7" fill={isWhite ? "#475569" : "#64748b"} />
            {/* Legs */}
            <line x1="-5" y1="6" x2="-6" y2="24" stroke={isWhite ? "#475569" : "#64748b"} strokeWidth="4" strokeLinecap="round" />
            <line x1="5" y1="6" x2="7" y2="24" stroke={isWhite ? "#475569" : "#64748b"} strokeWidth="4" strokeLinecap="round" />
            {/* Opponent Racket */}
            <line x1="10" y1="-10" x2="22" y2="-28" stroke={isWhite ? "#94a3b8" : "#94a3b8"} strokeWidth="2" />
            <ellipse cx="27" cy="-34" rx="7" ry="9" fill="none" stroke={isWhite ? "#94a3b8" : "#94a3b8"} strokeWidth="1.5" />
          </g>

          {/* 3. Our Player: Akhil Pesala (Flat 2D Vector Athlete on Left Side) */}
          <g transform={`translate(180, ${320 - playerJumpY})`}>
            {/* Player Shadow on Floor */}
            <ellipse
              cx="0"
              cy={30 + playerJumpY}
              rx={18 * (1 - playerJumpY / 90)}
              ry={6 * (1 - playerJumpY / 90)}
              fill={isWhite ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)"}
            />

            {/* Legs (Animated stance) */}
            {playerJumpY > 10 ? (
              // Mid-air tuck
              <g stroke={isWhite ? "#0f172a" : "#f1f5f9"} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M -6 10 L -12 24 L -4 34" fill="none" />
                <path d="M 6 10 L 14 22 L 8 32" fill="none" />
              </g>
            ) : (
              // Grounded ready stance
              <g stroke={isWhite ? "#0f172a" : "#f1f5f9"} strokeWidth="5" strokeLinecap="round">
                <line x1="-7" y1="10" x2="-14" y2="30" />
                <line x1="7" y1="10" x2="14" y2="30" />
              </g>
            )}

            {/* Torso / Athletic Jersey */}
            <path
              d="M -12 -18 L 12 -18 L 9 10 L -9 10 Z"
              fill={isWhite ? "#0284c7" : "#0ea5e9"}
              rx="4"
            />
            {/* Number on jersey */}
            <text x="0" y="-2" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              01
            </text>

            {/* Head */}
            <circle cx="0" cy="-28" r="8" fill={isWhite ? "#0f172a" : "#e2e8f0"} />
            {/* Hair/Headband accent */}
            <path d="M -7 -32 Q 0 -38 7 -32" stroke="#06b6d4" strokeWidth="2.5" fill="none" />

            {/* Left Arm (Balance) */}
            <line x1="-12" y1="-14" x2="-22" y2="-4" stroke={isWhite ? "#0f172a" : "#e2e8f0"} strokeWidth="3.5" strokeLinecap="round" />

            {/* Right Arm (Racket Arm with dynamic rotation) */}
            <g transform={`translate(10, -14) rotate(${playerArmAngle})`}>
              <line x1="0" y1="0" x2="16" y2="-18" stroke={isWhite ? "#0f172a" : "#e2e8f0"} strokeWidth="4" strokeLinecap="round" />
              {/* Forearm */}
              <line x1="16" y1="-18" x2="28" y2="-34" stroke={isWhite ? "#0f172a" : "#e2e8f0"} strokeWidth="3.5" strokeLinecap="round" />
              {/* Badminton Racket Grip & Shaft */}
              <line x1="28" y1="-34" x2="48" y2="-56" stroke="#06b6d4" strokeWidth="2" />
              {/* Racket Head / Frame */}
              <ellipse
                cx="58"
                cy="-68"
                rx="10"
                ry="14"
                transform="rotate(25, 58, -68)"
                fill="none"
                stroke={isWhite ? "#0284c7" : "#38bdf8"}
                strokeWidth="2"
              />
              {/* Strung Mesh */}
              <line x1="58" y1="-80" x2="58" y2="-56" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
              <line x1="50" y1="-68" x2="66" y2="-68" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
            </g>
          </g>

          {/* 4. THE BULLET-TIME NEON HUD MENTAL CALCULATION LAYER */}
          {isBulletTime && (
            <g id="bulletTimeMentalHUD">
              {/* Trajectory Parabola: Theoretical vs Adjusted */}
              <path
                d="M 260 130 Q 520 220 720 360"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="6 3"
                filter="url(#neonGlowCyan)"
              />
              <path
                d="M 260 130 Q 480 180 720 360"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                opacity="0.75"
              />

              {/* Concentric Calculation Rings around Suspended Shuttlecock */}
              <g transform={`translate(${shuttleX}, ${shuttleY})`}>
                <circle cx="0" cy="0" r="28" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="8 4" filter="url(#neonGlowCyan)">
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="42" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="14 6" opacity="0.8" filter="url(#neonGlowAmber)">
                  <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="6s" repeatCount="indefinite" />
                </circle>

                {/* Polar Coordinates & Radar crosshair */}
                <line x1="-50" y1="0" x2="50" y2="0" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />
                <line x1="0" y1="-50" x2="0" y2="50" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="0.75" />

                {/* Floating Telemetry Annotation beside Shuttlecock */}
                <g transform="translate(48, -25)">
                  <rect
                    x="0"
                    y="-12"
                    width="190"
                    height="72"
                    rx="6"
                    fill={isWhite ? "rgba(255,255,255,0.92)" : "rgba(10,12,18,0.92)"}
                    stroke="#06b6d4"
                    strokeWidth="1"
                  />
                  <text x="10" y="5" fill="#06b6d4" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                    BULLET-TIME CALCULATION
                  </text>
                  <text x="10" y="20" fill={isWhite ? "#0f172a" : "#f1f5f9"} fontSize="8.5" fontFamily="monospace">
                    v₀ = 418.5 km/h · θ = -18.4°
                  </text>
                  <text x="10" y="34" fill={isWhite ? "#475569" : "#94a3b8"} fontSize="8" fontFamily="monospace">
                    y(t) = v₀·sin(θ)t - ½gt²
                  </text>
                  <text x="10" y="48" fill="#10b981" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                    PROBABILITY |ψ⟩ = 99.2% ACE
                  </text>
                </g>
              </g>

              {/* Speedometer HUD Gauge in Top Center */}
              <g transform="translate(450, 75)">
                <rect
                  x="-120"
                  y="-25"
                  width="240"
                  height="50"
                  rx="8"
                  fill={isWhite ? "rgba(255,255,255,0.95)" : "rgba(8,10,15,0.9)"}
                  stroke={isWhite ? "#e2e8f0" : "rgba(255,255,255,0.15)"}
                  strokeWidth="1"
                />
                <text x="0" y="-8" fill={isWhite ? "#64748b" : "#94a3b8"} fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                  PROJECTED SMASH VELOCITY
                </text>
                <text x="0" y="16" fill="#06b6d4" fontSize="20" fontFamily="monospace" fontWeight="900" textAnchor="middle">
                  418.5 <tspan fontSize="11" fill={isWhite ? "#0f172a" : "#e2e8f0"}>KM/H</tspan>
                </text>
              </g>

              {/* Tactical Target Arc in Opponent Court */}
              <g transform="translate(720, 360)">
                <path
                  d="M -40 0 A 40 40 0 0 1 0 -40"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  filter="url(#neonGlowAmber)"
                />
                <text
                  x="-35"
                  y="-15"
                  fill="#f59e0b"
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  INTERCEPT: 0.14s
                </text>
              </g>
            </g>
          )}

          {/* 5. Explosive Smash Streak Trail (When Time Resumes) */}
          {isSmashing && (
            <g id="smashTrailLines">
              {/* Sonic shockwave ring at racket contact */}
              <circle
                cx="260"
                cy="130"
                r={smashProgress * 70}
                fill="none"
                stroke="#06b6d4"
                strokeWidth={3 * (1 - smashProgress)}
                opacity={1 - smashProgress}
              />

              {/* Hyperspeed motion blur streak */}
              <line
                x1="260"
                y1="130"
                x2={shuttleX}
                y2={shuttleY}
                stroke="url(#smashTrail)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1="260"
                y1="132"
                x2={shuttleX}
                y2={shuttleY}
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Shockwave at court impact */}
              {smashProgress > 0.8 && (
                <ellipse
                  cx="720"
                  cy="360"
                  rx={(smashProgress - 0.8) * 120}
                  ry={(smashProgress - 0.8) * 45}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
              )}
            </g>
          )}

          {/* 6. The 2D Vector Shuttlecock */}
          <g transform={`translate(${shuttleX}, ${shuttleY}) rotate(${shuttleAngle})`}>
            {/* Cork Base (Semi-circle rounded tip) */}
            <path
              d="M -3 -4 C -7 -4 -7 4 -3 4 L 3 4 C 7 4 7 -4 3 -4 Z"
              fill={isWhite ? "#f8fafc" : "#ffffff"}
              stroke={isWhite ? "#0f172a" : "#38bdf8"}
              strokeWidth="1.2"
            />
            {/* Feather Skirt (Flared cone) */}
            <path
              d="M -2 -4 L -12 -12 L -8 -13 L -1 -4 Z"
              fill={isWhite ? "#e2e8f0" : "#94a3b8"}
            />
            <path
              d="M 2 -4 L 12 -12 L 8 -13 L 1 -4 Z"
              fill={isWhite ? "#e2e8f0" : "#94a3b8"}
            />
            <path
              d="M -1 -4 L 0 -14 L 1 -4 Z"
              fill={isWhite ? "#ffffff" : "#cbd5e1"}
            />
            {/* Feather Binding Tape */}
            <line x1="-5" y1="-8" x2="5" y2="-8" stroke="#06b6d4" strokeWidth="1" />
          </g>

        </svg>

        {/* Phase Indicator Badge in Bottom Left */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2">
          <span className={`px-2.5 py-1 text-[11px] font-mono rounded font-semibold border ${
            isBulletTime
              ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
              : isSmashing
              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
              : isWhite
              ? 'bg-neutral-100 text-neutral-700 border-neutral-300'
              : 'bg-white/5 text-neutral-300 border-white/10'
          }`}>
            {isBulletTime
              ? 'BULLET-TIME FREEZE: MENTAL CALCULATION HUD'
              : isSmashing
              ? 'EXPLOSIVE SMASH: 418.5 KM/H IMPACT'
              : 'SERVE & TACTICAL RALLY'}
          </span>
          <span className={`text-[11px] font-mono ${isWhite ? 'text-neutral-500' : 'text-neutral-400'}`}>
            T + {currentTime.toFixed(2)}s / 6.00s
          </span>
        </div>

        {/* Speed multiplier selector */}
        <div className="absolute bottom-4 right-6 flex items-center gap-1">
          {[0.5, 1, 1.5].map((spd) => (
            <button
              key={spd}
              onClick={() => setSpeedMultiplier(spd)}
              className={`px-2 py-0.5 text-[10px] font-mono rounded cursor-pointer transition-colors ${
                speedMultiplier === spd
                  ? isWhite ? 'bg-neutral-900 text-white' : 'bg-white text-black font-bold'
                  : isWhite ? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200' : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      {/* Scrubbing Timeline Bar */}
      <div className={`px-6 py-3 border-t flex items-center gap-4 text-xs font-mono ${
        isWhite ? 'border-neutral-200 bg-neutral-50' : 'border-white/10 bg-[#07070a]'
      }`}>
        <span className={isWhite ? 'text-neutral-500' : 'text-neutral-400'}>Timeline Scrub:</span>
        <input
          type="range"
          min="0"
          max={LOOP_DURATION}
          step="0.05"
          value={currentTime}
          onChange={(e) => setCurrentTime(parseFloat(e.target.value))}
          className="flex-1 accent-cyan-500 cursor-pointer"
        />
        <span className="tabular-nums font-bold text-cyan-500">
          {currentTime.toFixed(2)}s
        </span>
      </div>

      {/* Physics & Mental Calculation Explainer Footer */}
      <div className={`p-6 border-t grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono ${
        isWhite ? 'border-neutral-200 bg-white text-neutral-700' : 'border-white/10 bg-[#060608] text-neutral-300'
      }`}>
        <div>
          <div className="font-bold uppercase mb-1 text-cyan-500 flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5" />
            01. Aerodynamic Parabola
          </div>
          <p className="font-light leading-relaxed">
            Unlike tennis balls, the conical feathered skirt creates high drag ($C_d \approx 0.58$),
            steepening the descent angle into an unreturnable drop.
          </p>
        </div>

        <div>
          <div className="font-bold uppercase mb-1 text-amber-500 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            02. Bullet-Time Freeze
          </div>
          <p className="font-light leading-relaxed">
            During mid-air jump suspension, quantum probability state amplitudes evaluate court coverage,
            calculating down-the-line corner vectors with 99.2% ace likelihood.
          </p>
        </div>

        <div>
          <div className="font-bold uppercase mb-1 text-emerald-500 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            03. Explosive Kinetic Transfer
          </div>
          <p className="font-light leading-relaxed">
            Terminal racket head speed generates an explosive 418.5 km/h smash velocity, crossing the
            13.4m court in under 120 milliseconds.
          </p>
        </div>
      </div>

    </div>
  );
};
