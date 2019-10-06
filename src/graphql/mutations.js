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
        symbol
        amount
        shareAmount
        name
        price
        priceOpen
        dayHigh
        dayLow
        owner
      }
      nextToken
    }
    transctions {
      items {
        id
        owner
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
        symbol
        amount
        shareAmount
        name
        price
        priceOpen
        dayHigh
        dayLow
        owner
      }
      nextToken
    }
    transctions {
      items {
        id
        owner
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
        symbol
        amount
        shareAmount
        name
        price
        priceOpen
        dayHigh
        dayLow
        owner
      }
      nextToken
    }
    transctions {
      items {
        id
        owner
      }
      nextToken
    }
  }
}
`;
export const createStock = `mutation CreateStock($input: CreateStockInput!) {
  createStock(input: $input) {
    id
    symbol
    amount
    shareAmount
    name
    price
    priceOpen
    dayHigh
    dayLow
    owner
  }
}
`;
export const updateStock = `mutation UpdateStock($input: UpdateStockInput!) {
  updateStock(input: $input) {
    id
    symbol
    amount
    shareAmount
    name
    price
    priceOpen
    dayHigh
    dayLow
    owner
  }
}
`;
export const deleteStock = `mutation DeleteStock($input: DeleteStockInput!) {
  deleteStock(input: $input) {
    id
    symbol
    amount
    shareAmount
    name
    price
    priceOpen
    dayHigh
    dayLow
    owner
  }
}
`;
export const createTransaction = `mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    id
    stockName {
      id
      symbol
      amount
      shareAmount
      name
      price
      priceOpen
      dayHigh
      dayLow
      owner
    }
    owner
  }
}
`;
export const updateTransaction = `mutation UpdateTransaction($input: UpdateTransactionInput!) {
  updateTransaction(input: $input) {
    id
    stockName {
      id
      symbol
      amount
      shareAmount
      name
      price
      priceOpen
      dayHigh
      dayLow
      owner
    }
    owner
  }
}
`;
export const deleteTransaction = `mutation DeleteTransaction($input: DeleteTransactionInput!) {
  deleteTransaction(input: $input) {
    id
    stockName {
      id
      symbol
      amount
      shareAmount
      name
      price
      priceOpen
      dayHigh
      dayLow
      owner
    }
    owner
  }
}
`;
