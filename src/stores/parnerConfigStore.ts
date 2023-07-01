import { partnersService } from '@/services/partnersService';
import type { IPartnerData } from '@/types/IPartner';

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePartnerConfigStore = defineStore('Parner Store', () => {

    const partnerData = ref<IPartnerData>({
        id: 0,
        text_identifier: '',
        name: '',
        logo: {
            url: '',
            alt: ''
        },
        accent_color: {
            h: 24,
            s: 100,
            l: 50
        }
    });

    const loadPartnerData = async (partnerName: string) => {
        const data = await partnersService.get(partnerName);
        partnerData.value = data;
        return data;
    };

    return {
        loadPartnerData,
        partnerData
    };
});
