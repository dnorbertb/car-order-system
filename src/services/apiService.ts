import type { IRequestResponse } from "@/types/IRequestResponse"



export const getConfig = async (partner_identifier: string, order_type: string, language: string): Promise<IRequestResponse<undefined>> => {
    return { success: true, data: undefined }
}

