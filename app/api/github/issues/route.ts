import { Octokit } from "@octokit/rest";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    
    const host = request.headers.get("host");
    const origin =
      request.headers.get("origin") || request.headers.get("referer");

    if (!host || !origin || !origin.includes(host)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/issues", {
      owner: "subinoybiswas",
      repo: "AmiMoji",
    });
    const issues = data;
    return NextResponse.json({ issues });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  // Runs a report with multiple metrics.
}
