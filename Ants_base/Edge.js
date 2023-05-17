class Edge{
    constructor(startNode, endNode, len = 0, pCount){
        this.startNode = startNode;
        this.endNode = endNode;
        this.len = len;
        this.pCount = pCount;
        this.edited = true;
    }
}