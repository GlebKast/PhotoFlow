
let tmp = document.getElementById('posts');
tmp.onclick = function(event) {
    if (event.target.classList.contains('like')) {
        postButtonsController.likeButtonHandle(event);
    }
    if(event.target.classList.contains('delete')){
        postButtonsController.deleteButtonHandle(event);
    }
    if(event.target.classList.contains('edit')){
        postButtonsController.editButtonHandle(event);
    }
};



