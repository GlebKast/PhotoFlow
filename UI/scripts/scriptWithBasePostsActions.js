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

    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        var res = photoPosts.slice();
        sortPostsByDate(res);
        if(filterConfig.author){
            res = res.filter(function (post) {
                return post.author.toLowerCase() === filterConfig.author.toLowerCase();
            });
        }
        if(filterConfig.createdAt){
            res = res.filter(function (post) {
                return post.createdAt.getDate() === new Date(filterConfig.createdAt).getDate();
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

            console.log("no such id found");
            return t;

    }

    function validatePost(post) {
        if (!post.id) {
            console.log("no post id");
            return false;
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
            return true;
        }
        else return false;
    }

    function editPost(postID, post) {
        if (validatePost(post)) {
            var clone = Object.assign({}, getPostById(postID));
            if (post.id) clone.id = post.id;
            if (post.description) clone.description = post.description;
            if (post.createdAt) clone.createdAt = post.createdAt;
            if (post.location) clone.location = post.location;
            if (post.author) clone.author = post.author;
            if (post.photoLink) clone.photoLink = post.photoLink;

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

console.log(postsService.getPhotoPosts(0, 20, ""));

console.log(postsService.getPhotoPosts(0, 10, {
    createdAt: new Date("2019-03-10"),
    author: "Иванов Иван"
}));

console.log(postsService.getPhotoPosts(0, 10, {
    createdAt: "",
    author: "KastG"
}));

console.log(photoPosts);

console.log(postsService.getPostById("12"));

console.log(postsService.validatePost(postsService.getPostById("3")));

console.log(postsService.addPost({
    id: "33",
    description: "Earth view from google number two",
    createdAt: new Date("2019-03-10"),
    location: "Minsk, Belarus",
    author: "Иванов Иван",
    photoLink: "images/google-earth-view-1064.jpg"
}));


console.log(photoPosts);

console.log(postsService.getPhotoPosts(0, 21, ""));

postsService.editPost("15", {description: "new description!!!"});

console.log(postsService.getPostById("15"));

console.log(photoPosts);

postsService.removePost("33");

console.log(photoPosts);



