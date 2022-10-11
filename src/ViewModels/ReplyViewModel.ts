import AttachmentViewModel from "./AttachmentViewModel";
import ReactionViewModel from "./ReactionViewModel";
import UserViewModel from "./UserViewModel";

export default class ReplyViewModel {
    public id: string | undefined;
    public user: UserViewModel | undefined;
    public replies: ReplyViewModel[] | undefined;
    //public createdTime: string | undefined;
    public message: string | undefined;
    public likeCount: number | undefined;
    public attachment: AttachmentViewModel | undefined;

    constructor() {
        this.id = '00000000-0000-0000-0000-000000000000';
        this.user = new UserViewModel();
        this.replies = [];
        //this.createdTime = '';
        this.message = '';
        this.likeCount = 0;
        this.attachment = new AttachmentViewModel();
    }
}