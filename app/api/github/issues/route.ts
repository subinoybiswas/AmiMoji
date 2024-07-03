import { Octokit } from "@octokit/rest";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const issues = await octokit.paginate(octokit.issues.listForRepo, {
      owner: "subinoybiswas",
      repo: "AmiMoji",
      state: "all",
    });
    return NextResponse.json(
      { issues },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  // Runs a report with multiple metrics.
}
