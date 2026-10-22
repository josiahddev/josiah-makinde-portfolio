import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// In production the admin saves to GitHub, which needs a GitHub App's keys.
// Until they're set in Vercel, answer politely instead of failing the build.
const configured =
  process.env.NODE_ENV === "development" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && process.env.KEYSTATIC_SECRET,
  );

const notReady = () =>
  new Response("Site admin isn't set up yet: add the KEYSTATIC_* environment variables in Vercel, then redeploy.", {
    status: 503,
  });

const handler = configured ? makeRouteHandler({ config }) : null;

export const GET = handler?.GET ?? notReady;
export const POST = handler?.POST ?? notReady;
