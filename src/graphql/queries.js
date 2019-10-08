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
      stockTransaction {
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
export const listStocks = `query ListStocks(
  $filter: ModelStockFilterInput
  $limit: Int
  $nextToken: String
) {
  listStocks(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner {
        id
        username
        email
        balance
      }
      shareAmount
      symbol
      priceOpen
      dayHigh
      dayLow
      dayClose
    }
    nextToken
  }
}
`;
export const getTransaction = `query GetTransaction($id: ID!) {
  getTransaction(id: $id) {
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
export const listTransactions = `query ListTransactions(
  $filter: ModelTransactionFilterInput
  $limit: Int
  $nextToken: String
) {
  listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      owner {
        id
        username
        email
        balance
      }
      shareAmount
      stockSymbol
      cost
    }
    nextToken
  }
}
`;
