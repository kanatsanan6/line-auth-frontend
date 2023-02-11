import { useRouter } from "next/router";
import { LINE_LOGIN_URL } from "@/utils/login";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <main>
        <button
          onClick={() => {
            router.push(LINE_LOGIN_URL);
          }}
        >
          Line Login
        </button>
      </main>
    </>
  );
}
