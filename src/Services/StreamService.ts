import PostMapper from "@/Mappers/PostMapper";
import ReactionMapper from "@/Mappers/ReactionMapper";
import ReplyMapper from "@/Mappers/ReplyMapper";
import CommentsViewModel from "@/ViewModels/CommentsViewModel";
import PostViewModel from "@/ViewModels/PostViewModel";
import ReactionViewModel from "@/ViewModels/ReactionViewModel";
import axios from "axios";
import CommentsMapper from '../Mappers/CommentsMapper';

export default class StreamService {
    private page_id:string = '1851042494957707';
    private live_video_id:string = '5740901949305056';
    private access_token:string = 'EAALEUBAJuFgBABVZBhWAlllwBfI4RWeSNCuXLbaUmTqNnUSoBXnc5a2esGhehZB7znf7ibctJS1ySdRWiPpWENfowEHFV0vpB1KMEhAFD4GwdsJGHJgya0IjcEvfI3tHSBV67dJ4R6Kl4XeTleQXKGvBa34sswdt39qKVZC01jsZChMus17oG3qyV5AJmRWZAl2PxUmZC1rgZDZD';

    /**
     * Get comments for the live video using id
     * @returns CommentsViewModel
     */
    public async getComments(): Promise<CommentsViewModel[]> {
        return await axios.get(`https://graph.facebook.com/${this.live_video_id}/comments?fields=from,attachment,message,parent,like_count&order=chronological&access_token=${this.access_token}`)
        .then(res => CommentsMapper.ApiToViewList(res.data.data));
    }

    /**
     * Get replies for the comment using id
     * @param models comments model
     */
    public getReplies(models: any) {
        models.forEach(async(item:any) => {
            await axios.get(`https://graph.facebook.com/${item.id}/comments?fields=from,attachment,message,parent,like_count&order=chronological&access_token=${this.access_token}`)
            .then(res => {
                if (res.data.data.length !== 0) {
                    item.replies = ReplyMapper.ApiToViewList(res.data.data)
                    item.replies.forEach(async(element:any) => {
                        await axios.get(`https://graph.facebook.com/${element.user.id}/picture?redirect=false&access_token=${this.access_token}`)
                        .then(res => {
                            element.user.imageUrl = res.data.data.url
                        })
                        .catch(err => {
                            console.log(err);
                        });
                        
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
            if (item.replies.length != 0) {
                item.replies.forEach(async(elem:any) => {
                    await axios.get(`https://graph.facebook.com/${elem.id}/reactions?access_token=${this.access_token}`)
                    .then(res => {
                        if (res.data.data.length !== 0) {
                            elem.reaction = ReactionMapper.ApiToViewList(res.data.data);
                        }
                        else {
                            elem.reaction = '';
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                });
            }
            await axios.get(`https://graph.facebook.com/${item.id}/reactions?access_token=${this.access_token}`)
            .then(res => {
                if (res.data.data.length !== 0) {
                    item.reaction = ReactionMapper.ApiToViewList(res.data.data);
                }
                else {
                    item.reaction = '';
                }
            })
            .catch(err => {
                console.log(err);
            });
        })
        
    }

    /**
     * Get user image related to the comment
     * @param models comments model
     */
    public getUserImage(models: any) {
        models.forEach(async(element:any) => {
            await axios.get(`https://graph.facebook.com/${element.user.id}/picture?redirect=false&access_token=${this.access_token}`)
            .then(res => {
                element.user.imageUrl = res.data.data.url
            })
            .catch(err => {
                console.log(err);
            });
        });
        
    }

    /**
     * Get comments reactions
     * @param models comments models
     */
    public getReactions(models:any) {
        models.forEach(async(element:any) => {
            await axios.get(`https://graph.facebook.com/${element.id}/reactions?access_token=${this.access_token}`)
            .then(res => {
                if (res.data.data.length !== 0) {
                    element.reaction = ReactionMapper.ApiToViewList(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    /**
     * Get summary about the live video post
     * @returns post summary model
     */
    public async getPostSummary(): Promise<PostViewModel> {
        return await axios.get(`https://graph.facebook.com/${this.live_video_id}?fields=title,description,live_views,reactions&access_token=${this.access_token}`)
        .then(res =>
            PostMapper.ApiToView(res.data)
        );
    }

    /**
     * Get post summary reactions
     * @returns return reaction view model
     */
    public async getPostReactions() {
        return await axios.get(`https://graph.facebook.com/${this.live_video_id}/reactions?access_token=${this.access_token}`)
        .then(res =>
            ReactionMapper.ApiToViewList(res.data.data)
        );
    }

    /**
     * Gets the video url using the live video id
     * @returns video link source url
     */
    public async getVideoLink()  {
        return await axios.get(`https://graph.facebook.com/${this.live_video_id}?fields=video{source}&access_token=${this.access_token}`)
        .then(res =>
            res.data.video.source
        );
    }
}