SELECT user.NAME, photo_post.CREATED_AT from photoflow.photo_post
join photoflow.user on user.USER_ID = photo_post.USER_ID
where LENGTH(photo_post.DESCRIPTION) > 35;