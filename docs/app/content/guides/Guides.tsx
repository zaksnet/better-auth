import { Section } from "../shared/components";
import { UsersTable } from "./users-table/UsersTable";
// TODO: Extract migration guides in future phases

export function Guides() {
  return (
    <Section id="guides" title="Guides">
      <UsersTable />
      {/* TODO: Add MigratingExistingUsers, Migration guides, etc. */}
    </Section>
  );
}