import "@/styles/globals.css";
import "@blocknote/core/style.css";
import "react-toastify/dist/ReactToastify.css";
import { createStore } from "jotai";
import { DevTools } from "jotai-devtools";
import { type AppType } from "next/app";
import dynamic from "next/dynamic";
import { JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import { type Session } from "next-auth";

import ChannelTalkProvider from "@/components/ChannelTalk";
import { env } from "@/env.mjs";
import * as gTag from "@/hooks/useGtag";
import { api } from "@/utils/api";

const SessionProvider = dynamic(() =>
  import("next-auth/react").then((mod) => mod.SessionProvider)
);

const Provider = dynamic(() => import("jotai").then((mod) => mod.Provider));

const ToastContainer = dynamic(() =>
  import("react-toastify").then((mod) => mod.ToastContainer)
);

const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"));

const jetbrainsMono = JetBrains_Mono({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
});

const customStore = createStore();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  gTag.useGTag();

  return (
    <div className={jetbrainsMono.className}>
      <Provider store={customStore}>
        <Head>
          <title>nabi-simple-note</title>
          <meta
            name="description"
            content="(아마도) 세상에서 제일 간단한 노트 앱"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={env.NEXT_PUBLIC_BASE_URL} />
          <meta property="og:site_name" content="nabi-simple-note" />
          <meta key="og:title" property="og:title" content="nabi-simple-note" />
          <meta
            property="og:description"
            content="(아마도) 세상에서 제일 간단한 노트 앱"
          />
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
          />
        </Head>
        <SessionProvider session={session}>
          <ChannelTalkProvider>
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </ChannelTalkProvider>
        </SessionProvider>
        <DevTools />
      </Provider>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="colored"
      />
      {env.NEXT_PUBLIC_GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </div>
  );
};

export default api.withTRPC(MyApp);
