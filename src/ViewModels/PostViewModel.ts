import ReactionViewModel from "./ReactionViewModel";

export default class PostViewModel {
    public id: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public viewCount: number | undefined;
    public likeCount: number | undefined;
    public reaction: ReactionViewModel[] | undefined;
    public videoUrl: string | undefined;

    constructor() {
        this.id = '';
        this.title = '';
        this.description = '';
        this.viewCount = 0;
        this.likeCount = 0;
        this.reaction = [];
        this.videoUrl = '';
    }
}