export interface IPageDestroySubscriber {
    id: string;
    fn: (actionType: 'next' | 'back') => boolean | Promise<boolean>;
}