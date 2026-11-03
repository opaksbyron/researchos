import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("public showcase structure", () => {
  it("keeps public pages outside the authenticated route group", () => {
    expect(existsSync(resolve(root, "app/page.tsx"))).toBe(true);
    expect(existsSync(resolve(root, "app/demo/page.tsx"))).toBe(true);
    expect(existsSync(resolve(root, "app/case-study/page.tsx"))).toBe(true);
    expect(existsSync(resolve(root, "app/(app)/workspace/page.tsx"))).toBe(true);
    expect(existsSync(resolve(root, "app/(app)/page.tsx"))).toBe(false);
  });

  it("offers demo, case-study, source, and workspace paths", () => {
    const home = read("app/page.tsx");
    expect(home).toContain('href="/demo"');
    expect(home).toContain('href="/case-study"');
    expect(home).toContain('href="/workspace"');
    expect(home).toContain("https://github.com/opaksbyron/researchos");
  });

  it("documents every required public deployment setting", () => {
    const envExample = read(".env.example");
    expect(envExample).toContain("NEXT_PUBLIC_MAIN_TENANT_KEY=");
    expect(envExample).toContain("NEXT_PUBLIC_DEFAULT_AGENT_ID=");
    expect(envExample).toContain("NEXT_PUBLIC_AGENT_URL=");
    expect(envExample).toContain("IBLAI_API_KEY=");
    expect(envExample).not.toMatch(/IBLAI_API_KEY=\S+/);
  });
});
