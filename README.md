# Workflow Builder using reactflow
built with vite 🚀
## Technologies used:
 - React
 - TypeScript
 - Redux toolkit
 - Reactflow
 
## Builder features below features

 - diffrerent type of nodes to build workflow like File, Filter, Sort, Slice etc..
 - viewer to see modified data
 - export feature to download modified data

## Redux architecture

we mainly have two reducers. one for storing modified table data & one for workflow editor.
Editor Reducer used for storing nodes & edges.

## Other Data Structure
I have used Map data structure to store node by its ID.(src/utils/nodeMap.ts)<br>
Nodes have source & end property to keep track of previous & end node.<br>

