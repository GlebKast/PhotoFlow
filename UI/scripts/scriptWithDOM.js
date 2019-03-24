class postsView {
    constructor(arr){
        if(arr) {
            this.currentUser = JSON.parse(localStorage.getItem('current_user'));
            this.numOfPosts = 0;
            for (let i = 0; i < arr.length; i++) {
                if (this.validatePost(arr[i])) {
                    this.addPost(arr[i]);
                }
            }
        } else{
            this.numOfPosts = JSON.parse(localStorage.getItem('posts_number'));
            this.currentUser = JSON.parse(localStorage.getItem('current_user'));
        }
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
        let tmp = (''+n).slice('');
        let res = '';
        for(let i = 0; i < 7 - tmp.length; i++)
            res+='0';
        for(let i = 0; i < tmp.length; i++)
            res+=tmp[i];
        return res;
    }

    addPost(post) {
        if (this.validatePost(post)) {
            this.numOfPosts++;
            localStorage.setItem('posts_number', JSON.stringify(this.numOfPosts));
            post.id = this.newID(this.numOfPosts);
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            localStorage.setItem(post.id, JSON.stringify(post));
            return true;
        } else return false;
    }

    updateLent(){
        document.getElementById('user_name').innerHTML = this.currentUser;
        document.getElementById('posts').innerHTML = '';
        let post;
        for (let i = 1; i <= this.numOfPosts ; i++) {
            post = JSON.parse(localStorage.getItem(this.newID(i)));
            if (post.display !== false) {
                document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            }
        }
    }

    editPost(id, config) {
        let post = this.getPostById(id);
        if (post && post.author === this.currentUser) {
            localStorage.removeItem(id);
            if (config.description) post.description = config.description;
            if (config.createdAt) post.createdAt = config.createdAt;
            if (config.location) post.location = config.location;
            if (config.author) post.author = config.author;
            if (config.photoLink) post.photoLink = config.photoLink;
            if(this.validatePost(post)) {
                localStorage.setItem(post.id, JSON.stringify(post));
                this.updateLent();
                return true;
            }
        }
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

class headerView{
    //ToDo
}

class filterView{
    //ToDo
}

class currentUserInfo{
    //ToDo
}

localStorage.setItem('current_user', JSON.stringify('KastG'));
localStorage.setItem('posts_number', '0');

function startTests(){
    const Posts = new postsView();

    //const Posts = new postsView(photoPosts);
   // Posts.removePost('0000001')

    Posts.addPost({id: "1",
        description: "Earth view from google number one",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-1024.jpg",
        likes: 0
    });
    Posts.addPost({id: "2",
        description: "Earth view from google number two",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "Иванов Иван",
        photoLink: "images/google-earth-view-1064.jpg",
        likes: 2
    });
    Posts.addPost({id: "3",
        description: "Earth view from google number three",
        createdAt: new Date("2019-03-15"),
        location: "Minsk, Belarus",
        author: "Tim",
        photoLink: "images/google-earth-view-1402.jpg",
        likes: 0
    });
    Posts.addPost({id: "4",
        description: "Earth view from google number four",
        createdAt: new Date("2019-03-10"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-1494.jpg",
        likes: 0
    });
    Posts.addPost({id: "5",
        description: "Earth view from google number five",
        createdAt: new Date("2019-03-11"),
        location: "Belarus",
        author: "Ivanov Ivan",
        photoLink: "images/google-earth-view-1868.jpg",
        likes: 5
    });
    Posts.addPost({id: "6",
        description: "Earth view from google number six",
        createdAt: new Date("2019-03-15"),
        location: "Minsk",
        author: "KastG",
        photoLink: "images/google-earth-view-2102.jpg",
        likes: 11
    });
    Posts.addPost({id: "7",
        description: "should be removed",
        createdAt: new Date("2019-03-11"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-2154.jpg",
        likes: 10
    });
    Posts.addPost( {id: "8",
        description: "qaqaqaqaqqaaqaq",
        createdAt: new Date("2019-03-18"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-2380.jpg",
        likes: 20
    });
    Posts.addPost({id: "9",
        description: "Earth view from google number nine",
        createdAt: new Date("2019-03-12"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-5023.jpg",
        likes: 26
    });
    Posts.addPost({id: "10",
        description: "Earth view from google number ten",
        createdAt: new Date("2019-03-13"),
        location: "Minsk, Belarus",
        author: "KastG",
        photoLink: "images/google-earth-view-5051.jpg",
        likes: 6
    });

    Posts.removePost('0000007');

    Posts.editPost('0000008', {description: "I've changed something!!!!"});

}

startTests();

