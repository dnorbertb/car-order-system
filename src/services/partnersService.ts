import type { IPartnerData } from "@/types/IPartner"
import { BACKEND_URL } from "@/env"

export const partnersService = {
    async get(partnerIdentifier: string): Promise<IPartnerData | undefined> {
        try {
            const req = await fetch(BACKEND_URL + '/partner/get/' + partnerIdentifier);
            const json = await req.json();
            return json.data as IPartnerData;
        } catch (error) {
            console.log(error)
            return undefined;
        }

    }
}