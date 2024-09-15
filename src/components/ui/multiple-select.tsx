'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from './scroll-area'

interface MultipleSelectorProps {
	options: option[]
	placeholder: string
	value: string[]
	onChange: (value: string[]) => void
}

interface option {
	value: string
	label: string
}

export function MultipleSelector({ options, placeholder, value, onChange }: MultipleSelectorProps) {
	const [open, setOpen] = useState(false)

	const handleSetValue = (val: string) => {
		const newValue = value.includes(val) ? value.filter((item) => item !== val) : [...value, val]
		onChange(newValue)
	}

	const [contentWidth, setContentWidth] = useState<number | undefined>(undefined)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (buttonRef.current) {
			setContentWidth(buttonRef.current.offsetWidth)
		}
	}, [])

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					ref={buttonRef}
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-full justify-between h-auto'
				>
					<div className='flex flex-row gap-2 justify-start flex-wrap'>
						{value?.length
							? value.map((val, i) => (
									<div
										key={i}
										className='px-2 py-1 rounded-xl border bg-primary text-xs font-medium'
									>
										{options.find((option) => option.value === val)?.label}
									</div>
								))
							: placeholder}
					</div>
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-full min-w-full lg:w-[480px] p-0'
				style={{ width: contentWidth }}
			>
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandEmpty>No se encontraron resultados</CommandEmpty>
					<CommandGroup>
						<CommandList>
							<ScrollArea className='h-[200px]'>
								{options.map((option) => (
									<CommandItem
										key={option.value}
										value={option.value}
										onSelect={() => {
											handleSetValue(option.value)
										}}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4 stroke-primary',
												value.includes(option.value) ? 'opacity-100' : 'opacity-0'
											)}
										/>
										{option.label}
									</CommandItem>
								))}
							</ScrollArea>
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
