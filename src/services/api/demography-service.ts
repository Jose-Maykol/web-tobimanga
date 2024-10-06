import { demographyAdapter } from '@/adapters/demography-adapter'

class DemographyService {
	async getAllDemographics() {
		const response = await demographyAdapter.getAllDemographics()
		return response
	}
}

export const demographyService = new DemographyService()
