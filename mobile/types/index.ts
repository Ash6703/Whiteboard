export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  userId: string;
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

export interface ActiveStroke {
  id: string;
  userId: string;
  points: Point[];
  color: string;
  width: number;
  isEraser: boolean;
}

export interface DrawingTool {
  color: string;
  width: number;
  isEraser: boolean;
}
