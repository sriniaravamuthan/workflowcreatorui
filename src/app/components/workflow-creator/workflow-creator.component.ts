import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowBlock, WorkflowDefinition, BlockTemplateFactory, BlockType } from '@app/models/workflow-block.model';
import { WorkflowCanvasComponent } from '../workflow-canvas/workflow-canvas.component';
import { BlockPaletteComponent } from '../block-palette/block-palette.component';
import { BlockInspectorComponent } from '../block-inspector/block-inspector.component';

@Component({
  selector: 'app-workflow-creator',
  standalone: true,
  imports: [
    CommonModule,
    WorkflowCanvasComponent,
    BlockPaletteComponent,
    BlockInspectorComponent
  ],
  templateUrl: './workflow-creator.component.html',
  styleUrls: ['./workflow-creator.component.css']
})
export class WorkflowCreatorComponent implements OnInit {
  workflow: WorkflowDefinition;
  selectedBlock: WorkflowBlock | null = null;
  workflowName = 'New Workflow';
  workflowDescription = '';
  showStats = false;

  constructor() {
    this.workflow = {
      id: 'workflow-' + Date.now(),
      name: 'New Workflow',
      description: '',
      blocks: [],
      connections: [],
      version: '1.0',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  ngOnInit() {
    // Initialize with a Start block
    const startBlock = BlockTemplateFactory.createBlock(BlockType.START, { x: 100, y: 100 });
    this.workflow.blocks.push(startBlock);
  }

  onBlockSelected(block: WorkflowBlock) {
    this.selectedBlock = block;
  }

  onBlockDropped(event: { block: WorkflowBlock; position: { x: number; y: number } }) {
    // Check if block with same id already exists (update position)
    const existingIndex = this.workflow.blocks.findIndex(b => b.id === event.block.id);

    if (existingIndex >= 0) {
      this.workflow.blocks[existingIndex].position = event.position;
    } else {
      // Add new block
      const newBlock = { ...event.block, position: event.position };
      this.workflow.blocks.push(newBlock);
    }

    this.workflow.updatedAt = new Date();
  }

  onBlockRemoved(block: WorkflowBlock) {
    // Remove block
    const index = this.workflow.blocks.findIndex(b => b.id === block.id);
    if (index >= 0) {
      this.workflow.blocks.splice(index, 1);
    }

    // Remove connections involving this block
    this.workflow.connections = this.workflow.connections.filter(
      c => c.fromBlockId !== block.id && c.toBlockId !== block.id
    );

    this.workflow.updatedAt = new Date();
  }

  onBlockConfigChanged(block: WorkflowBlock) {
    const index = this.workflow.blocks.findIndex(b => b.id === block.id);
    if (index >= 0) {
      this.workflow.blocks[index] = block;
    }
    this.workflow.updatedAt = new Date();
  }

  saveWorkflow() {
    this.workflow.name = this.workflowName;
    this.workflow.description = this.workflowDescription;
    this.workflow.updatedAt = new Date();

    // In a real application, you would send this to a backend
    console.log('Workflow saved:', this.workflow);
    localStorage.setItem(`workflow_${this.workflow.id}`, JSON.stringify(this.workflow));

    alert('Workflow saved successfully!');
  }

  exportWorkflow() {
    const dataStr = JSON.stringify(this.workflow, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.workflowName.replace(/\s+/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  importWorkflow(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const imported = JSON.parse(e.target.result) as WorkflowDefinition;
          this.workflow = imported;
          this.workflowName = imported.name;
          this.workflowDescription = imported.description;
          alert('Workflow imported successfully!');
        } catch (error) {
          alert('Error importing workflow. Please ensure it is a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  }

  clearWorkflow() {
    if (confirm('Are you sure you want to clear the workflow? This cannot be undone.')) {
      this.workflow.blocks = [];
      this.workflow.connections = [];
      this.selectedBlock = null;
      this.workflow.updatedAt = new Date();
    }
  }

  toggleStats() {
    this.showStats = !this.showStats;
  }

  getWorkflowStats() {
    return {
      blocks: this.workflow.blocks.length,
      connections: this.workflow.connections.length,
      lastModified: new Date(this.workflow.updatedAt).toLocaleString()
    };
  }
}
