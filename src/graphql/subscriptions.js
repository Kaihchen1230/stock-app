/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateStock = `subscription OnCreateStock($owner: String!) {
  onCreateStock(owner: $owner) {
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
export const onUpdateStock = `subscription OnUpdateStock($owner: String!) {
  onUpdateStock(owner: $owner) {
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
export const onDeleteStock = `subscription OnDeleteStock($owner: String!) {
  onDeleteStock(owner: $owner) {
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
export const onCreateTransaction = `subscription OnCreateTransaction($owner: String!) {
  onCreateTransaction(owner: $owner) {
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
export const onUpdateTransaction = `subscription OnUpdateTransaction($owner: String!) {
  onUpdateTransaction(owner: $owner) {
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
export const onDeleteTransaction = `subscription OnDeleteTransaction($owner: String!) {
  onDeleteTransaction(owner: $owner) {
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
