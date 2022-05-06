class ControllerMock{
     ans = {
        exist: [true]
    }
     indx = {
        exist: 0
    }
     async exist(a){
        return (this.ans.exist[this.indx.exist++]);
    }
}

module.exports = ControllerMock;