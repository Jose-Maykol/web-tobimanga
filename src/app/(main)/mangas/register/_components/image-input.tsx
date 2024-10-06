import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Upload } from 'lucide-react'
import { useState } from 'react'

interface ImageInputProps {
	onChange: ({ contentType, data }: { contentType: string; data: string }) => void
	className?: string
	placeholder: string
	id: string
}

export default function ImageInput({ onChange, placeholder, className, id }: ImageInputProps) {
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>,
		setPreview: (preview: string | null) => void
	) => {
		const file = event.target.files?.[0]
		console.log(file)
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				console.log(reader)
				setPreview(reader.result as string)
				onChange({
					contentType: file.type,
					data: reader.result as string
				})
			}
			reader.readAsDataURL(file)
		}
	}
	return (
		<div className={cn('rounded-md border p-4 h-72', className)}>
			{imagePreview ? (
				<div className='relative aspect-[3/4] w-full overflow-hidden rounded-md  max-h-full'>
					<img src={imagePreview} alt='preview' className='object-cover w-full h-full' />
					<Button
						size='sm'
						className='absolute bottom-2 right-2'
						onClick={() => setImagePreview(null)}
					>
						Cambiar
					</Button>
				</div>
			) : (
				<label
					htmlFor={id}
					className='flex flex-col items-center justify-center h-full cursor-pointer'
				>
					<Upload className='size-8 text-muted-foreground' />
					<span className='mt-2 text-sm text-muted-foreground text-center'>{placeholder}</span>
					<Input
						id={id}
						type='file'
						accept='image/*'
						onChange={(e) => handleImageUpload(e, setImagePreview)}
						className='hidden'
					/>
				</label>
			)}
		</div>
	)
}
