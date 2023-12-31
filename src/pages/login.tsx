import { josa } from "josa";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import Head from "next/head";
import { getToken } from "next-auth/jwt";
import { getProviders, signIn } from "next-auth/react";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>로그인 - nabi-simple-note</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="w-full max-w-xl rounded-xl border-2 border-primary p-4">
          <h1 className="mb-4 text-3xl font-bold">만나서 반가워요 👋</h1>
          <div className="grid gap-2">
            {Object.values(providers).map((provider) => (
              <button
                className="btn btn-primary btn-block capitalize"
                onClick={() => void signIn(provider.id)}
                key={provider.name}
              >
                {josa(
                  `${
                    { GitHub: "GitHub", Google: "Google", Kakao: "카카오톡" }[
                      provider.name
                    ] ?? "아무거나"
                  }#{으로} 로그인하기`
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const providers = await getProviders();
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
    props: {
      providers: providers ?? [],
    },
  };
};
