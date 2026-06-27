import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Stroke, ActiveStroke } from '../types';

const CANVAS_BACKGROUND = '#FFFFFF';

interface CanvasProps {
  strokes: Stroke[];
  activeStroke: ActiveStroke | null;
  onTouchStart: (x: number, y: number) => void;
  onTouchMove: (x: number, y: number) => void;
  onTouchEnd: () => void;
}

function buildSkiaPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return null;
  const path = Skia.Path.Make();
  path.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    path.lineTo(points[i].x, points[i].y);
  }
  return path;
}

function StrokePath({ stroke }: { stroke: Stroke | ActiveStroke }) {
  const path = buildSkiaPath(stroke.points);
  if (!path || stroke.points.length < 2) return null;
  return (
    <Path
      path={path}
      color={stroke.isEraser ? CANVAS_BACKGROUND : stroke.color}
      style="stroke"
      strokeWidth={stroke.width}
      strokeCap="round"
      strokeJoin="round"
    />
  );
}

export function WhiteboardCanvas({
  strokes,
  activeStroke,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: CanvasProps) {
  // runOnJS(true) routes gesture callbacks to the JS thread where React state lives.
  // The default Reanimated worklet mode cannot call setState directly.
  const pan = Gesture.Pan()
    .runOnJS(true)
    .minDistance(0)
    .onStart(e => onTouchStart(e.x, e.y))
    .onUpdate(e => onTouchMove(e.x, e.y))
    .onEnd(() => onTouchEnd());

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
        <Canvas style={styles.canvas}>
          {strokes.map(stroke => (
            <StrokePath key={stroke.id} stroke={stroke} />
          ))}
          {activeStroke && <StrokePath stroke={activeStroke} />}
        </Canvas>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CANVAS_BACKGROUND,
  },
  canvas: {
    flex: 1,
  },
});
