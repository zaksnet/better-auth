import { InstallationStep, P, Code, QuickTip, StepSection } from "../../shared/components";

export function Prerequisites() {
  return (
    <InstallationStep 
      id="prerequisites" 
      title="Prerequisites" 
      stepNumber={1}
      estimatedTime="2 min"
    >
      <StepSection title="What you'll need">
        <P>
          You&apos;ll first need a project on Convex where{" "}
          <Code>npx convex dev</Code> has been run on your local machine.
        </P>
        
        <QuickTip type="info">
          If you don&apos;t have a Convex project, run <Code>npm create convex@latest</Code>{" "}
          to get started, and{" "}
          <a
            href="https://docs.convex.dev/getting-started/installation"
            className="underline hover:text-primary transition-colors"
          >
            check out the docs
          </a>{" "}
          to learn more.
        </QuickTip>
      </StepSection>

      <StepSection title="Keep your dev server running">
        <QuickTip type="important">
          It&apos;s helpful to have the Convex dev server (
          <Code>npx convex dev</Code>) running in the background while setting
          up, otherwise you&apos;ll see type errors that won&apos;t resolve
          until you run it.
        </QuickTip>
      </StepSection>
    </InstallationStep>
  );
}