import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { WorkflowBlock, WorkflowDefinition, BlockType, BLOCK_TYPE_METADATA } from '@app/models/workflow-block.model';

@Component({
  selector: 'app-workflow-canvas',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './workflow-canvas.component.html',
  styleUrls: ['./workflow-canvas.component.css']
})
export class WorkflowCanvasComponent implements OnInit {
  @Input() workflow: WorkflowDefinition;
  @Output() blockSelected = new EventEmitter<WorkflowBlock>();
  @Output() blockDropped = new EventEmitter<{ block: WorkflowBlock; position: { x: number; y: number } }>();
  @Output() blockRemoved = new EventEmitter<WorkflowBlock>();

  selectedBlock: WorkflowBlock | null = null;
  canvasScale = 1;
  panX = 0;
  panY = 0;
  isDraggingCanvas = false;
  dragStartX = 0;
  dragStartY = 0;

  ngOnInit() {
    if (!this.workflow) {
      this.workflow = {
        id: 'new-workflow',
        name: 'New Workflow',
        description: '',
        blocks: [],
        connections: [],
        version: '1.0',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
  }

  onBlockDropped(event: CdkDragDrop<any>) {
    const block = event.item.data;
    const rect = (event.container.element as HTMLElement).getBoundingClientRect();
    const x = (event.currentOffset.x - this.panX) / this.canvasScale;
    const y = (event.currentOffset.y - this.panY) / this.canvasScale;

    const newBlock = { ...block, position: { x, y } };
    this.blockDropped.emit({ block: newBlock, position: { x, y } });
  }

  selectBlock(block: WorkflowBlock, event: MouseEvent) {
    event.stopPropagation();
    this.selectedBlock = block;
    this.blockSelected.emit(block);
  }

  deleteBlock(block: WorkflowBlock, event: MouseEvent) {
    event.stopPropagation();
    this.blockRemoved.emit(block);
    if (this.selectedBlock?.id === block.id) {
      this.selectedBlock = null;
    }
  }

  getBlockColor(type: BlockType): string {
    return BLOCK_TYPE_METADATA[type].color;
  }

  getBlockIcon(type: BlockType): string {
    return BLOCK_TYPE_METADATA[type].icon;
  }

  /**
   * Canvas pan and zoom controls
   */
  onCanvasMouseDown(event: MouseEvent) {
    if (event.button === 2 || event.ctrlKey) { // Right click or Ctrl+Left click
      this.isDraggingCanvas = true;
      this.dragStartX = event.clientX - this.panX;
      this.dragStartY = event.clientY - this.panY;
      event.preventDefault();
    }
  }

  onCanvasMouseMove(event: MouseEvent) {
    if (this.isDraggingCanvas) {
      this.panX = event.clientX - this.dragStartX;
      this.panY = event.clientY - this.dragStartY;
    }
  }

  onCanvasMouseUp() {
    this.isDraggingCanvas = false;
  }

  onCanvasWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? 0.9 : 1.1;
    this.canvasScale *= delta;
    this.canvasScale = Math.max(0.5, Math.min(3, this.canvasScale));
  }

  onCanvasClick() {
    this.selectedBlock = null;
  }

  getBlockPosition(blockId: string) {
    return this.workflow.blocks.find(b => b.id === blockId)?.position;
  }
}
