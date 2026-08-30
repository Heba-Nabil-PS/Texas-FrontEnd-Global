import { NextResponse } from "next/server";
import { getTenantConfig } from "@/tenant.config";
import { getCountryData } from "@/modules/country/services/country.service";

export async function GET(request: Request) {
  const host = request.headers.get("host") ?? "";
  const tenant = getTenantConfig(host);

  try {
    const data = await getCountryData(tenant.countryId);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(error, { status: 500 });
  }
}
