import { type GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { josa } from "josa";
import { getToken } from "next-auth/jwt";
import { api } from "@/utils/api";

export default function Login() {
  const { data: providers } = api.auth.provider.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="w-full max-w-xl rounded-xl border-2 border-primary p-4">
        <h1 className="mb-4 text-3xl font-bold">만나서 반가워요 👋</h1>
        <div className="grid gap-2">
          {Object.values(providers ?? {}).map((provider) => (
            <button
              className="btn btn-primary btn-block capitalize"
              onClick={() => void signIn(provider.id)}
              key={provider.name}
            >
              {josa(
                `${
                  { GitHub: "GitHub" }[provider.name] ?? "아무거나"
                }#{으로} 로그인하기`
              )}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = await getToken({ req: ctx.req });

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};