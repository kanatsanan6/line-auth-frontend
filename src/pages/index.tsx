import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { LINE_LOGIN_URL } from "@/utils/login";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <main className={styles.main}>
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
