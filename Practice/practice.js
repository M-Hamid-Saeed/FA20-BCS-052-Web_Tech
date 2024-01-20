function addNumbersSync(a, b) {

for (let index = 0; index < 10000000; index++) {
//    
}

  return new Promise((resolve, reject) => {
    if (!a || !b) {
      reject("Empty");
    } else {
      const sum = a + b;
      resolve("Sum : ", sum);
    }
  });
}

function addNumbersCallback(a, b, callback) {
    // Simulating a time-consuming task
    for (let i = 0; i < 1000000000; i++) {
      // Do nothing
    }
  
    callback(a + b);
  }
  
  function sum(result){
      console.log(result);
  }
  console.log("Before function call");
  addNumbersCallback(5, 3, sum);

