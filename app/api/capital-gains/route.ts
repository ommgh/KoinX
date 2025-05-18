//file: app/api/capital-gains/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // This is our mock data from the provided capitalGains-api-response.txt
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
