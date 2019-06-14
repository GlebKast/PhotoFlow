SELECT user.NAME, photo_post.CREATED_AT as time, photo_post.DESCRIPTION from photoflow.photo_post
join photoflow.user on user.USER_ID = photo_post.USER_ID
order by photo_post.CREATED_AT;