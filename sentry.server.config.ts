import * as Sentry from "@sentry/nextjs";
import packageJson from "./package.json";

const dsn =
  process.env.SENTRY_DSN ??
  process.env.NEXT_PUBLIC_SENTRY_DSN ??
  "https://a42bd9224dabda0e83fe15bf650d52b1@o4511747069575168.ingest.us.sentry.io/4511747071672320";

Sentry.init({
  dsn,
  environment: process.env.NODE_ENV,
  release: packageJson.version,
  tracesSampleRate: 1.0,
  enableLogs: true,
  dataCollection: {
    userInfo: false,
    httpBodies: [],
    stackFrameVariables: false,
  },
});
