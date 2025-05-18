import { NextResponse } from "next/server";

export async function GET() {
  const capitalGains = {
    capitalGains: {
      stcg: {
        profits: 70200.88,
        losses: 1548.53,
      },
      ltcg: {
        profits: 5020,
        losses: 3050,
      },
    },
  };

  return NextResponse.json(capitalGains);
}
