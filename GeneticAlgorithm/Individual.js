class Individual {

    constructor(len, Matrix) {
        this.Genes = new Array();
        this.Distance = 0;

        for (let j = 0; j < len;) {
            let a = rand(0, len)
            if (!isUsed(this.Genes, a)) {
                this.Genes.push(a);
                j++;
            }
        }
        if (this.Genes.length > 0) {
            this.SetDistance(Matrix);
        }
    }

    SetDistance(Matrix) {
        this.Distance = 0;
        for (let i = 0; i < this.Genes.length - 1; i++) {
            this.Distance += Matrix[this.Genes[i]][this.Genes[i + 1]];
        }
        this.Distance += Matrix[this.Genes[this.Genes.length - 1]][this.Genes[0]];
    }

}