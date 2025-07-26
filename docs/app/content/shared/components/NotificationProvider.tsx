"use client";

import { Notification } from "./Notification";
import { AlertTriangle } from "lucide-react";

export function NotificationProvider() {
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md space-y-3">
      {/* Alpha Status Notification */}
      <Notification
        id="alpha-status"
        type="warning"
        title="Alpha Status"
        icon={<AlertTriangle className="size-5 text-yellow-600 dark:text-yellow-400" />}
      >
        <p className="mb-3">
          The Convex Better Auth component is in early alpha development.
        </p>
        <p>
          If your use case isn&apos;t supported, a plugin doesn&apos;t work,
          you hit a bug, etc, please open a{" "}
          <a
            href="https://github.com/get-convex/better-auth/issues"
            className="underline hover:no-underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub issue
          </a>{" "}
          or reach out on{" "}
          <a
            href="https://discord.gg/convex"
            className="underline hover:no-underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          .
        </p>
      </Notification>

      {/* Release Notes Notification */}
      <Notification
        id="release-0-7-0"
        type="success"
        title="🎉 v0.7.0 Released!"
        icon={<div className="text-2xl">🎉</div>}
      >
        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">Highlights</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>All plugins supported!</li>
              <li>
                A proper internal database adapter that works dynamically for
                generic plugin support
              </li>
              <li>
                CORS handling improved and no longer on by default - no more
                cors errors for full stack apps 🙌
              </li>
              <li>
                Internal schema now generated with Better Auth for improved
                stability
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-sm">
              This comes with some breaking changes - check out the{" "}
              <a href="/guides#migrate-0-6-to-0-7" className="underline hover:no-underline font-medium">
                migration guide
              </a>{" "}
              to upgrade.
            </p>

            <p className="text-sm">
              <a
                href="https://discord.com/channels/1019350475847499849/1365754331873415440/1392921192154923169"
                className="underline hover:no-underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the full announcement on Discord
              </a>{" "}
              for detailed notes and future plans.
            </p>
          </div>
        </div>
      </Notification>
    </div>
  );
}