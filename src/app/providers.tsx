'use client'

import { ThemeProvider } from '@/components/ui/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { Toaster } from 'sonner'

export function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = new QueryClient()

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='dark'
			enableSystem={true}
			disableTransitionOnChange={true}
		>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			<Toaster theme='system' />
		</ThemeProvider>
	)
}
