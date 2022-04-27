class FollowMock {
    static ans = null;
    static populates = true;
    static find(a,b){
            return {populate:(a,b)=>this.ans};
    }

    static findOne(a){return this.populates?{populate:(a,b)=>{return {populate:(a,b)=>this.ans}}}
            : this.ans
    }
    
    save(a){
        return FollowMock.ans;
    }
}
module.exports = FollowMock;