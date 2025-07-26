"use client";

import type * as React from "react";
import { 
  Github, 
  AlertTriangle, 
  PanelLeft, 
  Home, 
  BookOpen, 
  Play, 
  Rocket, 
  Shield, 
  Layers, 
  FileText, 
  Users, 
  ArrowRight,
  Code,
  Terminal,
  Globe
} from "lucide-react";
import VersionSelector from "./version-selector";
import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ThemeToggle } from "./theme-toggle";

const SidebarSocials = () => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip="GitHub">
        <a
          href="https://github.com/get-convex/better-auth"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Github className="size-4" />
          <span className="group-data-[collapsible=icon]:hidden">GitHub</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip="NPM">
        <a
          href="https://www.npmjs.com/package/@convex-dev/better-auth"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
          </svg>
          <span className="group-data-[collapsible=icon]:hidden">NPM</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip="Discord">
        <a
          href="https://discord.gg/convex"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
          </svg>
          <span className="group-data-[collapsible=icon]:hidden">Discord</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
);

function SidebarFooterContent() {
  const { state, toggleSidebar } = useSidebar();
  return state === "collapsed" ? (
    <>
      <SidebarSeparator className="mx-0 group-data-[collapsible=icon]:hidden" />
      <SidebarSocials />
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Theme">
            <ThemeToggle />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={toggleSidebar}
            tooltip="Expand"
            aria-label="Expand"
            className="text-muted-foreground"
          >
            <PanelLeft className="size-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  ) : (
    <>
      <div className="hidden md:block">
        <SidebarSocials />
      </div>
      <div className="mt-4 flex w-full items-center justify-between px-0.5">
        <ThemeToggle />
        <button
          onClick={toggleSidebar}
          className="flex h-7 w-7 items-center justify-center rounded-[4px] text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label="Collapse"
        >
          <PanelLeft className="size-4" />
        </button>
      </div>
    </>
  );
}

export default function DocsSidebar({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg">
                <div>
                  <div className="flex aspect-square size-8 items-center justify-center">
                    <Image
                      src="/convex-mark-black.svg"
                      alt="Convex + Better Auth"
                      className="dark:invert"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Convex + Better Auth</span>
                    <VersionSelector />
                  </div>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="no-scrollbar overflow-x-hidden">
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/introduction">
                      <Home className="size-4" />
                      <span className="text-base font-semibold">Introduction</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/introduction#what-is-this">
                      <BookOpen className="size-4" />
                      <span>What is this?</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/introduction#examples">
                      <Play className="size-4" />
                      <span>Examples</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/installation#getting-started">
                      <Rocket className="size-4" />
                      <span className="text-base font-semibold">
                        Installation
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/installation#prerequisites">
                      <Shield className="size-4" />
                      <span>Prerequisites</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/installation#installation">
                      <Terminal className="size-4" />
                      <span>Installation Steps</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/installation#install-component">Install component</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/installation#set-environment-variables">
                          Environment variables
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/installation#better-auth-instance">
                          Initialize Better Auth
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/installation#create-better-auth-client">
                          Better Auth client
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/installation#mount-handlers">Mount handlers</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/installation#setup-convex-client">
                          Convex client provider
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/usage#basic-usage">
                      <Code className="size-4" />
                      <span className="text-base font-semibold">
                        Basic Usage
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/usage#basic-usage-signing-in">
                      <Users className="size-4" />
                      <span>Signing in</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/usage#basic-usage-authorization">
                      <Shield className="size-4" />
                      <span>Authorization</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/usage#basic-usage-authorization-react">React</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/usage#basic-usage-authorization-convex-functions">
                          Convex Functions
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/usage#basic-usage-authorization-framework-server">
                          Framework server
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/usage#basic-usage-server-side">
                      <Terminal className="size-4" />
                      <span>Server side</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/usage#using-auth-api">Using auth.api</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/integrations#integrations">
                      <Layers className="size-4" />
                      <span className="text-base font-semibold">
                        Integrations
                      </span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/integrations#integrations-hono">
                          <Globe className="size-3" />
                          <span>Hono</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/guides#guides">
                      <FileText className="size-4" />
                      <span className="text-base font-semibold">Guides</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/guides#guides-users-table">
                      <Users className="size-4" />
                      <span>Users table</span>
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/guides#guides-user-creation">User creation</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <Link href="/guides#guides-indexing-on-metadata">
                          Indexing on metadata
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/guides#migrating-existing-users">
                      <ArrowRight className="size-4" />
                      <span>Migrating existing users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/guides#migrate-0-6-to-0-7">
                      <ArrowRight className="size-4" />
                      <span>Migrate 0.6 &rarr; 0.7</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/guides#migrate-0-5-to-0-6">
                      <ArrowRight className="size-4" />
                      <span>Migrate 0.5 &rarr; 0.6</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/guides#migrate-0-4-to-0-5">
                      <ArrowRight className="size-4" />
                      <span>Migrate 0.4 &rarr; 0.5</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="block md:hidden">
            <SidebarGroupContent>
              <SidebarSocials />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterContent />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="md:hidden sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 bg-background lg:h-[60px]">
          <SidebarTrigger className="size-4" />
          <div className="flex-1" />
          <a
            href="https://github.com/get-convex/better-auth"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-md px-2 md:px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Github className="md:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </header>
        <main className="flex-1 scroll-pt-14 md:scroll-pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
