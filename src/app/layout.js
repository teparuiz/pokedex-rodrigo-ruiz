import { Providers } from './provider';
import '../style/globals.css';

export const metadata = {
    title: 'Pokédex',
    description: 'Pokédex realizado por Rodrigo Ruiz',
  }
   
export default function RootLayout({ children }) {
  return <html lang="en">
  <body>
    <Providers>
    <div id="root">{children}</div>
    </Providers>
  </body>
</html>

}
