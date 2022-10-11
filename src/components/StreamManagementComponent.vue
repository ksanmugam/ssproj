<template>
    <div>
        <div class="root">
            <div class="wrapper-main">
                <div class="left-align">
                    <h2 class="bold center" style="color:#3aac5d;">Welcome to my podcast</h2>
                </div>
            </div>
        </div>
        <center>
            <video width="720" height="480" controls>
                <source :src="videoLink">
                <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank"
                    >supports HTML5 video</a
                >
                </p>
            </video>
        </center>
        <div class="root">
            <div class="wrapper-main">
                <div  class="left-align">
                    <h3  class="bold center" style="color:#3aac5d;">Summary</h3>
                    <p v-if="this.postSummary.title === '' || this.postSummary.title === undefined">Title: No title</p>
                    <p v-else>Title: {{this.postSummary.title}}</p>
                    <p v-if="this.postSummary.description === '' || this.postSummary.description === undefined">Description: No description</p>
                    <p v-else>Decription: {{this.postSummary.description}}</p>
                    <p>Reactions: {{this.postSummary.reaction?.length}}</p>
                </div>
            </div>
        </div>
        <!-- <iframe allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen="true" frameborder="0" height="720" scrolling="no" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F1851042494957707%2Fvideos%2F3381949048692862%2F&width=1280" style="border:none;overflow:hidden" width="1280"></iframe> -->
        <!-- <div>
            <ul class="list-group" v-for="item in comments" :key="item.id">
                <li class="list-group-item">{{ item }}</li>
                <img :src="item.user.imageUrl"/>
            </ul>
        </div> -->
        <!-- <img :src="image"/> -->

        <div class="root">
            <div class="wrapper-main">
                <div class="left-align">
                    <h3 class="bold center" style="color:#3aac5d;">Comments</h3>
                </div>
            </div>
        </div>
        <div v-for="item in comments" :key="item.id" style="border-style:ridge;border-color:thistle;">
            <div class="row">
                <div class="column">
                    <div class="row">
                        <img :src="item.user.imageUrl"/><span class="userName">{{item.user.fullName}}</span></div>
                        <div v-if="item.message != ''" class="row">Message: {{item.message}}</div>
                        <div v-if="item.likeCount != 0" class="row">Likes: {{item.likeCount}}</div>
                        <div v-for="(react, i) in item.reaction" :key="react.id" class="row">
                            <div v-if="react !== '' && item.reaction?.length != 0 && item.reaction?.find(l => l.type !== 'LIKE')">
                                Reaction: {{item.reaction?.filter(l => l.type !== 'LIKE').length}} {{item.reaction[i].type}}
                            </div>
                        </div>
                        <span v-if="item.attachment.imageUrl != undefined">Attachment: </span><img width="100" height="100" v-if="item.attachment.imageUrl != undefined" class="row" :src="item.attachment.imageUrl"/>
                </div>
            </div>
            <div v-for="reply in item.replies" :key="reply.id" class="row" style="margin-left: 20px;border-style:groove;border-color:limegreen">
                <div class="column">
                    <div class="row">
                        <img :src="reply.user.imageUrl"/><span class="userName">{{reply.user.fullName}}</span></div>
                        <div v-if="reply.message != ''" class="row">Message: {{reply.message}}</div>
                        <div v-if="reply.likeCount != 0" class="row">Likes: {{reply.likeCount}}</div>
                        <div v-for="(react, i) in reply.reaction" :key="react.id" class="row">
                            <div v-if="reply.reaction?.length != 0 && reply.reaction?.find(l => l.type !== 'LIKE')">
                                Reaction: {{reply.reaction?.filter(l => l.type !== 'LIKE').length}} {{reply.reaction[i].type}}
                            </div>
                        </div>
                        <span v-if="reply.attachment.imageUrl != undefined">Attachment: </span><img width="100" height="100" v-if="reply.attachment.imageUrl != undefined" class="row" :src="reply.attachment.imageUrl"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import ReplyMapper from '@/Mappers/ReplyMapper';
import ReplyViewModel from '@/ViewModels/ReplyViewModel';
import PostViewModel from '@/ViewModels/PostViewModel';
import StreamService from '@/Services/StreamService';

export default {
  name: 'StreamManagementComponent',
  data() {
        return {
            donkey: '',
            comments: [] as any,
            replies: [] as any,
            videoLink: 'https://scontent.fmel3-1.fna.fbcdn.net/v/t42.1790-2/10000000_451140663667246_2412177098971510555_n.mp4?_nc_cat=101&vs=7a0bf976fc220d79&_nc_vs=HBksFQAYJEdJQ1dtQUF1YWdCZlQ1b0JBQnQzaDQ5S3hua2hidjRHQUFBRhUAAsgBABUAGCRHTmM1alJKNmN2UV9Fa01DQUVTcWkwRXZDWEExYnY0R0FBQUYVAgLIAQAoRC1pICclcycgLWZiX3VzZV90ZmR0X3N0YXJ0dGltZSAxIC1pICclcycgLWMgY29weSAtbW92ZmxhZ3MgZmFzdHN0YXJ0KweIEnByb2dyZXNzaXZlX3JlY2lwZQExDXN1YnNhbXBsZV9mcHMAEHZtYWZfZW5hYmxlX25zdWIAIG1lYXN1cmVfb3JpZ2luYWxfcmVzb2x1dGlvbl9zc2ltAChjb21wdXRlX3NzaW1fb25seV9hdF9vcmlnaW5hbF9yZXNvbHV0aW9uAB11c2VfbGFuY3pvc19mb3JfdnFtX3Vwc2NhbGluZwARZGlzYWJsZV9wb3N0X3B2cXMAFQAlABwAACbS4Marsf2pAhUCKAJDMxgDYXYxHBdAfKQo9cKPXBgZZGFzaF9saXZlX21kX2ZyYWdfMl92aWRlbxIAGBh2aWRlb3MudnRzLmNhbGxiYWNrLnByb2Q4ElZJREVPX1ZJRVdfUkVRVUVTVBsKiBVvZW1fdGFyZ2V0X2VuY29kZV90YWcGb2VwX3NkE29lbV9yZXF1ZXN0X3RpbWVfbXMBMAxvZW1fY2ZnX3J1bGUKd2FzbGl2ZV9zZBNvZW1fcm9pX3JlYWNoX2NvdW50ATARb2VtX2lzX2V4cGVyaW1lbnQADG9lbV92aWRlb19pZA82OTc4ODQ5ODUwMTg3OTASb2VtX3ZpZGVvX2Fzc2V0X2lkDzQ5MDcxMDk5Mjk4Njg5NhVvZW1fdmlkZW9fcmVzb3VyY2VfaWQPNjU1MjY0MDEyODg0MDA5HG9lbV9zb3VyY2VfdmlkZW9fZW5jb2RpbmdfaWQQMTQ0Mjk4NzIwOTUyMTIzNg52dHNfcmVxdWVzdF9pZAAlBBwAJb4BGweIAXMENjY4MgJjZAoyMDIyLTEwLTExA3JjYgEwA2FwcA5TdHJlYW1TaGFyay5pbwJjdAlCUk9BRENBU1QTb3JpZ2luYWxfZHVyYXRpb25fcwc0NTguMjY2AnRzFHByb2dyZXNzaXZlX29yZGVyaW5nAA%3D%3D&ccb=1-7&_nc_sid=2593b2&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9zZCJ9&_nc_ohc=ewyJ3efDkKEAX8UXMsQ&_nc_ht=scontent.fmel3-1.fna&edm=AF-kadkEAAAA&oh=00_AT8l256pHty_ILPc2JWyKIc-zqvtvM-M0jpea4sAVQtytg&oe=6346A5AD&_nc_rid=498645997581916',
            postSummary: new PostViewModel(),
            replyMapper: new ReplyMapper(),
            service: new StreamService(),
            image: "https://scontent.fmel3-1.fna.fbcdn.net/v/t39.1997-6/65991904_2400370113377156_1597197946816823296_n.png?_nc_cat=1&ccb=1-7&_nc_sid=ac3552&_nc_ohc=XlgO-M-d3ZIAX8ISZES&_nc_ht=scontent.fmel3-1.fna&edm=AJ8zDikEAAAA&oh=00_AT9HIjxFlg5R7xYHW7Xhmu38XjVXiKsOt-C-zeVrkYO76Q&oe=63484377",
        };
  },
  async mounted() {
    this.comments = await this.service.getComments();
    this.postSummary = await this.service.getPostSummary();
    this.service.getReactions(this.comments);
    this.service.getReplies(this.comments);
    this.service.getUserImage(this.comments);
    this.postSummary.reaction = await this.service.getPostReactions();
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: auto; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

img {
  vertical-align:middle;
}

.userName {
    padding-left: 10px;;
}

</style>
