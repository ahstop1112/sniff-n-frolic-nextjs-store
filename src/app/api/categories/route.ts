import { NextResponse } from "next/server";
import { getCategories, WooCategory } from "@/lib/wooClient";

export const GET = async () => {
  try {
    const categories = await getCategories({
      hide_empty: true,
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.error(
      "Error fetching WooCommerce categories:",
      error?.response?.data || error?.message || error
    );
    return new NextResponse("Failed to fetch categories", { status: 500 });
  }
};