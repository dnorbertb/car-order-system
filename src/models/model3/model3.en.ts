import type { IModel } from "@/types/IModel";

export const model: IModel = {
    processTitle: 'Model 3',
    pages: [
        {
            name: 'get-started',
            title: 'Get Started',
            route: 'get-started',
            components: [
                {
                    name: 'HeadingComponent',
                    props: {
                        title: 'Configure your Tesla Model 3',
                        description: 'Please choose version'
                    }
                },
                {
                    name: 'RadioSelectComponent',
                    props: {
                        identifier: 'version',
                        items: [
                            { title: 'Model 3', description: 'Range(EPA est.): 272mi, 0-60: 5.8sec', value: 'model3' },
                            { title: 'Model 3 Long Range', description: 'Range(EPA est.): 333mi, 0-60: 4.2sec', value: 'model3lr' },
                            { title: 'Model 3 Performance', description: 'Range(EPA est.): 315mi, 0-60: 3.1sec', value: 'model3p' }
                        ]
                    }
                }
            ]
        },
        {
            name: 'autopilot',
            title: 'Autopilot',
            route: 'autopilot',
            components: [
                {
                    name: 'HeadingComponent',
                    props: {
                        title: 'Autopilot version',
                        description: 'What autopilot version do you prefer?'
                    }
                },
                {
                    name: 'TwoOptionsComponent',
                    props: {
                        identifier: 'autopilot',
                        optionOne: {
                            value: 'full',
                            title: 'Full Self-Driving Capability',
                            recomennded: true
                        },
                        optionTwo: {
                            value: 'enhanced',
                            title: 'Enhanced Autopilot',
                        }
                    }
                },
                {
                    name: 'DescriptionComponent',
                    props: {
                        title: 'Enhanced Autopilot Contains',
                        items: [
                            'Navigate on Autopilot',
                            'Auto Lane Change',
                        ]
                    }
                },
                {
                    name: 'DescriptionComponent',
                    props: {
                        title: 'Full Self-Driving Capability Contains',
                        items: [
                            'All functionality of Enhanced Autopilot',
                            'Autopark',
                            'Summon',
                            'Smart Summon',
                            'All functionality of Basic Autopilot and Enhanced Autopilot',
                            'Traffic Light and Stop Sign Control'
                        ]
                    }
                }
            ]
        },
        {
            name: 'body-color',
            title: 'Body Color',
            route: 'body-color',
            components: [
                {
                    name: 'HeadingComponent',
                    props: {
                        title: 'Body Color',
                        description: 'Please choose a body color'
                    }
                },
                {
                    name: 'ColorSelectComponent',
                    props: {
                        identifier: 'paint-color',
                        items: [
                            { name: 'white', href: 'https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_White.png' },
                            { name: 'gray', href: 'https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_MidnightSilver.png' },
                            { name: 'blue', href: 'https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_Blue.png' },
                            { name: 'black', href: 'https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_Black.png' },
                            { name: 'red', href: 'https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Paint_Red.png' }
                        ]
                    }
                },
            ]
        },
        {
            name: 'interior-color',
            title: 'Interior Color',
            route: 'interior-color',
            components: [
                {
                    name: 'HeadingComponent',
                    props: {
                        title: 'Interior Color',
                        description: 'Please choose an interior color'
                    }
                },
                {
                    name: 'ColorSelectComponent',
                    props: {
                        identifier: 'interior-color',
                        items: [
                            { name: 'white', href: 'https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Interior_White.png' },
                            { name: 'black', href: 'https://digitalassets.tesla.com/image/upload/f_auto,q_auto/prod/coin/static_assets/MODEL3/UI/Interior_Black.png' },
                        ]
                    }
                },
            ]
        },
        {
            name: 'accessories',
            title: 'Accessories',
            route: 'accessories',
            components: [
                {
                    name: 'HeadingComponent',
                    props: {
                        title: 'Accessories',
                        description: 'Please choose accessories'
                    }
                },
                {
                    name: 'CheckboxesComponent',
                    props: {
                        identifier: 'accessories',
                        items: [
                            { title: 'Wall Connector', value: 'WallConector' },
                            { title: 'Mobile Connector', value: 'MobileConector' },
                            { title: 'Floor mats', value: 'FloorMats' },
                        ]
                    }
                }
            ]
        }
    ]
}