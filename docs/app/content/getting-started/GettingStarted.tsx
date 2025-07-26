import { Section } from "../shared/components";
import { Prerequisites } from "./prerequisites/Prerequisites";
import { Installation } from "./installation/Installation";

export function GettingStarted() {
  return (
    <Section id="getting-started" title="Getting Started">
      <Prerequisites />
      <Installation />
    </Section>
  );
}