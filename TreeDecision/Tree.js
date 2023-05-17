class Tree {

    constructor(mass) {
        this.mass = mass;
        this.MaxRows = 0;
        this.MaxColumns = 1;
        this.WidthNode;
        this.HeightNode;
        this.DefineParams();
        this.DefineSize();
    }

    DefineParams() {
        let CurArray = new Array();
        CurArray.push(mass[0]);
        this.CheckRows(CurArray);
    }

    CheckRows(CurArray) {
        let NextArray = new Array();
        
        for (let i = 0; i < CurArray.length; i++) {
            if (CurArray[i].ChildIndex != null) {
                for (let j = 0; j < CurArray[i].ChildIndex.length; j++) {
                    NextArray.push(mass[CurArray[i].ChildIndex[j]]);
                }
            }
        }

        if (this.MaxColumns < NextArray.length) {
            this.MaxColumns = NextArray.length;
        }
        this.MaxRows++;

        if (NextArray.length > 0) {
            this.CheckRows(NextArray);
        }
    }

    DefineSize() {
        this.HeightNode = 800 / this.MaxRows / 2 * Scale;
        this.WidthNode = 1200 / this.MaxColumns / 2 * Scale;
    }

    PrintTree() {
        let CurArray = new Array();
        CurArray.push(mass[0]);

        let CurY = (200 / (this.MaxRows + 1) + moveY) * Scale,
        StepY = (200 / (this.MaxRows + 1) + this.HeightNode) * Scale;
        
        this.PrintRows(CurArray, CurY, StepY);

        this.PrintArrowTree();

        this.PrintRows(CurArray, CurY, StepY);



        // for (let i = 0; i < this.mass.length; i++) {
        //     ctx.fillStyle = 'red';
        //     ctx.beginPath();
        //     ctx.arc(mass[i].Position.x, mass[i].Position.y, 10, 0, Math.PI * 2, true);
        //     ctx.stroke();
        // }
    }
    
    PrintRows(CurArray, CurY, StepY) {
        let NextArray = new Array();

        for (let i = 0; i < CurArray.length; i++) {
            if (CurArray[i].ChildIndex != null) {
                for (let j = 0; j < CurArray[i].ChildIndex.length; j++) {
                    NextArray.push(mass[CurArray[i].ChildIndex[j]]);
                }
            }
        }

        let CurX = (400 / (CurArray.length + 1) + 1200 / (CurArray.length + 1) + moveX) * Scale,
        StepX = (400 / (CurArray.length + 1) + 1200 / (CurArray.length + 1)) * Scale;
        CurY += StepY;
        
        for (let i = 0; i < CurArray.length; i++) {
            this.PrintNode(CurArray[i], CurX, CurY);
            CurArray[i].Position = Position(CurX, CurY);
            CurX += StepX;
        }

        

        if (NextArray.length > 0) {
            this.PrintRows(NextArray, CurY, StepY);
        }

    }
    
    PrintNode(CurrentNode, CurX, CurY, ColorNode = '#004275') {
        let X = Math.round(CurX);
        let Y = Math.round(CurY);

        ctx.fillStyle = CurrentNode.Color
        ctx.beginPath();
        ctx.rect(X, Y, this.WidthNode, this.HeightNode);
        ctx.closePath();

        ctx.strokeStyle = '#00a6ff';
        ctx.lineWidth = 5;
        ctx.fillStyle = ColorNode;
        ctx.stroke();
        ctx.fill();

        ctx.fillStyle = "#000";
        ctx.strokeStyle = "#F00";
        ctx.font = "italic " + Scale * 20 + "pt Arial";
        ctx.fillText(CurrentNode.Name, X, Y + this.HeightNode / 2 + Scale * 7);
    }

    PrintArrowTree() {
        let CurArray = new Array();
        CurArray.push(mass[0]);
        this.PrintArrowRows(CurArray);
    }

    PrintArrowRows(CurArray) {
        let NextArray = new Array();

        for (let i = 0; i < CurArray.length; i++) {
            if (CurArray[i].ChildIndex != null) {
                
                for (let j = 0; j < CurArray[i].ChildIndex.length; j++) {
                    NextArray.push(mass[CurArray[i].ChildIndex[j]]);
                    this.PrintArrowNode(CurArray[i], mass[CurArray[i].ChildIndex[j]], j);
                }
            }
        }

        if (NextArray.length > 0) {
            this.PrintArrowRows(NextArray);
        }
    }

    PrintArrowNode(Node1, Node2, index) {
        ctx.strokeStyle = '#00257d';
        ctx.beginPath();
        ctx.moveTo(Node1.Position.x + this.WidthNode / 2, Node1.Position.y + this.HeightNode);
        ctx.lineTo(Node2.Position.x + this.WidthNode / 2, Node2.Position.y);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = "#7300ff";
        ctx.strokeStyle = "#000";
        ctx.font = "italic " + Scale * 15 + "pt Arial";
        
        ctx.fillText(Node1.ChildName[index], ((Node1.Position.x + this.WidthNode / 2) - ((Node1.Position.x + this.WidthNode / 2) - (Node2.Position.x + this.WidthNode / 2)) / 2) - Scale * 10 * Node1.ChildName[index].length, (Node1.Position.y + this.HeightNode) + ((Node2.Position.y) - (Node1.Position.y + this.HeightNode)) / 2);
    }

}