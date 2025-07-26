import { Section, P, ExpandableSection, Badge } from "../shared/components";

export function WhatIsThis() {
  return (
    <Section id="what-is-this" title="What is this?">
      <P>
        This library is a{" "}
        <a href="https://www.convex.dev/components" className="underline">
          Convex Component
        </a>{" "}
        that provides an integration layer for using{" "}
        <a href="https://www.better-auth.com" className="underline">
          Better Auth
        </a>{" "}
        with{" "}
        <a href="https://www.convex.dev" className="underline">
          Convex
        </a>
        .
      </P>
      <P>
        After following the installation and setup steps below, you can use
        Better Auth in the normal way. Some exceptions will apply for certain
        configuration options, apis, and plugins.
      </P>
      <P>
        Check out the{" "}
        <a
          href="https://www.better-auth.com/docs/introduction"
          className="underline"
        >
          Better Auth docs
        </a>{" "}
        for usage information, plugins, and more.
      </P>

      <ExpandableSection 
        title="Key Features & Benefits" 
        className="mt-6"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="success">Type-safe</Badge>
            <Badge variant="info">Database Integration</Badge>
            <Badge variant="secondary">Plugin Support</Badge>
            <Badge variant="warning">Beta</Badge>
          </div>
          
          <P>
            <strong>🔒 Secure by Default:</strong> Leverages Convex's built-in security model 
            with automatic CSRF protection and secure session management.
          </P>
          
          <P>
            <strong>⚡ Performance Optimized:</strong> Real-time authentication state updates 
            through Convex's reactive queries and optimized data fetching.
          </P>
          
          <P>
            <strong>🛠️ Developer Experience:</strong> Full TypeScript support with automatic 
            type inference for user data, sessions, and authentication flows.
          </P>
          
          <P>
            <strong>🔄 Seamless Integration:</strong> Works with your existing Convex schema 
            and functions without requiring major architectural changes.
          </P>
        </div>
      </ExpandableSection>
    </Section>
  );
}