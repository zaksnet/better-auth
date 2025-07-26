"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelectedVariant } from "@/app/code-block-variant-store";

export function CopyLLMInstructionsButton() {
  const [copied, setCopied] = useState(false);
  const selectedFramework = useSelectedVariant("framework") || "nextjs";

  const getGuideContent = (framework: string): string => {
    switch (framework) {
      case "nextjs":
        return `### These are steps to setup better auth with convex and nextjs
# 1. Install the dependencies
\`\`\`bash
npm install @convex-dev/better-auth
npm install better-auth@1.2.12 --save-exact
npm install convex@latest
\`\`\`
# 2. Add a convex/auth.config.ts file to configure Better Auth as an authentication provider
\`\`\`ts
// convex/auth.config.ts
export default {
  providers: [
    {
      // Your Convex site URL is provided in a system
      // environment variable
      domain: process.env.CONVEX_SITE_URL,
      // Application ID has to be "convex"
      applicationID: "convex",
    },
  ],
};
\`\`\`
# 3. Generate a secret for encryption and generating hashes.
TIP: Make sure to check which port your Next.js app is running on (typically 3000) and adjust the BETTER_AUTH_URL accordingly
\`\`\`bash
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
npx convex env set BETTER_AUTH_URL=http://localhost:3000
\`\`\`
# 4. Add the Convex site URL environment variable to the .env.local file created by npx convex dev. It will be picked up by your framework dev server.
\`\`\`bash
# Deployment used by \`npx convex dev\`
CONVEX_DEPLOYMENT=dev:adjective-animal-123 # team: team-name, project: project-name
NEXT_PUBLIC_CONVEX_URL=https://adjective-animal-123.convex.cloud
# Same as NEXT_PUBLIC_CONVEX_URL but ends in .site
NEXT_PUBLIC_CONVEX_SITE_URL=https://adjective-animal-123.convex.site
\`\`\`
# 5. First, add a users table to your schema. Name it whatever you like. Better Auth has its own user table that tracks basic user data, so your application user table only needs fields specific to your app (or none at all).
\`\`\`ts
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
export default defineSchema({
  users: defineTable({
    // Fields are optional
  }),
});
\`\`\`
# 6. Create your Better Auth instance.
\`\`\`ts
// lib/auth.ts
import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { betterAuthComponent } from "../convex/auth";
import { type GenericCtx } from "../convex/_generated/server";
// You'll want to replace this with an environment variable
const siteUrl = "http://localhost:3000";
export const createAuth = (ctx: GenericCtx) =>
  // Configure your Better Auth instance here
  betterAuth({
    // All auth requests will be proxied through your next.js server
    baseURL: siteUrl,
    database: convexAdapter(ctx, betterAuthComponent),
    // Simple non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Convex plugin is required
      convex(),
    ],
  });
\`\`\`
\`\`\`ts
// convex/auth.ts
import {
  BetterAuth,
  type AuthFunctions,
  type PublicAuthFunctions,
} from "@convex-dev/better-auth";
import { api, components, internal } from "./_generated/api";
import { query } from "./_generated/server";
import type { Id, DataModel } from "./_generated/dataModel";
// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;
const publicAuthFunctions: PublicAuthFunctions = api.auth;
// Initialize the component
export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
  publicAuthFunctions,
});
// These are required named exports
export const {
  createUser,
  updateUser,
  deleteUser,
  createSession,
  isAuthenticated,
} = betterAuthComponent.createAuthFunctions<DataModel>({
  // Must create a user and return the user id
  onCreateUser: async (ctx, user) => {
    return ctx.db.insert("users", {});
  },
  // Delete the user when they are deleted from Better Auth
  onDeleteUser: async (ctx, userId) => {
    await ctx.db.delete(userId as Id<"users">);
  },
});
// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get user data from Better Auth - email, name, image, etc.
    const userMetadata = await betterAuthComponent.getAuthUser(ctx);
    if (!userMetadata) {
      return null;
    }
    // Get user data from your application's database
    // (skip this if you have no fields in your users table schema)
    const user = await ctx.db.get(userMetadata.userId as Id<"users">);
    return {
      ...user,
      ...userMetadata,
    };
  },
});
\`\`\`
# 7. Create a Better Auth client instance for interacting with the Better Auth server from your client.
\`\`\`ts
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
export const authClient = createAuthClient({
  plugins: [convexClient()],
});
\`\`\`
# 8. Register Better Auth route handlers on your Convex deployment.
\`\`\`ts
// convex/http.ts
import { httpRouter } from "convex/server";
import { betterAuthComponent } from "./auth";
import { createAuth } from "../lib/auth";
const http = httpRouter();
betterAuthComponent.registerRoutes(http, createAuth);
export default http;
\`\`\`
# 9. Set up route handlers to proxy auth requests from your framework server to your Convex deployment.
\`\`\`ts
// app/api/auth/[...all]/route.ts
import { nextJsHandler } from "@convex-dev/better-auth/nextjs";
export const { GET, POST } = nextJsHandler();
\`\`\`
# 10. Wrap your app with the ConvexBetterAuthProvider component.
\`\`\`ts
// app/ConvexClientProvider.tsx
"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      {children}
    </ConvexBetterAuthProvider>
  );
}
\`\`\``;
      case "react":
        return `### These are steps to setup better auth with convex and react
# 1. Install the dependencies
\`\`\`bash
npm install @convex-dev/better-auth
npm install better-auth@1.2.12 --save-exact
npm install convex@latest
\`\`\`
# 2. Add the component to your application
\`\`\`ts
// convex/convex.config.ts
import { defineApp } from 'convex/server'
import betterAuth from '@convex-dev/better-auth/convex.config'
const app = defineApp()
app.use(betterAuth)
export default app
\`\`\`
# 3. Add a convex/auth.config.ts file to configure Better Auth as an authentication provider
\`\`\`ts
// convex/auth.config.ts
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,
      applicationID: "convex",
    },
  ],
};
\`\`\`
# 4. Generate a secret for encryption and generating hashes
\`\`\`bash
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
npx convex env set BETTER_AUTH_URL=http://localhost:5173
\`\`\`
# 5. Add environment variables to .env.local
\`\`\`bash
VITE_CONVEX_URL=https://adjective-animal-123.convex.cloud
VITE_CONVEX_SITE_URL=https://adjective-animal-123.convex.site
\`\`\`
# 6. Add users table to schema
\`\`\`ts
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
export default defineSchema({
  users: defineTable({
    // Fields are optional
  }),
});
\`\`\`
# 7. Create Better Auth instance
\`\`\`ts
// src/lib/auth.ts
import { convexAdapter } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { betterAuthComponent } from "../../convex/auth";
import { type GenericCtx } from "../../convex/_generated/server";
const siteUrl = "http://localhost:5173";
export const createAuth = (ctx: GenericCtx) =>
  betterAuth({
    trustedOrigins: [siteUrl],
    database: convexAdapter(ctx, betterAuthComponent),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      convex(),
      crossDomain({ siteUrl }),
    ],
  });
\`\`\`
# 8. Create auth client
\`\`\`ts
// src/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { convexClient, crossDomainClient } from "@convex-dev/better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_CONVEX_SITE_URL,
  plugins: [
    convexClient(),
    crossDomainClient(),
  ],
});
\`\`\`
# 9. Set up providers in main app
\`\`\`ts
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConvexReactClient } from "convex/react";
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
import { authClient } from "@/lib/auth-client";
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      <App />
    </ConvexBetterAuthProvider>
  </React.StrictMode>
);
\`\`\``;
      case "tanstack":
        return `### These are steps to setup better auth with convex and tanstack start
# 1. Install the dependencies
\`\`\`bash
npm install @convex-dev/better-auth
npm install better-auth@1.2.12 --save-exact
npm install convex@latest
\`\`\`
# 2. Add the component to your application
\`\`\`ts
// convex/convex.config.ts
import { defineApp } from 'convex/server'
import betterAuth from '@convex-dev/better-auth/convex.config'
const app = defineApp()
app.use(betterAuth)
export default app
\`\`\`
# 3. Generate secrets and set environment variables
\`\`\`bash
npx convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)
npx convex env set BETTER_AUTH_URL=http://localhost:3000
\`\`\`
# 4. Add environment variables to .env.local
\`\`\`bash
VITE_CONVEX_URL=https://adjective-animal-123.convex.cloud
VITE_CONVEX_SITE_URL=https://adjective-animal-123.convex.site
\`\`\`
# 5. Create auth configuration and wrap app with provider
[Add TanStack-specific setup instructions here]`;
      default:
        return "";
    }
  };

  const handleCopy = async () => {
    try {
      const content = getGuideContent(selectedFramework);
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const frameworkDisplayName = {
    react: "React",
    nextjs: "Next.js", 
    tanstack: "TanStack Start"
  }[selectedFramework] || "Next.js";

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "shadow-sm border border-primary/20"
      )}
      title={`Copy LLM instructions for ${frameworkDisplayName}`}
    >
      {copied ? (
        <>
          <Check className="size-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="size-4" />
          Copy LLM Instructions
        </>
      )}
    </button>
  );
}