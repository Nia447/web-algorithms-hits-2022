function ants2(points = [], minWayArray = []) {
    let PointsToRender = new Array();
    let Distances = new Array();// содержит объект типа Way
    for (let i = 0; i < points.length; i++) {
        let visited = new Array();
        for (let j = 0; j < points.length; j++) {
            visited.push(false);
        }
        let iter = Math.round(Math.random() * (points.length - 1));
        let iterLast = iter + 0;
        let curDis = new Array();// сохраняет длину пройденного пути 
        let curWay = new Array();// сохраняет вершины по которым прошёл муравей
        curDis.push(0);
        iter = dfs(points, visited, iter, 0, PointsToRender, curDis, curWay);
        PointsToRender.push(points[iterLast]);
        curWay.push(points[iterLast]);
        curDis[0] += distance(points[iterLast].position, points[iter].position);
        Distances.push(new Way(curDis[0], curWay));
    }
    GlobalMinimalWay = PheromoneRegulator(Distances, points);
    return PointsToRender;
}
function dfs(points, visited, iter, count, PointsToRender, curDis, curWay) {
    PointsToRender.push(points[iter]);
    curWay.push(points[iter]);
    visited[iter] = true;
    count++;

    if (count == visited.length) {
        return iter;
    }

    let chances = new Array();
    chanceDFS(points[iter].ways, chances, visited);

    let Probability = Math.random();
    let currentProbability = 0;
    let index = 0;
    for (let i = 0; i < visited.length; i++) {
        if (visited[i]) continue;
        
        currentProbability += chances[index];
        if (Probability <= currentProbability) {
            curDis[0] += distance(points[i].position, points[iter].position);
            return dfs(points, visited, i, count, PointsToRender, curDis, curWay);
        }
        index++;
    }
}