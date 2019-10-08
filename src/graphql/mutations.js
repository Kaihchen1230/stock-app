/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    email
    balance
    stocks {
      items {
        id
        shareAmount
        symbol
        priceOpen
        dayHigh
        dayLow
        dayClose
      }
      nextToken
    }
    stockTransaction {
      items {
        id
        shareAmount
        stockSymbol
        cost
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    email
    balance
    stocks {
      items {
        id
        shareAmount
        symbol
        priceOpen
        dayHigh
        dayLow
        dayClose
      }
      nextToken
    }
    stockTransaction {
      items {
        id
        shareAmount
        stockSymbol
        cost
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    email
    balance
    stocks {
      items {
        id
        shareAmount
        symbol
        priceOpen
        dayHigh
        dayLow
        dayClose
      }
      nextToken
    }
    stockTransaction {
      items {
        id
        shareAmount
        stockSymbol
        cost
      }
      nextToken
    }
  }
}
`;
export const createStock = `mutation CreateStock($input: CreateStockInput!) {
  createStock(input: $input) {
    id
    owner {
      id
      username
      email
      balance
      stocks {
        nextToken
      }
      stockTransaction {
        nextToken
      }
    }
    shareAmount
    symbol
    priceOpen
    dayHigh
    dayLow
    dayClose
  }
}
`;
export const updateStock = `mutation UpdateStock($input: UpdateStockInput!) {
  updateStock(input: $input) {
    id
    owner {
      id
      username
      email
      balance
      stocks {
        nextToken
      }
      stockTransaction {
        nextToken
      }
    }
    shareAmount
    symbol
    priceOpen
    dayHigh
    dayLow
    dayClose
  }
}
`;
export const deleteStock = `mutation DeleteStock($input: DeleteStockInput!) {
  deleteStock(input: $input) {
    id
    owner {
      id
      username
      email
      balance
      stocks {
        nextToken
      }
      stockTransaction {
        nextToken
      }
    }
    shareAmount
    symbol
    priceOpen
    dayHigh
    dayLow
    dayClose
  }
}
`;
export const createTransaction = `mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    id
    owner {
      id
      username
      email
      balance
      stocks {
        nextToken
      }
      stockTransaction {
        nextToken
      }
    }
    shareAmount
    stockSymbol
    cost
  }
}
`;
export const updateTransaction = `mutation UpdateTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    id
    owner {
      id
      username
      email
      balance
      stocks {
        nextToken
      }
      stockTransaction {
        nextToken
      }
    }
    shareAmount
    stockSymbol
    cost
  }
}
`;
export const deleteTransaction = `mutation DeleteTransaction($input: DeleteTransactionInput!) {
  deleteTransaction(input: $input) {
    id
    owner {
      id
      username
      email
      balance
      stocks {
        nextToken
      }
      stockTransaction {
        nextToken
      }
    }
    shareAmount
    stockSymbol
    cost
  }
}
`;
