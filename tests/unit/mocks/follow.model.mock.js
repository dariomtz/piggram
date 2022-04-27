class FollowMock {
    static ans = null;
    static populates = true;
    static saveAns = null;
    static find(a,b){
            return {populate:(a,b)=>FollowMock.ans};
    }

    static findOne(a){return this.populates?{populate:(a,b)=>{return {populate:(a,b)=>FollowMock.ans}}}
            : FollowMock.ans
    }
    
    save(a){
        return FollowMock.saveAns;
    }

    static deleteOne(a){
        return this.ans;
    }
}
module.exports = FollowMock;