// CSS
import '@/css/globals.css';

// Core Layout Components
import Layout from "@/components/layout/Layout"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

// Authentication provider
import { SessionProvider } from '@/utils/sessionContext';

function ToDoList({ Component, pageProps }) {
  
  return (
    <>
      <SessionProvider>
        <Header />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </SessionProvider>
    </>
  );
}
  
 /* ToDoList.getInitialProps = async () => {
    
  };*/
  
  export default ToDoList;