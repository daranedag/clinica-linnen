import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "clinica-linnen-bff",
    timestamp: new Date().toISOString(),
  });
}
