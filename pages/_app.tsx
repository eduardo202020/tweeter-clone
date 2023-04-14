import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";
import EditModal from "@/components/modals/EditModal";

interface AppProps {
  Component: FC;
  pageProps: Record<any, any>;
}

const App: FC<AppProps> = ({
      Component,
      pageProps: { session, ...pageProps },
    }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;
