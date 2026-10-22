"use client";

import { useEffect, useState } from "react";
import {
  AgentDatasetsTab,
  AgentSettingsProvider,
  useAgentSettings,
} from "@iblai/iblai-js/web-containers/next";
import {
  useGetMentorSettingsQuery,
  useGetRbacPermissionsMutation,
} from "@iblai/iblai-js/data-layer";

export default function AgentDatasetsPage() {
  const settings = useAgentSettings();
  const {tenantKey, mentorId, username} = settings;
  const [grants, setGrants] = useState<object>({});
  const [getRbacPermissions] = useGetRbacPermissionsMutation();
  const {data} = useGetMentorSettingsQuery({
    mentor: mentorId,
    org: tenantKey,
    // @ts-expect-error userId is accepted by the platform at runtime.
    userId: username,
  });
  const mentorDbId = (data as {mentor_id?: number} | undefined)?.mentor_id;

  useEffect(() => {
    if (!mentorDbId) return;
    getRbacPermissions({
      requestBody: {
        platform_key: tenantKey,
        resources: [`/mentors/${mentorDbId}/documents/`],
      },
    })
      .unwrap()
      .then((permissions) => setGrants({...permissions}))
      .catch(() => setGrants({}));
  }, [getRbacPermissions, mentorDbId, tenantKey]);

  return (
    <div className="flex h-full flex-col bg-white">
      <AgentSettingsProvider {...settings} rbacPermissions={grants}>
        <AgentDatasetsTab
          maxUploadSizeMb={50}
          labels={{
            header: {
              title: "Research library",
              description: "Add papers, datasets, repositories, and trusted sources for this research agent.",
            },
            addResource: {button: "Add research source"},
          }}
        />
      </AgentSettingsProvider>
    </div>
  );
}
