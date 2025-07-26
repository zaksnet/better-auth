import { Section } from "../shared/components";
import { Hono } from "./hono/Hono";

export function Integrations() {
  return (
    <Section id="integrations" title="Integrations">
      <Hono />
    </Section>
  );
}