# vue-fibonacci-grid

It's a 50x50 grid with the following rules:

- When user clicks on a cell, all horizontal and column cells of the clicked cell will gain 1. If the cell was empty, then it will be 1.
- After each cell change, the cell will light up yellow briefly.
- If 5 numbers in a row matches the Fibonacci-sequence, then the cells will light up green briefly. Afterwards, the cells will be empty again.


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
