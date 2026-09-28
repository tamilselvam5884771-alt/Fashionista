import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, Camera, Sun, User } from 'lucide-react';

interface GarmentCanvas3DProps {
  gender: 'female' | 'male';
  category: string;
  neckline: string;
  sleeve: string;
  hem: string;
  fabric: string;
  color: string;
  cameraAngle: 'front' | 'side' | 'back';
  onCameraAngleChange: (angle: 'front' | 'side' | 'back') => void;
}

export const GarmentCanvas3D: React.FC<GarmentCanvas3DProps> = ({
  gender,
  category,
  neckline,
  sleeve,
  hem,
  fabric,
  color,
  cameraAngle,
  onCameraAngleChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-Rotation state
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Target rotation angle based on camera view preset
  useEffect(() => {
    if (cameraAngle === 'front') setRotationAngle(0);
    else if (cameraAngle === 'side') setRotationAngle(Math.PI / 2);
    else if (cameraAngle === 'back') setRotationAngle(Math.PI);
  }, [cameraAngle]);

  // Animation Loop for Auto-Rotation
  useEffect(() => {
    let animId: number;
    const animate = () => {
      if (autoRotate) {
        setRotationAngle((prev) => (prev + 0.008) % (Math.PI * 2));
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate]);

  // Main 3D Canvas Render Loop (Full Human Body Mannequin)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const centerX = width / 2;
    const centerY = height / 2 + 10;

    // 1. Luxury Showroom Dark Backdrop
    ctx.clearRect(0, 0, width, height);

    const bgGradient = ctx.createRadialGradient(centerX, centerY - 80, 20, centerX, centerY, 440);
    bgGradient.addColorStop(0, '#1c1d32');
    bgGradient.addColorStop(0.5, '#10111d');
    bgGradient.addColorStop(1, '#07070b');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Showroom Metallic Pedestal Floor Base
    ctx.save();
    // Contact Floor Shadow
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 245, 150, 32, 0, 0, Math.PI * 2);
    const floorShadow = ctx.createRadialGradient(centerX, centerY + 245, 5, centerX, centerY + 245, 150);
    floorShadow.addColorStop(0, 'rgba(0, 0, 0, 0.88)');
    floorShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = floorShadow;
    ctx.fill();

    // Metallic Base Disc
    const baseGrad = ctx.createLinearGradient(centerX - 110, centerY + 225, centerX + 110, centerY + 225);
    baseGrad.addColorStop(0, '#2a2b3d');
    baseGrad.addColorStop(0.5, '#4a4b63');
    baseGrad.addColorStop(1, '#181926');

    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 225, 105, 22, 0, 0, Math.PI * 2);
    ctx.fillStyle = baseGrad;
    ctx.fill();
    ctx.strokeStyle = '#6b6c8a';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Chrome Support Rod under feet
    const poleGrad = ctx.createLinearGradient(centerX - 4, 0, centerX + 4, 0);
    poleGrad.addColorStop(0, '#3a3b4f');
    poleGrad.addColorStop(0.5, '#8a8ba8');
    poleGrad.addColorStop(1, '#2a2b3f');
    ctx.fillStyle = poleGrad;
    ctx.fillRect(centerX - 5, centerY + 190, 10, 35);
    ctx.restore();

    // 3. 3D Projection Helper
    const project3D = (x: number, y: number, z: number) => {
      const cosY = Math.cos(rotationAngle);
      const sinY = Math.sin(rotationAngle);
      const rx = x * cosY - z * sinY;
      const rz = x * sinY + z * cosY;

      const pitch = 0.12;
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);
      const ry = y * cosX - rz * sinX;
      const rz2 = y * sinX + rz * cosX;

      const fov = 580;
      const scale = fov / (fov + rz2);
      return {
        px: centerX + rx * scale,
        py: centerY + ry * scale,
        scale,
      };
    };

    const isMale = gender === 'male';

    // 4. Render Complete Full-Body Human Mannequin (Head, Neck, Torso, Arms, Hands, Legs, Feet)
    const renderFullHumanMannequin = () => {
      ctx.save();

      // Color Palette for Stylized Human Mannequin (Matte Slate / Pearl Chrome)
      const skinGrad = (px: number, py: number, r: number) => {
        const g = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, 2, px, py, r * 1.5);
        g.addColorStop(0, '#585a7d');
        g.addColorStop(0.5, '#2e3047');
        g.addColorStop(1, '#151624');
        return g;
      };

      // A. HEAD & FACIAL CONTOUR
      const headCenter = project3D(0, -195, 0);
      const headRadiusX = (isMale ? 18 : 15) * headCenter.scale;
      const headRadiusY = (isMale ? 25 : 22) * headCenter.scale;

      // Head Base
      ctx.beginPath();
      ctx.ellipse(headCenter.px, headCenter.py, headRadiusX, headRadiusY, 0, 0, Math.PI * 2);
      ctx.fillStyle = skinGrad(headCenter.px, headCenter.py, headRadiusY);
      ctx.fill();
      ctx.strokeStyle = '#6e7094';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Nose Contour Bridge Line
      const noseTop = project3D(0, -198, 14);
      const noseTip = project3D(0, -190, 18);
      ctx.beginPath();
      ctx.moveTo(noseTop.px, noseTop.py);
      ctx.lineTo(noseTip.px, noseTip.py);
      ctx.strokeStyle = '#8b8dae';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // B. NECK & COLLARBONES
      const neckTop = project3D(0, -170, 0);
      const neckBot = project3D(0, -145, 0);
      ctx.beginPath();
      ctx.moveTo(neckTop.px - (isMale ? 11 : 8), neckTop.py);
      ctx.lineTo(neckTop.px + (isMale ? 11 : 8), neckTop.py);
      ctx.lineTo(neckBot.px + (isMale ? 16 : 11), neckBot.py);
      ctx.lineTo(neckBot.px - (isMale ? 16 : 11), neckBot.py);
      ctx.closePath();
      ctx.fillStyle = '#26273c';
      ctx.fill();
      ctx.strokeStyle = '#4e5070';
      ctx.stroke();

      // Collarbone Line
      const collarL = project3D(-25, -142, 5);
      const collarR = project3D(25, -142, 5);
      ctx.beginPath();
      ctx.moveTo(collarL.px, collarL.py);
      ctx.lineTo(collarR.px, collarR.py);
      ctx.strokeStyle = '#6e7094';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // C. CHEST & TORSO (Female Bust / Male Pecs & Waist)
      const torsoLayers = 16;
      for (let i = 0; i < torsoLayers; i++) {
        const t = i / (torsoLayers - 1);
        const y = -140 + t * 140; // Upper torso to waist/hips

        let r = 32;
        if (isMale) {
          if (t < 0.2) r = 24 + (t / 0.2) * 34; // Broad shoulder width
          else if (t < 0.5) r = 58 - ((t - 0.2) / 0.3) * 24; // V-taper chest
          else if (t < 0.8) r = 34 + ((t - 0.5) / 0.3) * 10; // Male hips
          else r = 44 - ((t - 0.8) / 0.2) * 6;
        } else {
          if (t < 0.25) r = 20 + (t / 0.25) * 22; // Female chest
          else if (t < 0.5) r = 42 - ((t - 0.25) / 0.25) * 16; // Slender waist
          else if (t < 0.8) r = 26 + ((t - 0.5) / 0.3) * 22; // Female hips curve
          else r = 48 - ((t - 0.8) / 0.2) * 8;
        }

        ctx.beginPath();
        for (let a = 0; a <= 24; a++) {
          const ang = (a / 24) * Math.PI * 2;
          const px = Math.cos(ang) * r;
          const pz = Math.sin(ang) * r;
          const pt = project3D(px, y, pz);

          if (a === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }
        ctx.fillStyle = i % 2 === 0 ? '#1e1f30' : '#24253a';
        ctx.fill();
        ctx.strokeStyle = '#3d3f5c';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // D. ARMS, ELBOWS, FOREARMS & HANDS WITH FINGERS
      [-1, 1].forEach((dir) => {
        const shoulderX = dir * (isMale ? 56 : 42);

        // Upper Arm
        const shoulderPt = project3D(shoulderX, -135, 0);
        const elbowPt = project3D(dir * (isMale ? 64 : 50), -50, 5);
        ctx.beginPath();
        ctx.moveTo(shoulderPt.px, shoulderPt.py);
        ctx.lineTo(elbowPt.px, elbowPt.py);
        ctx.strokeStyle = '#32344c';
        ctx.lineWidth = (isMale ? 14 : 10) * shoulderPt.scale;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Elbow Joint Sphere
        ctx.beginPath();
        ctx.arc(elbowPt.px, elbowPt.py, (isMale ? 8 : 6) * elbowPt.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#484a6a';
        ctx.fill();

        // Forearm
        const wristPt = project3D(dir * (isMale ? 60 : 46), 25, 12);
        ctx.beginPath();
        ctx.moveTo(elbowPt.px, elbowPt.py);
        ctx.lineTo(wristPt.px, wristPt.py);
        ctx.strokeStyle = '#2d2e44';
        ctx.lineWidth = (isMale ? 11 : 8) * wristPt.scale;
        ctx.stroke();

        // Hand Palm & Tapered Fingers
        const handPt = project3D(dir * (isMale ? 60 : 46), 45, 15);
        ctx.beginPath();
        ctx.arc(handPt.px, handPt.py, (isMale ? 7 : 5) * handPt.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#585a7d';
        ctx.fill();

        // Fingers (Thumb, Index, Middle, Ring, Pinky)
        [-4, -1, 2, 5].forEach((fOffset) => {
          const fingerPt = project3D(dir * (isMale ? 60 : 46) + fOffset, 60, 18);
          ctx.beginPath();
          ctx.moveTo(handPt.px, handPt.py);
          ctx.lineTo(fingerPt.px, fingerPt.py);
          ctx.strokeStyle = '#6e7094';
          ctx.lineWidth = 2 * handPt.scale;
          ctx.stroke();
        });
      });

      // E. LEGS (THIGHS, KNEES, CALVES, ANKLES & FEET)
      [-1, 1].forEach((dir) => {
        const hipX = dir * (isMale ? 22 : 18);

        // Thigh
        const hipPt = project3D(hipX, 0, 0);
        const kneePt = project3D(dir * (isMale ? 20 : 16), 100, 0);
        ctx.beginPath();
        ctx.moveTo(hipPt.px, hipPt.py);
        ctx.lineTo(kneePt.px, kneePt.py);
        ctx.strokeStyle = '#28293d';
        ctx.lineWidth = (isMale ? 20 : 16) * hipPt.scale;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Knee Cap Sphere
        ctx.beginPath();
        ctx.arc(kneePt.px, kneePt.py, (isMale ? 9 : 7) * kneePt.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#4e5070';
        ctx.fill();

        // Calf & Ankle
        const anklePt = project3D(dir * (isMale ? 18 : 14), 185, 0);
        ctx.beginPath();
        ctx.moveTo(kneePt.px, kneePt.py);
        ctx.lineTo(anklePt.px, anklePt.py);
        ctx.strokeStyle = '#202133';
        ctx.lineWidth = (isMale ? 15 : 12) * kneePt.scale;
        ctx.stroke();

        // Foot & Toes on Pedestal
        const footTipPt = project3D(dir * (isMale ? 18 : 14), 195, 18);
        ctx.beginPath();
        ctx.moveTo(anklePt.px, anklePt.py);
        ctx.lineTo(footTipPt.px, footTipPt.py);
        ctx.strokeStyle = '#585a7d';
        ctx.lineWidth = (isMale ? 10 : 8) * anklePt.scale;
        ctx.stroke();
      });

      ctx.restore();
    };

    renderFullHumanMannequin();

    // 5. Render Customized Garment Mesh Over Human Mannequin
    const renderGarmentMesh = () => {
      ctx.save();

      // Hem Length Multipliers
      let hemLengthY = 80;
      if (hem === 'mini') hemLengthY = 45;
      else if (hem === 'midi') hemLengthY = 110;
      else if (hem === 'floor') hemLengthY = 175;

      // Sleeve Length Multipliers
      let sleeveLengthVal = 0;
      if (sleeve === 'short') sleeveLengthVal = 35;
      else if (sleeve === 'threequarter') sleeveLengthVal = 70;
      else if (sleeve === 'full') sleeveLengthVal = 105;

      // Neckline Cut Adjustments
      let neckCutDepth = 0;
      if (neckline === 'vneck') neckCutDepth = 28;
      else if (neckline === 'sweetheart') neckCutDepth = 24;
      else if (neckline === 'offshoulder') neckCutDepth = 35;
      else if (neckline === 'collar') neckCutDepth = -12;

      // Render Garment Layered Rings
      const garmentLayers = category === 'dress' || category === 'ethnic' ? 18 : 12;
      for (let i = 0; i < garmentLayers; i++) {
        const t = i / (garmentLayers - 1);
        const y = -135 + t * (110 + hemLengthY);

        let r = 35;
        if (isMale) {
          if (category === 'suit') {
            r = 58 - t * 18; // Broad male suit chest
          } else {
            r = 50 - t * 10;
          }
        } else {
          if (category === 'dress' || category === 'ethnic') {
            if (t < 0.3) r = 42 - t * 12;
            else r = 30 + (t - 0.3) * (hem === 'floor' ? 68 : 46); // Flared skirt
          } else if (category === 'suit') {
            r = 42 - t * 6;
          } else {
            r = 38 + (t < 0.5 ? t * 4 : (1 - t) * 6);
          }
        }

        ctx.beginPath();
        for (let a = 0; a <= 28; a++) {
          const ang = (a / 28) * Math.PI * 2;
          const px = Math.cos(ang) * r;
          const pz = Math.sin(ang) * r;

          let actualY = y;
          if (t < 0.2 && Math.cos(ang) > 0.25) {
            actualY += neckCutDepth;
          }

          const pt = project3D(px, actualY, pz);
          if (a === 0) ctx.moveTo(pt.px, pt.py);
          else ctx.lineTo(pt.px, pt.py);
        }

        // PBR Material Shading Fill
        const frontPt = project3D(r, y, 0);
        const fillGrad = ctx.createLinearGradient(frontPt.px - r, frontPt.py, frontPt.px + r, frontPt.py);

        fillGrad.addColorStop(0, color);
        fillGrad.addColorStop(0.5, fabric === 'silk' || fabric === 'velvet' ? '#ffffff66' : color);
        fillGrad.addColorStop(1, '#090a12');

        ctx.fillStyle = fillGrad;
        ctx.fill();
        ctx.strokeStyle = fabric === 'velvet' ? '#ffffff33' : '#00000044';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Render Garment Sleeves Over Arms
      if (sleeveLengthVal > 0) {
        [-1, 1].forEach((dir) => {
          ctx.beginPath();
          const sleeveSteps = 8;
          for (let s = 0; s < sleeveSteps; s++) {
            const st = s / (sleeveSteps - 1);
            const sx = dir * ((isMale ? 56 : 44) + st * 10);
            const sy = -130 + st * sleeveLengthVal;
            const sr = (isMale ? 19 : 15) - st * 4;

            for (let a = 0; a <= 12; a++) {
              const ang = (a / 12) * Math.PI * 2;
              const sp = project3D(sx + Math.cos(ang) * sr, sy, Math.sin(ang) * sr);
              if (a === 0) ctx.moveTo(sp.px, sp.py);
              else ctx.lineTo(sp.px, sp.py);
            }
          }
          ctx.fillStyle = color;
          ctx.fill();
          ctx.strokeStyle = '#00000033';
          ctx.stroke();
        });
      }

      ctx.restore();
    };

    renderGarmentMesh();
  }, [gender, category, neckline, sleeve, hem, fabric, color, rotationAngle]);

  return (
    <div className="relative w-full h-full bg-[#07070B] overflow-hidden select-none">
      {/* 3D Viewport Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Camera View Angle Buttons (Front, Side, Back) */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#12131C]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-2xl">
        <span className="text-[10px] font-mono text-slate-400 px-2 flex items-center gap-1">
          <Camera className="w-3.5 h-3.5 text-purple-400" /> View Angle:
        </span>

        <button
          onClick={() => {
            setAutoRotate(false);
            onCameraAngleChange('front');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-poppins font-bold transition-all ${
            cameraAngle === 'front' && !autoRotate
              ? 'bg-[#8B5CF6] text-white shadow-md'
              : 'hover:bg-white/10 text-slate-300'
          }`}
        >
          Front
        </button>

        <button
          onClick={() => {
            setAutoRotate(false);
            onCameraAngleChange('side');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-poppins font-bold transition-all ${
            cameraAngle === 'side' && !autoRotate
              ? 'bg-[#8B5CF6] text-white shadow-md'
              : 'hover:bg-white/10 text-slate-300'
          }`}
        >
          Side
        </button>

        <button
          onClick={() => {
            setAutoRotate(false);
            onCameraAngleChange('back');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-poppins font-bold transition-all ${
            cameraAngle === 'back' && !autoRotate
              ? 'bg-[#8B5CF6] text-white shadow-md'
              : 'hover:bg-white/10 text-slate-300'
          }`}
        >
          Back
        </button>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-xl text-xs font-poppins font-bold flex items-center gap-1 transition-all ${
            autoRotate ? 'bg-[#E05297] text-white' : 'hover:bg-white/10 text-slate-300'
          }`}
          title="Toggle Auto-Spin 360°"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">360° Spin</span>
        </button>
      </div>

      {/* Full Human Mannequin Status Badge */}
      <div className="absolute top-4 right-4 z-10 bg-[#12131C]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-slate-300 flex items-center gap-2 shadow-xl">
        <User className="w-3.5 h-3.5 text-purple-400" />
        <span>Full Human Anatomy: <strong className="text-white font-poppins uppercase">{gender}</strong> (Head, Chest, Arms, Hands, Legs, Feet)</span>
        <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse ml-1" />
      </div>

      {/* Footer Helper */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-[#12131C]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-slate-400 pointer-events-none">
        Full human mannequin with head, chest, arms, hands, fingers, legs & feet ✨
      </div>
    </div>
  );
};

export default GarmentCanvas3D;
