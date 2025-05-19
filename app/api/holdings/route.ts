import { NextResponse } from "next/server";

export async function GET() {
  const holdings = [
    {
      coin: "USDC",
      coinName: "USDC",
      logo: "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
      currentPrice: 85.41,
      totalHolding: 0.0015339999999994802,
      averageBuyPrice: 1.5863185433764244,
      stcg: {
        balance: 0.0015339999999994802,
        gain: 0.12858552735441697,
      },
      ltcg: {
        balance: 0,
        gain: 0,
      },
    },
    {
      coin: "WETH",
      coinName: "Polygon PoS Bridged WETH (Polygon POS)",
      logo: "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332",
      currentPrice: 211756,
      totalHolding: 0.00023999998390319965,
      averageBuyPrice: 3599.856066001555,
      stcg: {
        balance: 0.00023999998390319965,
        gain: 49.957471193511736,
      },
      ltcg: {
        balance: 0,
        gain: 0,
      },
    },
    {
      coin: "SOL",
      coinName: "SOL (Wormhole)",
      logo: "https://coin-images.coingecko.com/coins/images/22876/large/SOL_wh_small.png?1696522175",
      currentPrice: 14758.01,
      totalHolding: 3.469446951953614e-17,
      averageBuyPrice: 221.42847548590152,
      stcg: {
        balance: 3.469446951953614e-17,
        gain: 5.043389846205066e-13,
      },
      ltcg: {
        balance: 0,
        gain: 0,
      },
    },
    {
      coin: "WPOL",
      coinName: "Wrapped POL",
      logo: "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
      currentPrice: 22.08,
      totalHolding: 2.3172764293128694,
      averageBuyPrice: 0.5227311370876341,
      stcg: {
        balance: 1.3172764293128694,
        gain: 49.954151016387065,
      },
      ltcg: {
        balance: 1,
        gain: 20,
      },
    },
    {
      coin: "MATIC",
      coinName: "Polygon",
      logo: "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745",
      currentPrice: 22.22,
      totalHolding: 2.75145540184285,
      averageBuyPrice: 0.6880274617804887,
      stcg: {
        balance: 2.75145540184285,
        gain: 59.244262152615974,
      },
      ltcg: {
        balance: 0,
        gain: 0,
      },
    },
    {
      coin: "ETH",
      coinName: "Ethereum",
      logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      currentPrice: 216182,
      totalHolding: 0.0004211938732637162,
      averageBuyPrice: 3909.792264648455,
      stcg: {
        balance: 0.0004211938732637162,
        gain: 89.40775336229291,
      },
      ltcg: {
        balance: 0,
        gain: 0,
      },
    },
    {
      coin: "BTC",
      coinName: "Bitcoin",
      logo: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      currentPrice: 85320.15,
      totalHolding: 0.63776,
      averageBuyPrice: 55000,
      stcg: {
        balance: 0.338,
        gain: -20000,
      },
      ltcg: {
        balance: 0.3,
        gain: 2400,
      },
    },
    {
      coin: "USDT",
      coinName: "Tether",
      logo: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
      currentPrice: 85.42,
      totalHolding: 3096.54,
      averageBuyPrice: 1.15,
      stcg: {
        balance: 2011.23,
        gain: -1200,
      },
      ltcg: {
        balance: 902.47,
        gain: 2400,
      },
    },
  ];

  return NextResponse.json(holdings);
}
