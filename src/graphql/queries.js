/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    balance
    stocks {
      items {
        id
        symbol
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      email
      balance
      stocks {
        nextToken
      }
      transctions {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getStock = `query GetStock($id: ID!) {
  getStock(id: $id) {
    id
    symbol
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
export const listStocks = `query ListStocks(
  $filter: ModelStockFilterInput
  $limit: Int
  $nextToken: String
) {
  listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      symbol
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
}
`;
export const getTransaction = `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
    id
    stockName {
      id
      symbol
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
export const listTransactions = `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      stockName {
        id
        symbol
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
    nextToken
  }
}
`;
