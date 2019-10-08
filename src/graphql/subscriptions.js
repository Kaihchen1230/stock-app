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
    priceOpen
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
    priceOpen
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
    priceOpen
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
    stock {
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
    stock {
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
    stock {
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
  }
}
`;
