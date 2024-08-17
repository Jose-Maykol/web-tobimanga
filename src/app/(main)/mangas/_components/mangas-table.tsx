'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Manga } from '@/types/manga'

export const columns: ColumnDef<Partial<Manga>>[] = [
	{
		accessorKey: 'title',
		header: 'Nombre',
		cell: ({ row }) => {
			return (
				<div className='capitalize flex items-center space-x-4'>
					<img
						src={row.original.imageUrl}
						alt={row.getValue('title')}
						className='w-10 h-10 rounded-lg object-cover'
					/>
					<p>{row.getValue('title')}</p>
				</div>
			)
		}
	},
	{
		accessorKey: 'chapters',
		header: () => {
			return (
				<div className='text-center'>
					<p className='font-semibold'>Capítulos</p>
				</div>
			)
		},
		cell: ({ row }) => <div className='text-center'>{row.getValue('chapters')}</div>
	},
	{
		accessorKey: 'rating',
		header: () => {
			return (
				<div className='text-center'>
					<p className='font-semibold'>Rating</p>
				</div>
			)
		},
		cell: ({ row }) => <div className='text-center'>{row.getValue('rating')}</div>
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<div className='w-full flex justify-center'>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='h-8 w-8 p-0'>
								<span className='sr-only'>Abrir menú de acciones</span>
								<MoreHorizontal className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Acciones</DropdownMenuLabel>
						<DropdownMenuItem>Ver detalles</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		}
	}
]

export function MangasTable({ data }: { data: Partial<Manga>[] }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle>Mangas registrados</CardTitle>
				<CardDescription>Administra los mangas registrados</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='w-full'>
					<div className='flex items-center pb-4'>
						<Input
							placeholder='Buscar manga'
							onChange={(event) => console.log(event.target.value)}
							className='max-w-full'
						/>
					</div>
					<div className='rounded-md border'>
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											)
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className='h-24 text-center'>
											No hay mangas registrados
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<div className='flex items-center justify-end space-x-2 py-4'>
						<div className='space-x-2'>
							<Button
								variant='outline'
								size='sm'
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
							>
								Anterior
							</Button>
							<Button
								variant='outline'
								size='sm'
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
							>
								Siguiente
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
