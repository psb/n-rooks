var solveNQueens = function(n){
  // var solution = [
  //   [false, true,  false, false],
  //   [false, false, false, true ],
  //   [true,  false, false, false],
  //   [false, false, true,  false]
  // ];
  // var solution = [
  //   [false, true,  false, false,false, false, false, false, false],
  //   [false, false, false, true,false, false, false, false, false],
  //   [true,  false, false, false, false, false, false, false, false],
  //   [false, false, true,  false,false, false, false, false, false],
  //   [false, true,  false, false,false, false, false, false, false],
  //   [false, false, false, true,false, false, false, false, false],
  //   [false, false, false, true,false, false, false, false, false],
  //   [false, false, false, true,false, false, false, false, false],
  //   [false, false, false, true,false, false, false, false, false]
  // ];

  // the above is a pre-baked solution for when n = 4.
  // Write code here that will find solutions for any n
  // hint: you'll want to start by building your own matrix to put in the solution variable

  // var newArray = function(n){
  //   var myArray = [];
  //   for (var i = 0; i < n; i++){
  //     myArray.push(new Array(n));
  //   }
  //   return myArray;
  // };

  // var solution = newArray(n);

  var n = n;

  var solution = [];

  var rows = 4;

  // Create array of 4 arrays containing numbers in the range of 1 to n + 1. 

  while (rows--) {
    solution.push(_.range(1, n + 1));
  }

  // Randomly shuffle the 4 arrays 

  var createPotentialSolution = function(solution){
    var potentialSolution = [];
      _.each(solution, function(array){
      potentialSolution.push(_.shuffle(array));
    });

    return potentialSolution;
  };

  var checkPotentialSolution = function(potentialSolutionMatrix, n){
    if (_.contains(failedMatrices, potentialSolutionMatrix)){
      // solved = false;
      return;
    } else {
      var total = (2 * n) + 2;
      var flattenedArray = _.flatten(potentialSolutionMatrix);

      var summedColumns = [];

      var sumColumn;
      var start = 0;

      while (start < n) {
        sumColumn = 0;
        for (var i = start; i < flattenedArray.length; i += n){
          sumColumn += flattenedArray[i];
        }
        summedColumns.push(sumColumn);
        start += 1;
      }

      if (_.every(summedColumns, function(sum){sum === total})) {
        solved = true;
        console.log(potentialSolutionMatrix);
      } else {
        failedMatrices.push(potentialSolutionMatrix);
      }
    }
  };
  
  var failedMatrices = [];
  var solved = false;

  while (solved === false) {
    var potentialSolution = createPotentialSolution(solution);
    checkPotentialSolution(potentialSolution);
  }


  

  // this line hooks into the visualizer
  // window.chessboardView.model.setSimpleBoard(solution);
  // return solution;
}
