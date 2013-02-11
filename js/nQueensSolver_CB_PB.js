var solveNQueens = function(n){
  var n = n;
  var solution = [];
  var rows = 4;

  // Create array of 4 arrays containing numbers in the range of 1 to n + 1. 

  while (rows--) {
    solution.push(_.range(1, n + 1));
  }

  var failedMatrices = [];
  var solvedMatrices = [];
  var solved = false;
  // Sum that each column must equal.
  var colTotal = (2 * n) + 2;
  // Maximum number of possible matrix combinations using factorial

  var factorial = function(num){
    if (num === 0) {
      return 1;
    } else {
      return num * factorial(num - 1);
    }
  };

  // var maxMatrices = factorial(n) * n;
  var maxMatrices = 2000;

  // Randomly shuffle the 4 arrays 

  var createPotentialSolutionMatrix = function(solution){
    var potentialSolutionMatrix = [];
      _.each(solution, function(array){
      potentialSolutionMatrix.push(_.shuffle(array));
    });

    return potentialSolutionMatrix;
  };

  var flattenArrayAndJoin = function(array){
    return _.flatten(array).join();
  };

  var checkPotentialSolutionMatrix = function(potentialSolutionMatrix, n, stringOfArray){
    if (!_.contains(failedMatrices, stringOfArray)){
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
      // console.log(summedColumns);
      return summedColumns;
    } 
  };

  var checkSummedColumns = function(summedColumns, potentialSolutionMatrix, stringOfArray){
    if (_.every(summedColumns, function(sum){sum === colTotal})) {
      solvedMatrices.push(stringOfArray);
      return true;
    } else {
      failedMatrices.push(stringOfArray);
      return false;
    }
  };
  

  while (solved === false && failedMatrices.length < maxMatrices) {
    console.log(solved);
    console.log(failedMatrices.length, solvedMatrices.length);
    var potentialSolutionMatrix = createPotentialSolutionMatrix(solution);
    var stringOfArray = flattenArrayAndJoin(potentialSolutionMatrix);
    var summedColumns = checkPotentialSolutionMatrix(potentialSolutionMatrix, n, stringOfArray);
    console.log(summedColumns)
    solved = checkSummedColumns(summedColumns, potentialSolutionMatrix, stringOfArray);
  }
  window.failedMatrices = failedMatrices;
  window.solvedMatrices = solvedMatrices;
  console.log("Solved matrices:  ", solvedMatrices);
}
