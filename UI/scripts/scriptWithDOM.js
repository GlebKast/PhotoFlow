class PostsView {
    constructor(previousPosts){
        if(!previousPosts) {
            this.postsCollection = new PostCollection();
            this.numOfPosts = 0;
            this.currentUser = JSON.parse(localStorage.getItem('current_user'));
        }
        else{
            this.postsCollection = new PostCollection(previousPosts);
            this.numOfPosts = this.postsCollection._photoPosts.length;
            this.currentUser = JSON.parse(localStorage.getItem('current_user'));

            for(let i = 0; i < this.numOfPosts; i++) {
                let post = this.postsCollection._photoPosts[i];
                document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
                localStorage.setItem(post.id, JSON.stringify(post));
            }
            this.updateLent();
        }
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
                    <button class="like"></button>
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

    createNewID(id) {
        id = id+'1';
        if(localStorage.getItem(id) !== null){
            id = id+'1';
        }
        return id;
    }

    addPost(post) {
        if (this.postsCollection._validatePost(post)) {
            this.numOfPosts++;
            localStorage.setItem('posts_number', JSON.stringify(this.numOfPosts));
            let index = this.postsCollection._photoPosts.findIndex((item)=>(item.id === post.id));
            if(index !== -1){
                post.id = this.createNewID(post.id);
            }
            this.postsCollection.addPost(post);
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            localStorage.setItem(post.id, JSON.stringify(post));
            this.updateLent();
            return true;
        }
        return false;
    }

    updateLent(){
        document.getElementById('user_name').innerHTML = this.currentUser;
        document.getElementById('posts').innerHTML = '';
        let post;

        for(let i = 0; i < this.postsCollection._photoPosts.length; i++){
            post = this.postsCollection._photoPosts[i];
                 if (post) {
                     document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
                 }
        }
    }

    editPost(id, config) {
        let post = this.postsCollection.getPostById(id);
        if (post && post.author === this.currentUser) {
            if (this.postsCollection.editPost(id, config)) {
                localStorage.setItem(id, JSON.stringify(this.postsCollection.getPostById(id)));
                this.updateLent();
                return true;
            }
            return false;
        }
    }

    removePost(id) {
        if(this.postsCollection.getPostById(id).author === this.currentUser) {
            this.postsCollection.removePost(id);
            localStorage.removeItem(id);
            document.getElementById(id).remove();
            this.updateLent();
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
localStorage.setItem('posts_number', '0');

function startTests(){
    const User = new CurrentUserInfoView();
    User.viewCurrentUserName();
    User.viewCurrentUserIcon();
    let Posts = new PostsView(photoPosts);

    // Posts.addPost({id: "1",
    //     description: "Earth view from google number two",
    //     createdAt: new Date("2019-03-10"),
    //     location: "Minsk, Belarus",
    //     author: "KastG",
    //     photoLink: "images/google-earth-view-1024.jpg",
    //     likes: "0"
    // });
    //
    // Posts.addPost({id: "2",
    //     description: "Earth view from google number two",
    //     createdAt: new Date("2019-03-10"),
    //     location: "Minsk, Belarus",
    //     author: "Иванов Иван",
    //     photoLink: "images/google-earth-view-1064.jpg",
    //     likes: "2"
    // });
    //
    // Posts.addPost({id: "3",
    //     description: "Earth view from google number three",
    //     createdAt: new Date("2019-03-15"),
    //     location: "Minsk, Belarus",
    //     author: "Tim",
    //     photoLink: "images/google-earth-view-1402.jpg",
    //     likes: "0"
    // });
    // Posts.addPost({id: "4",
    //     description: "Earth view from google number four",
    //     createdAt: new Date("2019-03-10"),
    //     location: "Minsk, Belarus",
    //     author: "KastG",
    //     photoLink: "images/google-earth-view-1494.jpg",
    //     likes: "0"
    // });
    // Posts.addPost({id: "5",
    //     description: "Earth view from google number five",
    //     createdAt: new Date("2019-03-11"),
    //     location: "Belarus",
    //     author: "Ivanov Ivan",
    //     photoLink: "images/google-earth-view-1868.jpg",
    //     likes: "5"
    // });
    // Posts.addPost({id: "6",
    //     description: "Earth view from google number six",
    //     createdAt: new Date("2019-03-15"),
    //     location: "Minsk",
    //     author: "KastG",
    //     photoLink: "images/google-earth-view-2102.jpg",
    //     likes: "11"
    // });
    // Posts.addPost({id: "7",
    //     description: "should be removed",
    //     createdAt: new Date("2019-03-11"),
    //     location: "Minsk, Belarus",
    //     author: "KastG",
    //     photoLink: "images/google-earth-view-2154.jpg",
    //     likes: "10"
    // });
    // Posts.addPost({id: "8",
    //     description: "qaqaqaqaqqaaqaq",
    //     createdAt: new Date("2019-03-18"),
    //     location: "Minsk, Belarus",
    //     author: "KastG",
    //     photoLink: "images/google-earth-view-2380.jpg",
    //     likes: "20"
    // });
    // Posts.addPost({id: "9",
    //     description: "Earth view from google number nine",
    //     createdAt: new Date("2019-03-12"),
    //     location: "Minsk, Belarus",
    //     author: "KastG",
    //     photoLink: "images/google-earth-view-5023.jpg",
    //     likes: "26"
    // });
    // Posts.addPost({id: "10",
    //     description: "Earth view from google number ten",
    //     createdAt: new Date("2019-03-13"),
    //     location: "Minsk, Belarus",
    //     author: "KastG",
    //     photoLink: "images/google-earth-view-5051.jpg",
    //     likes: "6"
    // });

    console.log(Posts.postsCollection._photoPosts);

    Posts.editPost("6", {description:"kyky"});

    Posts.addPost({id: "10",
            description: "added post",
            createdAt: new Date("2020-03-13"),
            location: "NY",
            author: "KastGleb",
            photoLink: "images/google-earth-view-5051.jpg",
            likes: "100500"
        });

    Posts.removePost("7");

    console.log(Posts.postsCollection._photoPosts);

}

startTests();

