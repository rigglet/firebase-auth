import '../styles/globals.css'
import Layout from "../components/layout"
import { ThemeProvider } from "@material-tailwind/react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
