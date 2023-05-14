import '../styles/app.scss'
import Header from './header'
import { ContextProvider } from '@/components/Clients'

export const metadata = {
  title: 'Todo App',
  description: 'This is a Todo App Project for Next.js Series',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
      <ContextProvider>
    <>
    {/* Header and children both are passed as a children in ContextProvider */}
    <Header />  
      {children}
    </>
      </ContextProvider>
      </body>
    </html>
  )
}
