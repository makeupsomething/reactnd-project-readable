# Readable

This is my readable app, the second project for the Udacity React Nanodegree Program.

It is esentiall a reddit clone built using react and using material-ui for styling.

It can be run like so
`npm install`
`npm start`

# Guide

New comments can be added with the blue `+` button in the bottom corner, this button displayes on all pages.

You can navigate to different topics using the blue pill buttons along the top of the page. These are displied on all pages and should be used to go back to the top page to avoid errors.

You can sort the posts using the dropdown menu under the blue pill buttons. Posts can be sorted by either date or score.

Posts have various buttons on the card for up/down voting, editing the post, viewing the comments, add a comment and deleting the post.

The bell icon and number indicates the current score the post has.

Clicking the view comment button will bring you to the post details. Here you can see the full post and the comments.

Comments card contains similar options to the post card to allow the user to up/down vote, edit the comment and delete the comment.

You can sort the comments using the dropdown menu under the list of comments. Comments can be sorted by either date or score.

# Known issues

When upvoting comments it does not always display the new vote score immediatly, and will update twice the next time the button is pushed. I still cannot figure out why becuase the same error does not seem to happen when up/down voting comments.
