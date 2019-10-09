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
        shareAmount
        symbol
        purchasedPrice
        dayOpen
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    username
    email
    balance
    stocks {
      items {
        id
        shareAmount
        symbol
        purchasedPrice
        dayOpen
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    username
    email
    balance
    stocks {
      items {
        id
        shareAmount
        symbol
        purchasedPrice
        dayOpen
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
export const onCreateStock = `subscription OnCreateStock {
  onCreateStock {
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
    purchasedPrice
    dayOpen
    dayHigh
    dayLow
    dayClose
  }
}
`;
export const onUpdateStock = `subscription OnUpdateStock {
  onUpdateStock {
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
    purchasedPrice
    dayOpen
    dayHigh
    dayLow
    dayClose
  }
}
`;
export const onDeleteStock = `subscription OnDeleteStock {
  onDeleteStock {
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
    purchasedPrice
    dayOpen
    dayHigh
    dayLow
    dayClose
  }
}
`;
export const onCreateTransaction = `subscription OnCreateTransaction {
  onCreateTransaction {
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
export const onUpdateTransaction = `subscription OnUpdateTransaction {
  onUpdateTransaction {
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
export const onDeleteTransaction = `subscription OnDeleteTransaction {
  onDeleteTransaction {
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
