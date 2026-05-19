// src/app/api/products/route.ts
import { NextResponse } from "next/server";

const API_BASE = process.env.API_BASE_URL!;

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "20";
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  params.set("page", page);
  params.set("limit", limit);
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const res = await fetch(`${API_BASE}/products?${params.toString()}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
};