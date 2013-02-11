// Generate permutations of unique arrays in the range of 1 to n + 1.
var generatePermutations = function(baseArray){
  var permArr = [];
  var usedChars = [];

  function permute(input) {
    var i, ch;
    for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);
        if (input.length === 0) {
            permArr.push(usedChars.slice());
        }
        permute(input);
        input.splice(i, 0, ch);
        usedChars.pop();
    }
    return permArr;
  }

  return permute(baseArray);
};

var createPermutationsArray = function(n){
  // Generates elements of baseArray (e.g., [1,2,3,4])
  var baseArray = _.range(1, n + 1);
  // Creates all permutations of the numbers in baseArray, which will be n! in length.
  return generatePermutations(baseArray);
};

// Generate blank chess board
var createBaseMatrix = function(n){
  return _.times(n, function(){
    return _.range(n);
  });
};

// Generate chessboard with queens plotted on it.
var plotPermutation = function(permutation, chessboard){
  _.each(permutation, function(element, index){
    var row = element - 1;
    chessboard[row][index] = true;
  });
};

var noOfQueens = function(diagArray){
  return _.filter(diagArray, function(element){
    return element === true;
  });
};

var checkForConflicts_NE = function(boardState, n) {
  var conflictFound = false;
  var startPositions = _.range(n).concat(_.range(n, (n * n), n));
  var endPosition1 = n * n;
  var endPosition2 = n * n;
  _.each(startPositions, function(startPosition) {
    var diagArray = [];
    if (startPosition < n) {
      for (var i = startPosition; i < endPosition1; i += (n + 1)) {
        diagArray.push(boardState[i]);
      }
      endPosition1 -= n;
    } else {
      for (var i = startPosition; i < endPosition2; i += (n + 1)) {
        diagArray.push(boardState[i]);
      }
    }
    if (noOfQueens(diagArray).length >= 2) {
      conflictFound = true;
    }
  });

  return conflictFound;
};

var checkForConflicts_NW = function(boardState, n) {
  var conflictFound = false;
  var startPositions = _.range(n).concat(_.range((2 * n - 1), (n * n), n));
  var endPosition1 = 1;
  var endPosition2 = n * n;
  _.each(startPositions, function(startPosition) {
    var diagArray = [];
    if (startPosition < n) {
      for (var i = startPosition; i < endPosition1; i += (n - 1)) {
        diagArray.push(boardState[i]);
      }
      endPosition1 += n;
    } else {
      for (var i = startPosition; i < endPosition2; i += (n - 1)) {
        diagArray.push(boardState[i]);
      }
    }

    if (noOfQueens(diagArray).length >= 2) {
      conflictFound = true;
    }
  });

  return conflictFound;
};

// Main solving function 
var solveNQueens = function(n){
  var solutions = [];
  var permutations = createPermutationsArray(n);
  _.each(permutations, function(permutation){
    var chessboard = createBaseMatrix(n);
    plotPermutation(permutation, chessboard);
    var boardState = _.flatten(chessboard);
    if (!checkForConflicts_NE(boardState, n)) {
      if (!checkForConflicts_NW(boardState, n)) {
        solutions.push(permutation);
      }
    }
  });

  return (solutions.length === 0) ? false : solutions;

};
