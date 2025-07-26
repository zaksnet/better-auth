"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redirect to introduction page
    window.location.href = "/introduction";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-muted-foreground">
          If you&apos;re not redirected automatically,{" "}
          <a href="/introduction" className="text-primary underline">
            click here
          </a>
        </p>
      </div>
    </div>
  );
}
