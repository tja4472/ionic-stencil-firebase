export interface Gizmo {
    readonly description: string;
    readonly id: string;
    readonly name: string;
  }
  
  export function newGizmo(): Gizmo {
    return { description: '', id: '', name: '' };
  }
  