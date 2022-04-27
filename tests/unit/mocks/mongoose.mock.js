class MongooseMock {
    ans = null;
    pos = 0;
    isValidObjectId (a){
        return Array.isArray(this.ans)? this.ans[this.pos++] : this.ans;
    }
}

module.exports = new MongooseMock();