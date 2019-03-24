class postsLent {

    constructor() {
        this.numOfPosts = JSON.parse(localStorage.getItem('posts_number'));
        this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    }

    sortPostsByDate(somePost) {
        somePost.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let res = photoPosts.slice();
        this.sortPostsByDate(res);
        if (filterConfig.author) {
            res = res.filter(function (post) {
                return post.author.toLowerCase() === filterConfig.author.toLowerCase();
            });
        }
        if (filterConfig.createdAt) {
            res = res.filter(function (post) {
                return post.createdAt.getDate() === new Date(filterConfig.createdAt).getDate();
            });
        }
        res = res.slice(skip, skip + top);
        return res;
    }

    getPostById(idP) {
        return JSON.parse(localStorage.getItem(idP));
    }

    validatePost(post) {
        if (!post.id) {
            console.log("no post id");
            return false;
        }

        if (!post.description) {
            return false;
        } else {
            if (post.description.length >= 200) {
                console.log("wrong post:" + post.id + " description length: " + post.description.length);
                return false;
            }
        }
        if (!post.createdAt) {
            console.log("wrong post id");
            return false;
        }
        if (!post.author) {
            console.log("wrong post author");
            return false;
        } else if (post.author.length === 0) {
            console.log("wrong post author length");
            return false;
        }
        if (!post.location) {
            console.log("wrong post location");
            return false;
        }
        if (!post.photoLink) {
            console.log("wrong post photoLink");
            return false;
        }
        return true;
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

    newID(n) {
        if (localStorage.getItem(n) === null) {
            return n;
        }
        return n+'.1';
    }

    addPost(post) {
        if (this.validatePost(post)) {
            this.numOfPosts++;
            localStorage.setItem('posts_number', JSON.stringify(this.numOfPosts));
            post.id = this.newID(this.numOfPosts);
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            localStorage.setItem(post.id, JSON.stringify(post));
            //photoPosts.push(post);
            return true;
        } else return false;
    }

    editPost(postID, editConfig) {
        let clone = this.getPostById(postID);
        if (clone.author === this.currentUser) {
            if (editConfig.id) clone.id = editConfig.id;
            if (editConfig.description) clone.description = editConfig.description;
            if (editConfig.createdAt) clone.createdAt = editConfig.createdAt;
            if (editConfig.location) clone.location = editConfig.location;
            if (editConfig.author) clone.author = editConfig.author;
            if (editConfig.photoLink) clone.photoLink = editConfig.photoLink;
            if (editConfig.likes) clone.photoLink = editConfig.photoLink;
            if (this.validatePost(clone)) {
                  localStorage.removeItem(postID);
                  localStorage.setItem(clone.id, JSON.stringify(clone));
            }
        } else
            return false;
    }

    removePost(id) {
        if(this.getPostById(id).author === this.currentUser) {
            let clone = this.getPostById(id);
            localStorage.removeItem(id);
            clone.display = false;
            document.getElementById(id).innerHTML = '';
            localStorage.setItem( clone.id, JSON.stringify(clone));
            return true;
        }

        return false;
    }

    

}

localStorage.setItem('current_user', JSON.stringify('KastG'));
localStorage.setItem('posts_number', '0');

function startTests(){
    const Posts = new postsLent();
    Posts.addPost({id: "1",
        description: "Earth view from google number one",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-1024.jpg",
        likes: 0});
    Posts.addPost({id: "2",
        description: "Earth view from google number two",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "Иванов Иван",
        photoLink: "images/google-earth-view-1064.jpg",
        likes: 2});
    Posts.addPost({id: "3",
        description: "Earth view from google number three",
        createdAt: new Date("2019-03-15"),
        location: "Minsk, Belarus",
        author: "Tim",
        photoLink: "images/google-earth-view-1402.jpg",
        likes: 0});
    Posts.addPost({id: "4",
        description: "Earth view from google number four",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-1494.jpg",
        likes: 0});

}

startTests();

