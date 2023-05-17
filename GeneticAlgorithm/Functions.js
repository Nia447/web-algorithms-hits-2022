function point(x, y) {
    return {
        x: x = x,
        y: y = y,
    }
}

function rand(min, max) {
    let a = min + Math.round(Math.random() * (max - min - 1));
    return a;
}

function Swap(num1, num2) {
    num2 = num1 + (num1=num2, 0)
}

function GetDistance(point1, point2) {
    return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
}

function isUsed(Array, index) {
    for (let i = 0; i < Array.length; i++) {
        if (Array[i] == index) {
            return true;
        }
    }
    return false;
}