export default class ReactionViewModel {
    public id: string | undefined;
    public name: string | undefined;
    public type: string | undefined;

    constructor() {
        this.id = '00000000-0000-0000-0000-000000000000';
        this.name = '';
        this.type = '';
    }
}