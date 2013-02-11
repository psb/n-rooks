var solveNRooks = function(n){
  // var solution = [
  //   [false, true,  false, false],
  //   [false, false, false, true ],
  //   [true,  false, false, false],
  //   [false, false, true,  false]
  // ];

  // the above is a pre-baked solution for when n = 4.
  // Write code here that will find solutions for any n
  // hint: you'll want to start by building your own matrix to put in the solution variable

  // var solution = new ChessboardModel({n:input_n});

  // Function to create new solution array based on n.
  var newArray = function(n){
    var myArray = [];
    for (var i = 0; i < n; i++){
      myArray.push(new Array(n));
    }
    return myArray;
  };

  var setRowToConflict = function(row){
    _.each(row, function(element){
      if (element !== true) {
        element = "conflict";
      }
    });
  };

  var setColumnToConflict = function(col_index){
    _.each(solution, function(row){
      if (row[col_index] !== true) {
        row[col_index] = "conflict";
      }
    });
  }

  var changeConflictToFalse = function(solutionArray){
    _.each(solutionArray, function(row){
      _.map(row, function(element, index){
        if (element === "conflict") {
          return row[index] = false;
        } else {
          return element;
        }
      });
    });
  };

  // Create empty solution array.
  var solution = newArray(n);

  for (var i = 0; i < solution.length; i++) {
    var column = i;
    var row = solution[i];
    for (var j = 0; j < row.length; j++) {
      if (row[j] === undefined) {
        row[j] = true;
        setRowToConflict(row);
        setColumnToConflict(column);
        break;
      } 
    }
  }

  changeConflictToFalse(solution);


  

  // this line hooks into the visualizer
  window.chessboardView.model.setSimpleBoard(solution);
  window.solution = solution;
  return solution;
}
