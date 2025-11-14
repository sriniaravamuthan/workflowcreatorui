import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkflowCreatorComponent } from './components/workflow-creator/workflow-creator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, WorkflowCreatorComponent],
  template: `<app-workflow-creator></app-workflow-creator>`,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class AppComponent {}
