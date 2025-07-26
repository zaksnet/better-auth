import { Section, P, ContentHeading } from "../shared/components";
import { SigningIn } from "./signing-in/SigningIn";
import { Authorization } from "./authorization/Authorization";
import { ServerSide } from "./server-side/ServerSide";

export function BasicUsage() {
  return (
    <Section id="basic-usage" title="Basic Usage">
      <P>
        Follow the{" "}
        <a
          href="https://www.better-auth.com/docs/basic-usage"
          className="underline"
        >
          Better Auth documentation
        </a>{" "}
        for basic usage. The Convex component provides a compatibility layer
        so things generally work as expected.
      </P>

      <P>
        Some things that do work differently with this component are
        documented here.
      </P>

      <SigningIn />
      <Authorization />
      <ServerSide />
      
      <ContentHeading id="basic-usage-that-is-it" title="That's it!" />
      <P>
        That&apos;s it! You should now have a working authentication system.
      </P>
      <P>
        Check out the{" "}
        <a href="https://www.better-auth.com/docs" className="underline">
          Better Auth docs
        </a>{" "}
        for more information on how to use Better Auth.
      </P>
    </Section>
  );
}