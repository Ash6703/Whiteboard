import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { DrawingTool } from '../types';

const COLORS = [
  '#1A1A1A', // near-black (default)
  '#E53935', // red
  '#1E88E5', // blue
  '#43A047', // green
  '#FB8C00', // orange
  '#8E24AA', // purple
  '#FFD600', // yellow
  '#00ACC1', // cyan
];

const WIDTHS = [
  { label: 'S', value: 2 },
  { label: 'M', value: 5 },
  { label: 'L', value: 12 },
];

interface ToolbarProps {
  tool: DrawingTool;
  onToolChange: (update: Partial<DrawingTool>) => void;
  onUndo: () => void;
  onClear: () => void;
}

export function Toolbar({ tool, onToolChange, onUndo, onClear }: ToolbarProps) {
  const handleClear = () => {
    Alert.alert(
      'Clear Board',
      'Remove all strokes? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: onClear },
      ]
    );
  };

  return (
    <View style={styles.toolbar}>
      {/* Colour swatches */}
      <View style={styles.section}>
        {COLORS.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorSwatch,
              { backgroundColor: color },
              tool.color === color && !tool.isEraser && styles.selectedSwatch,
            ]}
            onPress={() => onToolChange({ color, isEraser: false })}
          />
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stroke width */}
      <View style={styles.section}>
        {WIDTHS.map(({ label, value }) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.widthButton,
              tool.width === value && !tool.isEraser && styles.selectedWidth,
            ]}
            onPress={() => onToolChange({ width: value, isEraser: false })}
          >
            <Text style={styles.widthLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Eraser */}
      <TouchableOpacity
        style={[styles.actionButton, tool.isEraser && styles.selectedAction]}
        onPress={() => onToolChange({ isEraser: !tool.isEraser })}
      >
        <Text style={styles.actionLabel}>⌫</Text>
      </TouchableOpacity>

      {/* Undo */}
      <TouchableOpacity style={styles.actionButton} onPress={onUndo}>
        <Text style={styles.actionLabel}>↩</Text>
      </TouchableOpacity>

      {/* Clear */}
      <TouchableOpacity style={styles.actionButton} onPress={handleClear}>
        <Text style={styles.actionLabel}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    height: 64,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 6,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedSwatch: {
    borderColor: '#1A1A1A',
    borderWidth: 2,
    transform: [{ scale: 1.2 }],
  },
  widthButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  selectedWidth: {
    backgroundColor: '#1A1A1A',
  },
  widthLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  selectedAction: {
    backgroundColor: '#1A1A1A',
  },
  actionLabel: {
    fontSize: 16,
  },
});
