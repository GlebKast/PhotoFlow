var postsService = (function () {

    function sortPostsByDate(somePost) {
        somePost.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    function getPhotoPosts(skip = 0, top = 10, filterConfig, filterStringAuthor, filterStringDate) {
        var res = photoPosts;
        sortPostsByDate(res);
        if(filterConfig === "author"){
            res = res.filter(function (post) {
                return post.author.toLowerCase() === filterStringAuthor.toLowerCase();
            });
        }
        if(filterConfig === "date"){
            res = res.filter(function (post) {
                return post.createdAt.getMonth() === new Date(filterStringDate).getMonth();
            });
        }
        res = res.slice(skip, skip+top);
        return res;
    }

    function getPostById(idP) {
        var t = false;
        for(var i = 0; i < photoPosts.length; i++ ){
            if(photoPosts[i].id === idP){
                t = true;
                return photoPosts[i];
            }
        }
        if(!t){
            console.log("no such id found")
            return 1;
        }
    }

    function validatePost(post) {
        if (!post.id) {
            console.log("no post id");
            return false;
        }
        if (!post.title) {
            console.log("no post title");
            return false;
        }
        else {
            if ((post.title.length >= 100) || post.title.length === 0) {
                console.log("wrong post title length");
                return false;
            }
        }
        if (!post.description) {
            return false;
        }
        else {
            if (post.description.length >= 200 ) {
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
        }
        else if (post.author.length === 0) {
            console.log("wrong post author length");
            return false;
        }
        if(!post.location){
            console.log("wrong post location");
            return false;
        }
        if(!post.photoLink){
            console.log("wrong post photoLink");
            return false;
        }
        return true;
    }

    function addPost(post) {
        if (validatePost(post)) {
            for(var i = 0; i < photoPosts.length; i++){
                if(photoPosts[i].id === post.id){
                    console.log("post with the same id already exists");
                    return false;
                }
            }
            photoPosts.push(post);
        }
        else return false;
    }

    function editPost(postID, post) {
        var clone = getPostById(postID);
        if (post.id) clone.id = post.id;
        if (post.title) clone.title = post.title;
        if (post.description) clone.description = post.description;
        if (post.createdAt) clone.createdAt = post.createdAt;
        if (post.location) clone.location = post.location;
        if (post.author) clone.author = post.author;
        if (post.photoLink) clone.photoLink = post.photoLink;

        if (validatePost(clone)) {
            for (var i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === postID) {
                    photoPosts[i] = clone;
                    return true;
                }
            }
        }
        else return false;
    }

    function removePost(id) {
        var index = 0;
        for (var i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                index = i;
                break;
            }
        }
        if(index === 0){
            console.log("no post with such id");
            return;
        }
        photoPosts.splice(index, 1)
    }


    return {
        getPhotoPosts: getPhotoPosts,
        getPostById: getPostById,
        validatePost: validatePost,
        addPost: addPost,
        editPost: editPost,
        removePost: removePost
    };

}());


console.log(postsService.getPhotoPosts(0, 10, "date", "", new Date("2019-03-01T23:00:00")));

console.log(postsService.getPostById("3"));

postsService.validatePost(postsService.getPostById("3"));

postsService.addPost({
    id: "21",
    title: "title 21",
    description: "Earth view from google number twenty one",
    createdAt: new Date("2019-03-10T23:20:00"),
    location: "Minsk, Belarus",
    author: "KastG",
    photoLink: "images/google-earth-view-1494.jpg"
});

console.log(postsService.getPhotoPosts(0, 21, "", "", ""));

postsService.editPost("19", {description: "I've changed the description!!!"});

console.log(postsService.getPostById("19"));

postsService.removePost("21");

console.log(postsService.getPhotoPosts(0, 21, "", "", ""));




