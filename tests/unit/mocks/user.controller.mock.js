class UserControllerMock{
    static ans = {
        exist: [true]
    }
    static indx = {
        exist: 0
    }
    static async exist(a){
        return (this.ans.exist[this.indx.exist++]);
    }
}

module.exports = UserControllerMock;