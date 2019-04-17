class postButtonsController {
    static getPostId(target) {
        let post = target.parentNode;
        while (post !== this) {
            if (post.classList.contains('post')) {
                break;
            }
            post = post.parentNode;
        }
        return post.id;
    }
    static likeButtonHandle(event) {
        let arrOfLiked = JSON.parse(localStorage.getItem('likedPosts'));
        let {target} = event;
        tmp = this.getPostId(target);

        for(let i = 0; i < arrOfLiked.length; i++){
            if(arrOfLiked[i] === tmp)return;
        }

        arrOfLiked.push(tmp);
        localStorage.setItem('likedPosts', JSON.stringify(arrOfLiked));
        let lk = Posts.getPostByID(tmp).likes;
        lk++;
        Posts.editPost(tmp, {likes: lk});
    }

    static  deleteButtonHandle(event){
        let {target} = event;
        Posts.removePost(this.getPostId(target));
    }

    static editButtonHandle(event){
        let {target} = event;
        document.getElementById('postEdit').innerHTML = `
        <div class="postEdit" id="postEditID">
            <div class="fileInput">
                <input id="file-input" type="file" name="file">
            </div>
            <div class="postEditButtons">
                <button class="applyChanges">Apply</button>
                <button class="cancel">Cancel</button>
            </div>
        </div>`;

        let localListener = document.getElementById('postEdit');
        localListener.onclick = function(event) {
            if (event.target.classList.contains('cancel')) {
                document.getElementById('postEditID').remove();
            }
            if (event.target.classList.contains('applyChanges')) {
                //ToDO
            }
        }

    }
}