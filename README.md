# Workflow Builder using ReactFlow
built with vite 🚀
## Technologies used:
 - React
 - TypeScript
 - Redux toolkit
 - Reactflow
 - papaparse (To read & export csv)
 - tailwind (for styling)
 
## Builder features below features

 - diffrerent type of nodes to build workflow like File, Filter, Sort, Slice etc..
 - viewer to see modified data
 - export feature to download modified data

## Requirement to run
 - node version > 18.0.0
 - yarn version > 1.22.0

## Redux Architecture

we mainly have two reducers. one for storing modified table data & one for workflow editor.
Editor Reducer used for storing nodes & edges.

## Other Data Structure
I have used MAP data structure to store node by its ID. ([src/utils/nodeMap.ts](src/utils/nodeMap.ts))<br>
Nodes have source & end property to keep track of previous & end node.<br>
Each node store data as per the need. eg. FileNode stores uploaded data, SortNode stores type of sort & column on which sort will happen.

## Steps to run it

Install dependencies
 ```bash
 yarn
 ```
 Run the project
 ```bash
 yarn dev
 ```
### NOTES:-
 - Code is extendable,To add new Node you just have to create Node specific component, add Node type for typescript [here](src/types/customNode.types.ts), add one action in editorReducer for node specific logic & one if condition in map data structure for node specific logic.
 - Due to my work I was not able to complete all the features but I will continue adding more features (I really loved the idea of the app ✨).