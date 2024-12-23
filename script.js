let grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
  
  let selectedCell = { row: 0, col: 0 };
  
  const gridContainer = document.querySelector('.grid-container');
  const numberContainer = document.querySelector('.number-container');
  
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const gridCell = document.createElement('div');
      gridCell.classList.add('grid-cell');
      gridCell.textContent = cell !== 0 ? cell : '';
      gridCell.addEventListener('click', () => {
        selectedCell = { row: rowIndex, col: colIndex };
        updateGrid();
      });
      gridContainer.appendChild(gridCell);
    });
  });
  
  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
    const numberButton = document.createElement('button');
    numberButton.classList.add('number-button');
    numberButton.textContent = number;
    numberButton.addEventListener('click', () => {
      if (isValidMove(selectedCell.row, selectedCell.col, number)) {
        grid[selectedCell.row][selectedCell.col] = number;
        updateGrid();
      }
    });
    numberContainer.appendChild(numberButton);
  });
  
  function updateGrid() {
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((gridCell, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      gridCell.textContent = grid[row][col] !== 0 ? grid[row][col] : '';
      gridCell.classList.toggle('selected', row === selectedCell.row && col === selectedCell.col);
    });
  }
  
  function isValidMove(row, col, number) {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === number || grid[i][col] === number) {
        return false;
      }
    }
  
    const subGridRow = Math.floor(row / 3) * 3;
    const subGridCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[subGridRow + i][subGridCol + j] === number) {
          return false;
        }
      }
    }
  
    return true;
  }