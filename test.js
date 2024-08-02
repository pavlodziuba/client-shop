
    let inc = (function(){
        this.counter = 0
      return function(){
        console.log(this.counter)
        this.counter += 1
      }
  })()
  
  inc()
  inc()