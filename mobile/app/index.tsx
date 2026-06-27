import { View, StyleSheet } from 'react-native';
import { WhiteboardCanvas } from '../components/Canvas';
import { Toolbar } from '../components/Toolbar';
import { useDrawing } from '../hooks/useDrawing';

export default function HomeScreen() {
  const {
    strokes,
    activeStroke,
    tool,
    setTool,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    undo,
    clear,
  } = useDrawing();

  return (
    <View style={styles.container}>
      <WhiteboardCanvas
        strokes={strokes}
        activeStroke={activeStroke}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      <Toolbar
        tool={tool}
        onToolChange={(update) => setTool(prev => ({ ...prev, ...update }))}
        onUndo={undo}
        onClear={clear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
