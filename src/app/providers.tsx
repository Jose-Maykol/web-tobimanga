import { ThemeProvider } from '@/components/ui/theme-provider';


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={true}
    >
      {children}
    </ThemeProvider>
  )
}