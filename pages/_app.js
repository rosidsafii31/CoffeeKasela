import '../styles/globals.css'
import '../components/style.css'
import 'tailwindcss/tailwind.css'
import '../public/css/bootstrap.css'
import { DataProvider} from '../store/GlobalState'

function MyApp({ Component, pageProps }) {
  return (
  <DataProvider>
     <Component {...pageProps} />
  </DataProvider>
  )
}
export default MyApp
