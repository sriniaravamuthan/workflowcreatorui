# Workflow Creator UI - Angular 20 Prototype

A clickable, interactive UI prototype for a visual workflow creator with drag-and-drop functionality, built with Angular 20 and based on hospital information management system (HIMS) business guidelines.

## Overview

This prototype implements a sophisticated workflow orchestration interface that allows users to:

- **Visually design workflows** using a drag-and-drop interface
- **Configure workflow blocks** with an intuitive inspector panel
- **Create complex workflows** including decision branching, parallel execution, and task management
- **Export and import workflows** as JSON for storage and sharing
- **Manage workflow lifecycle** states as per HIMS specifications

## Features

### 🎨 Visual Workflow Designer
- **11 Domain-Specific Block Types** based on HIMS business guidelines:
  - **Control Flow**: Start, End, Decision, Parallel, Gate/Checkpoint
  - **Operations**: Order, Task, Instruction
  - **Advanced**: Wait/Event, Timer, Subflow

- **Interactive Canvas** with:
  - Drag-and-drop block placement
  - Pan and zoom controls (Ctrl+drag to pan, scroll wheel to zoom)
  - Connection visualization with SVG lines
  - Selection and deletion capabilities
  - Real-time grid background

### 📋 Block Palette
- Organized by category (Control Flow, Operations, Advanced)
- Expandable/collapsible categories
- Quick descriptions and visual icons
- Drag-and-drop enabled for canvas placement

### 🔧 Block Inspector
- Edit block labels and properties
- Configure block-specific settings (task names, timers, conditions, etc.)
- Add custom configuration fields
- View block metadata (ID, position, connections)
- Dynamic form generation based on block type

### 💾 Persistence & Export
- **Save** workflows to local storage
- **Export** workflows as JSON files
- **Import** previously saved workflows
- Clear workspace with confirmation dialog

### 📊 Workflow Statistics
- Track number of blocks and connections
- Monitor last modification time
- Display current zoom level on canvas

### 📱 Responsive Design
- Desktop layout with three-panel design (Palette | Canvas | Inspector)
- Tablet layout with collapsible panels
- Mobile layout adapts to smaller screens
- Touch-friendly controls

## Project Structure

```
workflowcreatorui/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── workflow-block.model.ts         # Workflow data models
│   │   ├── components/
│   │   │   ├── workflow-creator/               # Main container component
│   │   │   ├── workflow-canvas/                # Canvas with drag-drop
│   │   │   ├── block-palette/                  # Block selection panel
│   │   │   └── block-inspector/                # Block configuration panel
│   │   └── app.component.ts                    # Root component
│   ├── main.ts                                 # Bootstrap entry point
│   ├── index.html                              # HTML template
│   └── styles.css                              # Global styles
├── angular.json                                # Angular CLI configuration
├── tsconfig.json                               # TypeScript configuration
├── package.json                                # Dependencies
└── README.md                                   # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm 9+
- Angular CLI 20

### Installation

1. **Clone the repository** (already in your working directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:4200/`

### Building for Production

```bash
npm run build
```

The production-ready build will be in the `dist/workflow-creator/` directory.

## Usage Guide

### Creating a Workflow

1. **Name your workflow**: Use the input field in the toolbar
2. **Add blocks**: Drag blocks from the left palette onto the canvas
3. **Configure blocks**: Click on any block to select it and edit its properties in the right panel
4. **Connect blocks**: Position blocks logically on the canvas (connections are visual references)
5. **Save your work**: Click the "Save" button to store in local storage

### Block Types

#### Control Flow Blocks
- **Start**: Marks workflow entry point (green)
- **End**: Marks workflow exit point (red)
- **Decision**: Branch workflow based on conditions (yellow)
- **Parallel**: Execute multiple paths simultaneously (cyan)
- **Gate**: Enforce checkpoint/gate rules (brown)

#### Operation Blocks
- **Order**: Create or manage orders in HIMS (blue)
- **Task**: Assign tasks to resources (orange)
- **Instruction**: Provide structured instructions (purple)

#### Advanced Blocks
- **Wait/Event**: Wait for specific events (pink)
- **Timer**: Wait for time duration (indigo)
- **Subflow**: Call another workflow (light blue)

### Canvas Controls

| Control | Action |
|---------|--------|
| Click block | Select block for editing |
| Drag block | Reposition on canvas |
| Right-click + Drag | Pan the canvas |
| Ctrl + Left-click | Select multiple blocks (future) |
| Scroll Wheel | Zoom in/out |
| Delete Key | Remove selected block (click X on block) |

### Inspector Panel

When a block is selected, the right panel allows you to:

- **Edit Label**: Change the display name of the block
- **Configure Properties**: Set block-specific parameters
  - Orders: Order ID, type, priority
  - Tasks: Task name, assignee, due date, priority
  - Decisions: Condition, true/false branch labels
  - Timers: Duration and time units
  - And more...
- **Add Custom Fields**: Click "+" to add custom properties
- **View Metadata**: See block ID, position, and connection info

### Saving and Exporting

**Save (Local Storage)**:
- Stores workflow in browser's local storage
- Persists between sessions
- Perfect for quick saves

**Export (JSON File)**:
- Downloads workflow as a standard JSON file
- Share with team members
- Version control friendly

**Import (From JSON)**:
- Load previously exported workflows
- Restore from backup
- Share across different computers

## Business Guidelines Integration

This prototype is built according to the HIMS business guidelines provided in the `/docs` folder:

- **01_overview.md**: System purpose, vision, and design tenets
- **02_core_concepts.md**: Order and task lifecycles
- **03_visual_designer.md**: Canvas, palette, and block definitions
- **04_nlp_authoring.md**: Natural language workflow authoring
- **05_order_sets_and_workflows.md**: Cross-module workflow patterns
- **06_integration_analytics.md**: Integration and non-functional requirements

## Architecture

### Component Hierarchy

```
AppComponent
└── WorkflowCreatorComponent
    ├── BlockPaletteComponent
    ├── WorkflowCanvasComponent
    └── BlockInspectorComponent
```

### Data Flow

1. **User drags block from palette** → BlockPaletteComponent emits drag event
2. **Block dropped on canvas** → WorkflowCanvasComponent receives drop event
3. **Block added to workflow** → WorkflowCreatorComponent updates workflow model
4. **User selects block** → WorkflowInspectorComponent displays configuration
5. **User modifies config** → BlockInspectorComponent emits change event
6. **Workflow updated** → WorkflowCreatorComponent updates model

### Technologies Used

- **Angular 20**: Latest Angular framework with standalone components
- **Angular CDK**: Drag-and-drop utilities
- **RxJS**: Reactive programming
- **TypeScript**: Strong typing and modern JavaScript features
- **CSS Grid & Flexbox**: Responsive layout

## Customization

### Adding New Block Types

1. **Add to `BlockType` enum** in `workflow-block.model.ts`:
   ```typescript
   export enum BlockType {
     // ... existing types
     NEW_TYPE = 'new-type'
   }
   ```

2. **Add metadata** to `BLOCK_TYPE_METADATA`:
   ```typescript
   [BlockType.NEW_TYPE]: {
     label: 'New Block',
     icon: 'icon_name',
     color: '#HEXCOLOR',
     description: 'Block description',
     hasInputs: true,
     hasOutputs: true
   }
   ```

3. **Add default config** in `BlockTemplateFactory.getDefaultConfig()`:
   ```typescript
   case BlockType.NEW_TYPE:
     return { /* your default config */ };
   ```

### Styling

Global styles are in `src/styles.css`. Component-specific styles are in each component's `.css` file.

- Primary color: `#2196F3` (blue)
- Secondary colors: Per block type (see metadata)
- Text: `#333` (dark gray)
- Borders: `#ddd` (light gray)

## Known Limitations & Future Enhancements

### Current Limitations
- Connection lines are visual representations only (not yet functional)
- Single block selection (multi-select coming soon)
- Local storage only (backend integration needed)
- No undo/redo functionality yet
- No validation rules enforcement

### Planned Enhancements
- Connection line editing and management
- Multi-block selection and grouping
- Workflow execution preview
- Real-time collaboration
- Backend persistence
- Workflow versioning and history
- Advanced validation rules
- Natural language authoring (per business guidelines)
- Workflow templates and snippets
- Search and filter for blocks

## Testing

### Manual Testing Checklist

- [ ] Drag blocks from palette to canvas
- [ ] Canvas pan and zoom work correctly
- [ ] Block selection and configuration work
- [ ] Add/remove custom fields
- [ ] Save workflow to local storage
- [ ] Export and import workflows
- [ ] Clear workflow with confirmation
- [ ] Responsive layout on different screen sizes
- [ ] Block connections visualize correctly
- [ ] Statistics update correctly

### Automated Testing (Future)

```bash
npm test
```

## Performance Considerations

- Canvas optimized for up to 100+ blocks
- SVG connections updated on block movement
- Local storage limited to ~5-10MB
- Consider database integration for large workflows

## Security Considerations

- Input sanitization for block labels and configs
- No external API calls in prototype
- Local storage only (add authentication for backend)
- JSON import validation

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ❌ Not supported (uses ES2022)

## Contributing

To contribute improvements:

1. Make changes on a feature branch
2. Test thoroughly
3. Create a pull request with description

## License

© 2024 Workflow Creator. All rights reserved.

## Support

For issues or questions:
1. Check the business guidelines in `/docs/`
2. Review component documentation in code comments
3. Check console for error messages
4. Test in browser DevTools

## Glossary

- **Block**: A unit of work in the workflow
- **Canvas**: The main editing area where blocks are placed
- **Palette**: The left panel containing available blocks
- **Inspector**: The right panel for block configuration
- **Connection**: A link between two blocks (visual only)
- **Workflow**: A complete sequence of blocks defining a process
- **Order**: A request in HIMS requiring processing
- **Task**: A specific assignment to be completed
- **Instruction**: Guidance for performing a task
- **Gate/Checkpoint**: A control point enforcing rules

---

**Version**: 1.0
**Last Updated**: 2024
**Built with**: Angular 20, TypeScript, Angular CDK
