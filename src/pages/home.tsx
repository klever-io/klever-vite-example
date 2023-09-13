"use client";

import { Button } from "../components/button";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <form className="max-w-xs p-4 border border-slate-300 rounded-md shadow-sm">
        <div>
          <h1 className="font-bold text-lg">Klever Extension Playground</h1>
          <h3 className="text-sm">Sign in with extension</h3>
        </div>
        <div className="mt-2 mb-6 h-[1px] w-full bg-slate-300" />

        <Button type="submit">Sign in</Button>
      </form>
    </main>
  );
}
