export interface Position {
    x: number;
    y: number;
  }
  
export interface Tree {
    plantDate: Date | null;
    meadowId: number;
    position: Position;
    type: string;
    _id: number;
  }
  