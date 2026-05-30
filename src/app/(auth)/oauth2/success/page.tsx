"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { socialLogin } from "@/features/auth/api/socialLogin.api";
import { authQueryKeys } from "@/features/auth/constants/authQueryKeys";

export default function OAuth2SuccessPage() {
  return (
    <Suspense fallback={null}>
      <OAuth2Success />
    </Suspense>
  );
}

function OAuth2Success() {
  const router = useRouter();
  const qc = useQueryClient();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tempToken = searchParams.get("tempToken");
    if (!tempToken) return;

    (async () => {
      await socialLogin(tempToken);

      await qc.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });

      router.replace("/?status=social_success");
    })();
  }, [searchParams, qc, router]);

  return null;
}
