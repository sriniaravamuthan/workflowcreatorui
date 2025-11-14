/**
 * Workflow Block Models - Based on Business Guidelines
 * Defines the domain-specific blocks for building workflows
 */

export enum BlockType {
  START = 'start',
  END = 'end',
  ORDER = 'order',
  TASK = 'task',
  INSTRUCTION = 'instruction',
  DECISION = 'decision',
  PARALLEL = 'parallel',
  WAIT_EVENT = 'wait-event',
  TIMER = 'timer',
  SUBFLOW = 'subflow',
  GATE = 'gate'
}

export interface Position {
  x: number;
  y: number;
}

export interface BlockConfig {
  [key: string]: any;
}

export interface WorkflowBlock {
  id: string;
  type: BlockType;
  label: string;
  position: Position;
  config: BlockConfig;
  inputs?: string[];
  outputs?: string[];
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  blocks: WorkflowBlock[];
  connections: WorkflowConnection[];
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowConnection {
  id: string;
  fromBlockId: string;
  toBlockId: string;
  label?: string;
  condition?: string;
}

/**
 * Block Type Metadata
 */
export const BLOCK_TYPE_METADATA: Record<BlockType, {
  label: string;
  icon: string;
  color: string;
  description: string;
  hasInputs: boolean;
  hasOutputs: boolean;
}> = {
  [BlockType.START]: {
    label: 'Start',
    icon: 'play_circle',
    color: '#4CAF50',
    description: 'Workflow entry point',
    hasInputs: false,
    hasOutputs: true
  },
  [BlockType.END]: {
    label: 'End',
    icon: 'stop_circle',
    color: '#f44336',
    description: 'Workflow exit point',
    hasInputs: true,
    hasOutputs: false
  },
  [BlockType.ORDER]: {
    label: 'Order',
    icon: 'shopping_cart',
    color: '#2196F3',
    description: 'Create or manage an order',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.TASK]: {
    label: 'Task',
    icon: 'assignment',
    color: '#FF9800',
    description: 'Assign task to resource',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.INSTRUCTION]: {
    label: 'Instruction',
    icon: 'description',
    color: '#9C27B0',
    description: 'Provide structured instruction',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.DECISION]: {
    label: 'Decision',
    icon: 'branch',
    color: '#FFC107',
    description: 'Branch workflow based on condition',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.PARALLEL]: {
    label: 'Parallel',
    icon: 'call_split',
    color: '#00BCD4',
    description: 'Execute multiple paths simultaneously',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.WAIT_EVENT]: {
    label: 'Wait/Event',
    icon: 'hourglass_empty',
    color: '#E91E63',
    description: 'Wait for specific event',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.TIMER]: {
    label: 'Timer',
    icon: 'timer',
    color: '#673AB7',
    description: 'Wait for time duration',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.SUBFLOW]: {
    label: 'Subflow',
    icon: 'call_made',
    color: '#4DB8FF',
    description: 'Call another workflow',
    hasInputs: true,
    hasOutputs: true
  },
  [BlockType.GATE]: {
    label: 'Gate/Checkpoint',
    icon: 'security',
    color: '#8D6E63',
    description: 'Enforce gate/checkpoint rules',
    hasInputs: true,
    hasOutputs: true
  }
};

/**
 * Block Template Factory
 */
export class BlockTemplateFactory {
  static createBlock(type: BlockType, position: Position): WorkflowBlock {
    const metadata = BLOCK_TYPE_METADATA[type];
    return {
      id: this.generateId(),
      type,
      label: metadata.label,
      position,
      config: this.getDefaultConfig(type),
      inputs: metadata.hasInputs ? ['input'] : undefined,
      outputs: metadata.hasOutputs ? ['output'] : undefined
    };
  }

  static getDefaultConfig(type: BlockType): BlockConfig {
    switch (type) {
      case BlockType.ORDER:
        return {
          orderId: '',
          orderType: '',
          priority: 'normal'
        };
      case BlockType.TASK:
        return {
          taskName: '',
          assignedTo: '',
          dueDate: null,
          priority: 'normal'
        };
      case BlockType.INSTRUCTION:
        return {
          instructionText: '',
          tags: [],
          blocking: false
        };
      case BlockType.DECISION:
        return {
          condition: '',
          trueBranch: 'Yes',
          falseBranch: 'No'
        };
      case BlockType.TIMER:
        return {
          duration: 0,
          unit: 'seconds'
        };
      case BlockType.WAIT_EVENT:
        return {
          eventType: '',
          timeout: null
        };
      case BlockType.PARALLEL]:
        return {
          joinType: 'all'
        };
      case BlockType.SUBFLOW:
        return {
          subflowId: '',
          parameters: {}
        };
      case BlockType.GATE:
        return {
          gateType: '',
          condition: ''
        };
      default:
        return {};
    }
  }

  private static generateId(): string {
    return `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
