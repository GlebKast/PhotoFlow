SELECT user.NAME FROM photoflow.photo_post JOIN photoflow.user ON user.USER_ID = photo_post.USER_ID
GROUP BY photo_post.USER_ID HAVING COUNT(photo_post.USER_ID) > 3;