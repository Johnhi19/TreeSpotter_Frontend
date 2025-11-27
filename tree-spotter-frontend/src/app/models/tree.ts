export interface Position {
    x: number;
    y: number;
  }
  
export interface Tree {
    age: number;
    plantDate: Date | null;
    id: number;
    meadowId: number;
    position: Position;
    type: string;
    _id: string;
  }
  