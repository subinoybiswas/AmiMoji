import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const host = request.headers.get("host");
    const origin =
      request.headers.get("origin") || request.headers.get("referer");

    if (!host || !origin || !origin.includes(host)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const commits = await octokit.paginate(octokit.repos.listCommits, {
      owner: "subinoybiswas",
      repo: "AmiMoji",
    });
    return NextResponse.json(
      { commits },
      {
        status: 200,
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}
