SELECT user.NAME from photoflow.user
join photoflow.photo_post on user.USER_ID = photo_post.USER_ID
where date(photo_post.CREATED_AT) = date(NOW())
group by user.NAME having count(photo_post.POST_ID) > 3;