import { useCallback, useRef, useState } from 'react';
import { Stroke, ActiveStroke, DrawingTool, Point } from '../types';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TOOL: DrawingTool = {
  color: '#1A1A1A',
  width: 4,
  isEraser: false,
};

const LOCAL_USER_ID = 'local-user';

export function useDrawing() {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [activeStroke, setActiveStroke] = useState<ActiveStroke | null>(null);
  const [tool, setTool] = useState<DrawingTool>(DEFAULT_TOOL);

  // Ref avoids stale closure inside gesture callbacks — mutated synchronously,
  // state set separately to trigger re-render.
  const activeStrokeRef = useRef<ActiveStroke | null>(null);

  const onTouchStart = useCallback((x: number, y: number) => {
    const newStroke: ActiveStroke = {
      id: uuidv4(),
      userId: LOCAL_USER_ID,
      points: [{ x, y }],
      color: tool.color,
      width: tool.width,
      isEraser: tool.isEraser,
    };
    activeStrokeRef.current = newStroke;
    setActiveStroke(newStroke);
  }, [tool]);

  const onTouchMove = useCallback((x: number, y: number) => {
    if (!activeStrokeRef.current) return;
    const updated: ActiveStroke = {
      ...activeStrokeRef.current,
      points: [...activeStrokeRef.current.points, { x, y }],
    };
    activeStrokeRef.current = updated;
    setActiveStroke(updated);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!activeStrokeRef.current) return;
    const committed: Stroke = { ...activeStrokeRef.current };
    setStrokes(prev => [...prev, committed]);
    activeStrokeRef.current = null;
    setActiveStroke(null);
  }, []);

  // Stubs — wired in Checkpoint 4
  const addRemoteStrokeStart = useCallback((_stroke: ActiveStroke) => {}, []);
  const addRemoteStrokePoint = useCallback((_strokeId: string, _point: Point) => {}, []);
  const commitRemoteStroke = useCallback((_strokeId: string) => {}, []);

  const removeStroke = useCallback((strokeId: string) => {
    setStrokes(prev => prev.filter(s => s.id !== strokeId));
  }, []);

  const clearAll = useCallback(() => {
    setStrokes([]);
    setActiveStroke(null);
    activeStrokeRef.current = null;
  }, []);

  const undo = useCallback(() => {
    setStrokes(prev => {
      // Find the last stroke by this user and remove it
      const lastOwnIndex = [...prev].reverse().findIndex(s => s.userId === LOCAL_USER_ID);
      if (lastOwnIndex === -1) return prev;
      const actualIndex = prev.length - 1 - lastOwnIndex;
      return prev.filter((_, i) => i !== actualIndex);
    });
  }, []);

  const clear = useCallback(() => {
    setStrokes([]);
    setActiveStroke(null);
    activeStrokeRef.current = null;
  }, []);

  return {
    strokes,
    activeStroke,
    tool,
    setTool,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    addRemoteStrokeStart,
    addRemoteStrokePoint,
    commitRemoteStroke,
    removeStroke,
    clearAll,
    undo,
    clear,
  };
}
