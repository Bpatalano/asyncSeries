let asyncSeriesRecurse = (funArr, cb) => {
  //base case
  if (funArr.length === 0) {
    cb();
  }
  else {
    //call funArr[0]
    funArr[0](() => {
      //if fail return err
      if (this.err) {
        return this.err
      }
      //else run async - [0];
      else {
        asyncSeries(funArr.slice(1), cb)
      }
    });
  }
};

let asyncSeriesIterate = (funArr, cb) => {
  //compose functions to be cb for each other
  let newFun = funArr.reduceRight((bigFun, fun) => {
    return () => {
      //call function
      fun(() => {
        if (this.err) {
          //break statement
          return this.err
        }
        else {
          //composed inner functions
          bigFun();
        }
      })
    }
  },
  //start with final cb
  cb);
  //execute large function with nested callbacks
  newFun();
};