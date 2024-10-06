import apiAuth from '@/interceptors/api-auth-interceptor'
import { ApiDemography } from '@/types/demography'

class DemographyAdapter {
	public async getAllDemographics(): Promise<{ demographics: { value: string; label: string }[] }> {
		const response = await apiAuth.get(`/demographics`)
		const { demographics } = response.data
		return {
			demographics: demographics.map((demography: Partial<ApiDemography>) => ({
				value: demography.id,
				label: demography.name
			}))
		}
	}
}

export const demographyAdapter = new DemographyAdapter()
