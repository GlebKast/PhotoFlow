class PostCollection {

    constructor(previousPosts) {
        if(!previousPosts) {
            this._photoPosts = [];
        }
        else{
            this._photoPosts = previousPosts;
        }
    }

    _sortPostsByDate(post) {
        post.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return -1;
            } else {
                return 1;
            }
        });
    }

    _validatePost(post) {
        try {
            if (!post.id) {
                throw "No ID";
            }
            if (!post.description) {
                throw "No description";
            } else {
                if (post.description.length >= 200) {
                    throw "Wrong description";
                }
            }
            if (!post.createdAt) {
                throw "No date";
            }
            if (!post.author) {
                throw "No author";
            } else
                if (post.author.length === 0) {
               throw "Wrong author name";
            }
            if (!post.location) {
                throw "No location";
            }
            if (!post.photoLink) {
                throw "No photo link";
            }
            if (!post.likes) {
                throw "No likes field";
            }
        }
        catch(e){
            console.log("Validation error. " + e);
            return false;
        }
        return true;
    }

    addPost(post) {
        try {
            if (this._validatePost(post)) {
                this._photoPosts.push(post);
                return true;
            }
        }
        catch (e) {
            console.log("addPost error. " + e);
            return false;
        }
    }

    getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let res = photoPosts.slice();
        this._sortPostsByDate(res);
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

    getPostById(id) {
        let t = false;
        for(let i = 0; i < this._photoPosts.length; i++)
        {
            if(this._photoPosts[i].id === id){
                return this._photoPosts[i];
            }
        }
        console.log("no such id found");
        return t;
    }

    editPost(postID, post) {
        let clone = Object.assign({}, this.getPostById(postID));
        if (post.description) clone.description = post.description;
        if (post.createdAt) clone.createdAt = post.createdAt;
        if (post.location) clone.location = post.location;
        if (post.author) clone.author = post.author;
        if (post.photoLink) clone.photoLink = post.photoLink;
        if (post.likes) clone.likes = post.likes;
        if (this._validatePost(clone)) {
            for (let i = 0; i < this._photoPosts.length; i++) {
                if (this._photoPosts[i].id === postID) {
                    this._photoPosts[i] = clone;
                    return true;
                }
            }
        }
        return false;
    }

    removePost(id) {
        let index = this._photoPosts.findIndex((item)=>(item.id === id));
        if (index === -1) {
            console.log("no post with such id");
            return false;
        }
        this._photoPosts.splice(index, 1);
        return true;
    }
}


