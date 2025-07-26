import { stripIndent } from "common-tags";
import { Subsection, P, Code, CodeBlock, Callout, ContentHeading } from "../../shared/components";

export function UsersTable() {
  return (
    <Subsection id="guides-users-table" title="Users table">
      <P>
        The Better Auth component has it&apos;s own tables in it&apos;s own
        space in your Convex project, like all Convex components. This means
        the Better Auth user table is separate from your application tables.
      </P>
      <P>
        Because of this, the Better Auth component requires that you create
        your own users table for your application. This table can have
        whatever fields you like, while the component user table keeps basic
        info such as email, verification status, two factor, etc.
      </P>
      <ContentHeading id="guides-user-creation" title="User creation" />
      <P>
        When Better Auth creates a user, it will first run an
        <Code>onCreateUser</Code> hook where you will create your user and
        return the id. Better Auth then creates it&apos;s own user record
        and sets a relation to the provided id.
      </P>
      <P>
        The id you return will be the canonical user id. It will be
        referenced in the session and in the jwt claims provided to Convex.
      </P>
      <P>
        <Code>onCreateUser</Code> is required for keeping your users table
        transactionally synced with the Better Auth user table. There are
        also optional <Code>onUpdateUser</Code> and{" "}
        <Code>onDeleteUser</Code> hooks. These hooks can also do whatever
        else you want for each event.
      </P>

      <Callout>
        <Code>onUpdateUser</Code> and <Code>onDeleteUser</Code> run when
        Better Auth updates a user, but any updates to your own app&apos;s
        users table will not trigger it. If you are syncing fields from
        Better Auth (eg., <Code>email</Code>) to your own users table, it is
        recommended to make changes to those fields through Better Auth so
        things stay synced.
      </Callout>

      <CodeBlock
        language="typescript"
        filename="convex/auth.ts"
        code={stripIndent`
            import { asyncMap } from "convex-helpers";
            import { betterAuthComponent } from "./auth";
            import { Id } from "./_generated/dataModel";

            export const { createUser, deleteUser, updateUser, createSession } =
              betterAuthComponent.createAuthFunctions({

                // Must create a user and return the user id
                onCreateUser: async (ctx, user) => {
                  const userId = await ctx.db.insert("users", {
                    someField: "foo",
                  });

                  // The user id must be returned
                  return userId;
                },

                onUpdateUser: async (ctx, user) => {
                  await ctx.db.patch(user.userId as Id<"users">, {
                    someField: "foo",
                  });
                },

                // Delete the user when they are deleted from Better Auth
                // You can also omit this and use Better Auth's
                // auth.api.deleteUser() function to trigger user deletion
                // from within your own user deletion logic.
                onDeleteUser: async (ctx, userId) => {
                  await ctx.db.delete(userId as Id<"users">);

                  // Optionally delete any related data
                },
              });
            `}
      />
      <ContentHeading
        id="guides-indexing-on-metadata"
        title="Indexing on metadata"
      />
      <P>
        You may have a need for accessing user metadata in your own user
        table, such as indexing by email or some other metadata. You can
        copy user metadata to your own user table on creation, and use the{" "}
        optional <Code>onUpdateUser</Code> hook to update your user table
        when a user&apos;s metadata changes. Note that changes you make to
        the synced field will not be reflected in the Better Auth user
        table.
      </P>
      <P>
        The user hooks are run in the same transaction as Better Auth&apos;s
        user create/update/delete operations, so if your hook throws an
        error or fails to write, the entire operation is guaranteed to fail,
        ensuring the user tables stay synced.
      </P>

      <CodeBlock
        language="typescript"
        filename="convex/auth.ts"
        code={stripIndent`
            // ...

            export const { createUser, deleteUser, updateUser } =
              betterAuthComponent.createAuthFunctions({
                onCreateUser: async (ctx, user) => {
                  // Copy the user's email to the application users table.
                  return await ctx.db.insert("users", {
                    email: user.email,
                  });
                },

                onUpdateUser: async (ctx, user) => {
                  // Keep the user's email synced
                  await ctx.db.patch(user.userId as Id<"users">, {
                    email: user.email,
                  });
                },

                // ...
              });
            `}
      />
    </Subsection>
  );
}