"use client";

import { AgentMemoryTab } from "@iblai/iblai-js/web-containers/next";

export default function AgentMemoryPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <AgentMemoryTab
        labels={{
          header: {title: "Research memory"},
          subTabs: {
            personal: "Researcher context",
            shared: "Lab knowledge",
          },
          sharedMemory: {
            addButton: "Add lab knowledge",
            empty: {title: "No shared research context yet"},
          },
        }}
      />
    </div>
  );
}
