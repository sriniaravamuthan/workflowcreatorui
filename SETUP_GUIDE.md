# Quick Setup Guide - Workflow Creator UI

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

### Step 3: Open in Browser
Navigate to `http://localhost:4200`

---

## 📦 What's Included

✅ **Angular 20** - Latest Angular framework with standalone components
✅ **Drag & Drop** - CDK-powered drag-and-drop functionality
✅ **11 Block Types** - Fully configurable workflow blocks
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Save & Export** - Local storage + JSON import/export
✅ **Block Inspector** - Property editor with custom field support

---

## 🎯 Quick Tips

### Adding Blocks
1. Find block in left palette
2. Drag it onto the canvas
3. Click to select and configure in right panel

### Saving Work
- **Quick Save**: Click "Save" button (stores in browser)
- **Export**: Click "Export" to download as JSON file
- **Import**: Click "Import" to load previously saved workflow

### Canvas Navigation
- **Pan**: Right-click + drag (or Ctrl + left-click + drag)
- **Zoom**: Scroll wheel
- **Select Block**: Click on block
- **Delete Block**: Click the "×" on block

---

## 📋 Block Types Overview

| Block Type | Color | Purpose |
|-----------|-------|---------|
| **Start** | 🟢 Green | Entry point |
| **End** | 🔴 Red | Exit point |
| **Order** | 🔵 Blue | Create/manage HIMS order |
| **Task** | 🟠 Orange | Assign task to resource |
| **Decision** | 🟡 Yellow | Conditional branching |
| **Instruction** | 🟣 Purple | Structured guidance |
| **Parallel** | 🔷 Cyan | Simultaneous execution |
| **Wait/Event** | 🔴 Pink | Event synchronization |
| **Timer** | 💜 Indigo | Time-based delays |
| **Subflow** | 🔹 Light Blue | Call another workflow |
| **Gate** | 🟫 Brown | Checkpoint enforcement |

---

## 🛠️ Available Commands

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests (future)
npm test

# Run linter (future)
npm lint
```

---

## 💡 Example Workflow

1. **Drag** a "Start" block onto canvas
2. **Drag** an "Order" block below it
3. **Drag** a "Task" block after the order
4. **Click** on the Task block to edit
5. **Enter** task name: "Review Lab Results"
6. **Set** assignee in inspector
7. **Click** "Save" to store workflow
8. **Click** "Export" to download

---

## 🔧 Configuration Files

- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript compiler options
- `package.json` - npm dependencies and scripts
- `.gitignore` - Git ignore rules

---

## 📚 Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── workflow-block.model.ts     (Data models)
│   ├── components/
│   │   ├── workflow-creator/           (Main container)
│   │   ├── workflow-canvas/            (Canvas & drag-drop)
│   │   ├── block-palette/              (Block selector)
│   │   └── block-inspector/            (Block editor)
│   └── app.component.ts                (Root component)
├── main.ts                             (Bootstrap)
├── index.html                          (HTML entry)
└── styles.css                          (Global styles)
```

---

## ✨ Key Features

### Visual Designer
- Canvas-based workflow editor
- Drag-and-drop block placement
- Real-time zoom and pan
- Block connection visualization

### Block Configuration
- Property editor for each block
- Custom field support
- Type-specific settings
- Metadata view

### Persistence
- Local browser storage
- JSON export/import
- Workflow versioning
- Timestamp tracking

### Responsive UI
- Three-panel layout (Palette | Canvas | Inspector)
- Collapsible panels on mobile
- Touch-friendly controls
- Adaptive grid

---

## 🚨 Troubleshooting

### Port already in use
```bash
# Use different port
ng serve --port 4201
```

### Node modules issue
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check compilation
npm run build
```

---

## 📖 Full Documentation

For comprehensive documentation, see **README.md**

---

## 🎓 Based on Business Guidelines

This prototype implements blocks and concepts from the hospital information management system (HIMS) business guidelines:

- Order lifecycle management
- Task workflow orchestration
- Instruction semantics
- Gate/checkpoint enforcement
- Parallel execution patterns
- Event-driven workflows
- Timer-based delays
- Subflow composition

For details, see the `/docs` folder.

---

## 🤝 Need Help?

1. **Check README.md** for detailed documentation
2. **Review business guidelines** in `/docs` folder
3. **Check browser console** for error messages
4. **Verify Node.js/npm** versions: `node -v && npm -v`

---

**Happy workflow building! 🎨✨**
