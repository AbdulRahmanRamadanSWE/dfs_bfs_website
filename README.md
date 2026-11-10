# DFS & BFS Academy — Phase 1

A mobile-friendly, bilingual (English/Arabic) interactive graph traversal learning lab.

## Run locally
Open `index.html` in a modern browser. No build step or backend is required.

## Features
- Add nodes by selecting **Add node** and tapping/clicking the graph.
- Add edges by selecting **Add edge** and selecting two nodes.
- Toggle directed edges.
- Drag nodes to rearrange the graph.
- Run DFS or BFS and inspect the execution trace.
- Step forward/backward, play/pause, and adjust animation speed.
- Inspect visit order and the DFS stack / BFS queue.
- View C++ reference implementations.
- Switch the interface between English and Arabic.

## Current scope / known limitations
- This is Phase 1: the interactive visualizer foundation.
- The engine runs in JavaScript; C++ is shown as a learning reference, not executed in-browser.
- Graphs are currently in-memory and are not saved after refreshing.
- The visualizer traverses the connected component reachable from the selected start node.
- The iterative C++ tab is a draft reference and will be refined in the next implementation pass.
- External Google Fonts are optional; system fallbacks are provided.

## Next milestones
1. Validate and refine DFS/BFS execution trace and C++ implementations.
2. Add structured lessons, knowledge checks, and concept explanations.
3. Add grid/maze visualizations and common graph problem patterns.
4. Add C++ problem practice and a safe code execution integration.
