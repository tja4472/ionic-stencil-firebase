export interface Task {
    readonly id: string;
    readonly name: string;
    readonly sysDateCreated: string;
    readonly sysDateUpdated: string;
  }
  
  export function newTodo(): Task {
    return {
      id: '',
      name: '',
      sysDateCreated: '',
      sysDateUpdated: '',
    };
  }
  