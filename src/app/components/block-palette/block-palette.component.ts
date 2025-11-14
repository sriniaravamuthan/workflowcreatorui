import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BlockType, BlockTemplateFactory, BLOCK_TYPE_METADATA } from '@app/models/workflow-block.model';

interface PaletteBlock {
  type: BlockType;
  label: string;
  icon: string;
  color: string;
  description: string;
}

@Component({
  selector: 'app-block-palette',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './block-palette.component.html',
  styleUrls: ['./block-palette.component.css']
})
export class BlockPaletteComponent {
  paletteBlocks: PaletteBlock[] = [];
  expandedCategories: Set<string> = new Set(['control-flow', 'operations', 'advanced']);

  constructor() {
    this.initializePaletteBlocks();
  }

  private initializePaletteBlocks() {
    const metadata = BLOCK_TYPE_METADATA;

    // Group blocks by category
    this.paletteBlocks = [
      // Control Flow
      { type: BlockType.START, label: metadata[BlockType.START].label, icon: metadata[BlockType.START].icon, color: metadata[BlockType.START].color, description: metadata[BlockType.START].description },
      { type: BlockType.END, label: metadata[BlockType.END].label, icon: metadata[BlockType.END].icon, color: metadata[BlockType.END].color, description: metadata[BlockType.END].description },
      { type: BlockType.DECISION, label: metadata[BlockType.DECISION].label, icon: metadata[BlockType.DECISION].icon, color: metadata[BlockType.DECISION].color, description: metadata[BlockType.DECISION].description },
      { type: BlockType.PARALLEL, label: metadata[BlockType.PARALLEL].label, icon: metadata[BlockType.PARALLEL].icon, color: metadata[BlockType.PARALLEL].color, description: metadata[BlockType.PARALLEL].description },
      { type: BlockType.GATE, label: metadata[BlockType.GATE].label, icon: metadata[BlockType.GATE].icon, color: metadata[BlockType.GATE].color, description: metadata[BlockType.GATE].description },

      // Operations
      { type: BlockType.ORDER, label: metadata[BlockType.ORDER].label, icon: metadata[BlockType.ORDER].icon, color: metadata[BlockType.ORDER].color, description: metadata[BlockType.ORDER].description },
      { type: BlockType.TASK, label: metadata[BlockType.TASK].label, icon: metadata[BlockType.TASK].icon, color: metadata[BlockType.TASK].color, description: metadata[BlockType.TASK].description },
      { type: BlockType.INSTRUCTION, label: metadata[BlockType.INSTRUCTION].label, icon: metadata[BlockType.INSTRUCTION].icon, color: metadata[BlockType.INSTRUCTION].color, description: metadata[BlockType.INSTRUCTION].description },

      // Advanced
      { type: BlockType.WAIT_EVENT, label: metadata[BlockType.WAIT_EVENT].label, icon: metadata[BlockType.WAIT_EVENT].icon, color: metadata[BlockType.WAIT_EVENT].color, description: metadata[BlockType.WAIT_EVENT].description },
      { type: BlockType.TIMER, label: metadata[BlockType.TIMER].label, icon: metadata[BlockType.TIMER].icon, color: metadata[BlockType.TIMER].color, description: metadata[BlockType.TIMER].description },
      { type: BlockType.SUBFLOW, label: metadata[BlockType.SUBFLOW].label, icon: metadata[BlockType.SUBFLOW].icon, color: metadata[BlockType.SUBFLOW].color, description: metadata[BlockType.SUBFLOW].description }
    ];
  }

  get categories() {
    return [
      {
        name: 'Control Flow',
        id: 'control-flow',
        blocks: this.paletteBlocks.slice(0, 5)
      },
      {
        name: 'Operations',
        id: 'operations',
        blocks: this.paletteBlocks.slice(5, 8)
      },
      {
        name: 'Advanced',
        id: 'advanced',
        blocks: this.paletteBlocks.slice(8)
      }
    ];
  }

  toggleCategory(categoryId: string) {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
    }
  }

  isCategoryExpanded(categoryId: string): boolean {
    return this.expandedCategories.has(categoryId);
  }

  createBlockTemplate(type: BlockType) {
    return BlockTemplateFactory.createBlock(type, { x: 0, y: 0 });
  }
}
