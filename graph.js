class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)
    for (let v of vertex.adjacent) {
      v.adjacent.delete(vertex)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const arr = []
    function depthFirstSearchHelper(node, seen = new Set([node])) {
      arr.push(node.value)
      for (let v of node.adjacent) {
        if (!seen.has(v)) {
          seen.add(v)
          depthFirstSearchHelper(v, seen)
        }
      }
    }
    depthFirstSearchHelper(start)

    return arr
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) { 
    const toVisitQueue = [start]
    const seen = new Set()
    const arr = []
    while(toVisitQueue.length > 0){
      const current = toVisitQueue.shift()
      if (!seen.has(current)) arr.push(current.value)
      seen.add(current)
      for (let v of current.adjacent){
        if(!seen.has(v)){
          toVisitQueue.push(v)
          seen.add(v)
          arr.push(v.value)
        }
      }
    }
    return arr
  }
}

module.exports = { Graph, Node }