import { useRouter } from "next/router";
import { useEffect } from "react";

import { getAccessToken } from "@/utils/login";

export default function Callback() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) return;

    getAccessToken(code as string);

    router.push("/");
  }, [code]);

  return (
    <>
      <h1>Callback Page</h1>
    </>
  );
}
