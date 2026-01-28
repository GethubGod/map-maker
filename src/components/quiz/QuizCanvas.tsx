import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import type { Point } from '../../models/Region';
import type { CustomMap } from '../../models/Map';
import type { Region } from '../../models/Region';
import { denormalizePoint, normalizePoint } from '../../utils/coordinateUtils';

interface QuizCanvasProps {
  map: CustomMap;
  onPinPlaced: (point: Point) => void;
  correctRegion?: Region;
  showFeedback?: boolean;
  disabled?: boolean;
}

export default function QuizCanvas({
  map,
  onPinPlaced,
  correctRegion,
  showFeedback = false,
  disabled = false,
}: QuizCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const onPinPlacedRef = useRef(onPinPlaced);
  const disabledRef = useRef(disabled);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    onPinPlacedRef.current = onPinPlaced;
  }, [onPinPlaced]);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      selection: false,
    });

    fabricCanvasRef.current = canvas;

    // Load background image
    fabric.Image.fromURL(map.imageData, (img) => {
      if (!img) return;

      // Scale image to fit canvas
      const scale = Math.min(
        canvas.width! / (img.width || 1),
        canvas.height! / (img.height || 1)
      );

      img.scale(scale);
      img.set({
        left: (canvas.width! - (img.width || 0) * scale) / 2,
        top: (canvas.height! - (img.height || 0) * scale) / 2,
        selectable: false,
        evented: false,
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      setIsLoaded(true);
    });

    // Handle canvas clicks
    canvas.on('mouse:down', (event) => {
      if (disabledRef.current || !event.pointer) return;

      const pointer = event.pointer;
      const normalizedPoint = normalizePoint(
        { x: pointer.x, y: pointer.y },
        canvas.width!,
        canvas.height!
      );

      onPinPlacedRef.current(normalizedPoint);

      // Add pin marker
      addPinMarker(canvas, pointer.x, pointer.y);
    });

    return () => {
      canvas.dispose();
    };
  }, [map.imageData]);

  // Show feedback when answer is checked
  useEffect(() => {
    if (!fabricCanvasRef.current || !showFeedback || !correctRegion) return;

    const canvas = fabricCanvasRef.current;

    // Highlight correct region
    const denormalizedPolygon = correctRegion.polygon.map((p) =>
      denormalizePoint(p, canvas.width!, canvas.height!)
    );

    const polygon = new fabric.Polygon(
      denormalizedPolygon.map((p) => ({ x: p.x, y: p.y })),
      {
        fill: 'rgba(34, 197, 94, 0.3)', // green overlay
        stroke: '#22c55e',
        strokeWidth: 3,
        selectable: false,
        evented: false,
      }
    );

    canvas.add(polygon);
    canvas.renderAll();

    return () => {
      canvas.remove(polygon);
    };
  }, [showFeedback, correctRegion]);

  return (
    <div className="relative">
      <canvas ref={canvasRef} className="border border-gray-300 rounded-lg shadow-md" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-gray-500">Loading map...</div>
        </div>
      )}
    </div>
  );
}

// Helper function to add a pin marker to the canvas
function addPinMarker(canvas: fabric.Canvas, x: number, y: number) {
  const circle = new fabric.Circle({
    left: x - 10,
    top: y - 10,
    radius: 10,
    fill: '#3b82f6',
    stroke: '#1e40af',
    strokeWidth: 2,
    selectable: false,
    evented: false,
  });

  canvas.add(circle);
  canvas.renderAll();
}
