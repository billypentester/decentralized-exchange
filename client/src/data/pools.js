const pools = [
    {
      id: 1,
      name: "WBTC/ETH",
      fee: 0.3,
      volume24H: '$274.70M',
      marketGap:'$8.56M',
      volume7D: '126.55M',
      tokensPicture: [
        {
          id: 1,
          name: "WBTC",
          picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3717.png"
        },
        {
          id: 2,
          name: "ETH",
          picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
        }
      ]
    },
    {
        id: 2,
        name: "USDC/ETH",
        fee: 0.05,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "USDC",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
            },
            {
                id: 2,
                name: "ETH",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            }
        ]
    },
    {
        id: 3,
        name: "USDC/ETH",
        fee: 0.3,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "USDC",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
            },
            {
                id: 2,
                name: "ETH",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            }
        ]
    },
    {
        id: 4,
        name: "DAI/USDC",
        fee: 0.01,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "DAI",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/4943.png"
            },
            {
                id: 2,
                name: "USDC",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
            }
        ]
    },
    {
        id: 5,
        name: "WBTC/ETH",
        fee: 0.05,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "WBTC",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3717.png"
            },
            {
                id: 2,
                name: "ETH",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            }
        ]
    },
    {
        id: 6,
        name: "FRAX/USDC",
        fee: 0.05,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "FRAX",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/6952.png"
            },
            {
                id: 2,
                name: "USDC",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
            }
        ]
    },
    {
        id: 7,
        name: "ETH/sETH2",
        fee: 0.3,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "ETH",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            },
            {
                id: 2,
                name: "sETH2",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/16602.png"
            }
        ]
    },
    {
        id: 8,
        name: "ETH/USDC",
        fee: 0.3,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "ETH",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            },
            {
                id: 2,
                name: "USDT",
                picture: "https://static.crypto.com/token/icons/tether/color_icon.png"
            }
        ]
    },
    {
        id: 9,
        name: "DAI/USDC",
        fee: 0.05,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "DAI",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/4943.png"
            },
            {
                id: 2,
                name: "USDC",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
            }
        ]
    },
    {
        id: 10,
        name: "WBTC/ETH",
        fee: 1,
        volume24H: '$235.70M',
        marketGap:'$807.1M',
        volume7D: '26.42M',
        tokensPicture: [
            {
                id: 1,
                name: "WBTC",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/3717.png"
            },
            {
                id: 2,
                name: "ETH",
                picture: "https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            }
        ]
    }
]

export default pools