import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { Stroke } from '../types/character';

export interface DrawingCanvasHandle {
  clear: () => void;
  undo: () => void;
  getStrokes: () => Stroke[];
}

interface DrawingCanvasProps {
  size?: number;
  guideStrokes?: Stroke[];
  onStrokesChange?: (strokes: Stroke[]) => void;
}

const GRID = 100;

function toGridPoint(clientX: number, clientY: number, rect: DOMRect) {
  return {
    x: ((clientX - rect.left) / rect.width) * GRID,
    y: ((clientY - rect.top) / rect.height) * GRID,
  };
}

function drawStroke(ctx: CanvasRenderingContext2D, stroke: Stroke, scale: number, color: string, width: number) {
  if (stroke.length === 0) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(stroke[0].x * scale, stroke[0].y * scale);
  for (let i = 1; i < stroke.length; i++) {
    ctx.lineTo(stroke[i].x * scale, stroke[i].y * scale);
  }
  ctx.stroke();
}

export const DrawingCanvas = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
  ({ size = 320, guideStrokes, onStrokesChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const strokesRef = useRef<Stroke[]>([]);
    const currentStrokeRef = useRef<Stroke>([]);
    const [, forceRender] = useState(0);

    const scale = size / GRID;

    const redraw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      if (guideStrokes) {
        guideStrokes.forEach((stroke, idx) => {
          drawStroke(ctx, stroke, scale, 'rgba(120,120,140,0.35)', 3);
          if (stroke.length > 0) {
            const start = stroke[0];
            ctx.fillStyle = 'rgba(90,90,110,0.55)';
            ctx.beginPath();
            ctx.arc(start.x * scale, start.y * scale, 8, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'white';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(idx + 1), start.x * scale, start.y * scale);
          }
        });
      }

      for (const stroke of strokesRef.current) {
        drawStroke(ctx, stroke, scale, '#1a1a2e', 4);
      }
      if (currentStrokeRef.current.length > 0) {
        drawStroke(ctx, currentStrokeRef.current, scale, '#1a1a2e', 4);
      }
    };

    useEffect(redraw, [guideStrokes, size]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        strokesRef.current = [];
        currentStrokeRef.current = [];
        onStrokesChange?.([]);
        redraw();
        forceRender((n) => n + 1);
      },
      undo: () => {
        strokesRef.current = strokesRef.current.slice(0, -1);
        onStrokesChange?.(strokesRef.current);
        redraw();
        forceRender((n) => n + 1);
      },
      getStrokes: () => strokesRef.current,
    }));

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.setPointerCapture(e.pointerId);
      const rect = canvas.getBoundingClientRect();
      currentStrokeRef.current = [toGridPoint(e.clientX, e.clientY, rect)];
      redraw();
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (currentStrokeRef.current.length === 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      currentStrokeRef.current = [...currentStrokeRef.current, toGridPoint(e.clientX, e.clientY, rect)];
      redraw();
    };

    const finishStroke = () => {
      if (currentStrokeRef.current.length > 1) {
        strokesRef.current = [...strokesRef.current, currentStrokeRef.current];
        onStrokesChange?.(strokesRef.current);
      }
      currentStrokeRef.current = [];
      redraw();
    };

    return (
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="drawing-canvas"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishStroke}
        onPointerLeave={finishStroke}
      />
    );
  },
);

DrawingCanvas.displayName = 'DrawingCanvas';
