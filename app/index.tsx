import { WhiteboardCanvas } from '../components/Canvas';
import { useDrawing } from '../hooks/useDrawing';

export default function HomeScreen() {
  const { strokes, activeStroke, onTouchStart, onTouchMove, onTouchEnd } = useDrawing();

  return (
    <WhiteboardCanvas
      strokes={strokes}
      activeStroke={activeStroke}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    />
  );
}
