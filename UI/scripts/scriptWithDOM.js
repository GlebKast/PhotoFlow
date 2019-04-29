class PostsView {
    constructor() {
        this.postsCollection = new PostCollection(JSON.parse(localStorage.getItem('posts')));
        this.numOfPosts = JSON.parse(localStorage.getItem('posts_number'));
        this.currentUser = JSON.parse(localStorage.getItem('current_user'));
        for (let i = 0; i < this.numOfPosts; i++) {
            let post = this.postsCollection._photoPosts[i];
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
        }
        this.updateLent();
    }

    getPostByID(id){
        return this.postsCollection.getPostById(id);
    }

    createHTMLPost(post) {
        if (this.currentUser === post.author) {
            return `
            <div class="post" id="${post.id}">
                <div class="post_head">
                    <div class="post_creator" >
                        ${post.author}
                    </div>
                    <div class="right_post_head">
                        <div class="post_time">
                            ${post.createdAt}
                        </div>
                        <div class="post_place">
                            ${post.location}
                        </div>
                    </div>
                </div>
                <img src="${post.photoLink}" alt="photo">
                <div class="post_buttons">
                    <button class="like"</button>
                    <button class="edit"></button>
                    <button class="delete"></button>
                </div>
                <div class="numOfLikes">Likes: ${post.likes}</div>
                <div class="description">
                    ${post.description}
                </div>
            </div>`;
        }
        return `
        <div class="post" id="${post.id}">
                <div class="post_head">
                    <div class="post_creator" >
                        ${post.author}
                    </div>
                    <div class="right_post_head">
                        <div class="post_time">
                            ${post.createdAt}
                        </div>
                        <div class="post_place">
                            ${post.location}
                        </div>
                    </div>
                </div>
                <img src="${post.photoLink}" alt="photo">
                <div class="post_buttons">
                    <button class="like"></button>
                </div>
                <div class="numOfLikes">Likes: ${post.likes}</div>
                <div class="description">
                    ${post.description}
                </div>
            </div>`;
    }

    createNewID() {
        let nId = this.numOfPosts+1;
        if (this.getPostByID(nId)) {
            nId = nId + '1';
        }
        return nId;
    }

    addPost(post) {
        if (this.postsCollection._validatePost(post) && this.currentUser === post.author) {
            this.numOfPosts++;
            localStorage.setItem('posts_number', JSON.stringify(this.numOfPosts));
            let index = this.postsCollection._photoPosts.findIndex((item)=>(item.id === post.id));
            if(index !== -1){
                post.id = this.createNewID();
            }
            this.postsCollection.addPost(post);
            localStorage.setItem('posts', JSON.stringify(this.postsCollection._photoPosts));
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;  //this.updateLent();
            return true;
        }
        return false;
    }

    updateLent(){
        document.getElementById('posts').innerHTML = '';
        let post;
        for(let i = 0; i < this.numOfPosts; i++){
            post = this.postsCollection._photoPosts[i];
            if (this.postsCollection._validatePost(post)) {
                document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            }
        }
    }

    editPost(id, config) {
        let post = this.getPostByID(id);
        if ((post && post.author === this.currentUser) || config.likes) {
            if (this.postsCollection.editPost(id, config)) {
                localStorage.setItem('posts', JSON.stringify(this.postsCollection._photoPosts));
                this.updateLent();
                return true;
            }
            return false;
        }
    }

    removePost(id) {
        if(this.getPostByID(id).author === this.currentUser) {
            this.numOfPosts--;
            this.postsCollection.removePost(id);
            localStorage.setItem('posts', JSON.stringify(this.postsCollection._photoPosts));
            localStorage.setItem('posts_number', JSON.stringify(this.numOfPosts));
            document.getElementById(id).remove();   //this.updateLent();
            return true;
        }
        return false;
    }
}


class CurrentUserInfoView{
    viewCurrentUserName(){
        document.getElementById('current_user').innerHTML =
            `<p id="user_name">${localStorage.getItem("current_user")}</p>`;
    }
    viewCurrentUserIcon(){
        document.getElementById('current_user').innerHTML =
            `<img src="icons/ava.jpg" alt="user icon"/>` + document.getElementById('current_user').innerHTML;
    }
}

localStorage.setItem('current_user', JSON.stringify('KastG'));

const User = new CurrentUserInfoView();
User.viewCurrentUserName();
User.viewCurrentUserIcon();

let Posts = new PostsView();





