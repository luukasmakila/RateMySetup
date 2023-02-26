# RateMySetup

NOT HOSTED, AWS FREE TIER RAN OUT!

>App link: https://master.d3u4uo1e3a4x97.amplifyapp.com

### What is it?

Web based application where users are able to post pictures and descriptions of their gaming / work setups. Users are also able to rate other users setups by liking / disliking posts.

### How to test?

Although passwords are securely hashed I understand you might not want to create an account just for testing the app so heres a dummy user you can use:
</br>

<b>email: test@gmail.com</b> </br>
<b>password: 12345</b>

ps. please don't post anything illegal or what other's might find offensive

### How is the hosting handled?

Backend hosted on AWS ECS and frontend hosted on AWS Amplify

For image storage im using AWS S3 buckets

For the database im using MongoDB atlas

<b>Users can</b>:
- Create an account and login
- Upload an image of their gaming/work setup and create a post
- Like / dislike other users posts
- Creator of a post can delete their own posts

<b>TODO</b>:
- Bug fixes
- Commenting on posts
- Post editing
- Notifications (ex. post creation / login succeeded, login failed / failed to create a post error)
- UI improvements and style changes
- Hide logout button if not signed in and hide sign up and login buttons if user is signed in.
- Mobile optimization

![alt text](https://github.com/luukasmakila/RateMySetup/blob/master/rms%20ss2.png)

![alt text](https://github.com/luukasmakila/RateMySetup/blob/master/rms%20ss.png)
