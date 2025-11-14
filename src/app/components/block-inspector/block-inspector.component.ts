import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkflowBlock, BlockType, BLOCK_TYPE_METADATA } from '@app/models/workflow-block.model';

@Component({
  selector: 'app-block-inspector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './block-inspector.component.html',
  styleUrls: ['./block-inspector.component.css']
})
export class BlockInspectorComponent implements OnChanges {
  @Input() selectedBlock: WorkflowBlock | null = null;
  @Output() blockConfigChanged = new EventEmitter<WorkflowBlock>();

  blockMetadata: any = null;
  configKeys: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedBlock'] && this.selectedBlock) {
      this.blockMetadata = BLOCK_TYPE_METADATA[this.selectedBlock.type];
      this.configKeys = Object.keys(this.selectedBlock.config || {});
    }
  }

  onConfigChange(key: string, value: any) {
    if (this.selectedBlock) {
      this.selectedBlock.config[key] = value;
      this.blockConfigChanged.emit(this.selectedBlock);
    }
  }

  onLabelChange(value: string) {
    if (this.selectedBlock) {
      this.selectedBlock.label = value;
      this.blockConfigChanged.emit(this.selectedBlock);
    }
  }

  addConfigField() {
    if (this.selectedBlock) {
      const newKey = `field_${Date.now()}`;
      this.selectedBlock.config[newKey] = '';
      this.configKeys = Object.keys(this.selectedBlock.config);
      this.blockConfigChanged.emit(this.selectedBlock);
    }
  }

  removeConfigField(key: string) {
    if (this.selectedBlock) {
      delete this.selectedBlock.config[key];
      this.configKeys = Object.keys(this.selectedBlock.config);
      this.blockConfigChanged.emit(this.selectedBlock);
    }
  }

  getFieldType(key: string): string {
    if (!this.selectedBlock) return 'text';

    const value = this.selectedBlock.config[key];
    if (typeof value === 'boolean') return 'checkbox';
    if (typeof value === 'number') return 'number';
    if (key.toLowerCase().includes('date')) return 'date';
    if (key.toLowerCase().includes('time')) return 'time';

    return 'text';
  }

  isFieldEditable(key: string): boolean {
    // Some fields are read-only based on type
    return true;
  }

  trackByKey(index: number, key: string): string {
    return key;
  }
}
