import { Section, Subsection } from "../shared/components";
import ConvexBetterAuthGuideNextjs from "@/app/content/llm-instructions/nextjs/convex-better-auth-guide-nextjs";

export function LLMInstructions() {
  return (
    <Section id="llm-instructions" title="LLM Instructions">
      <Subsection id="llm-instructions-nextjs" title="Convex Better Auth Next.js">
        <ConvexBetterAuthGuideNextjs />
      </Subsection>
    </Section>
  );
}