{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newPost = newPostDOM(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);

                    showNoty(data.data.flashMessage,data.data.flashType);

                    deletePost($('.delete-post-button', newPost));
                },
                error: function(error){
                    showNoty(error.responseText,'error');
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create post in DOM
    let newPostDOM = function(post){
        return $(`
        <li id="post-${ post._id }">
            <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                    </small>
                    ${ post.content }
                <br>
                <small>
                ${ post.user.name }
                </small>
            </p>
            <div class = "post-comments">
                
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Add Comment.." required>
                        <input type="hidden" name="post" value="${ post._id }">
                        <input type="submit" value="Add Comment">
                    </form>
                
                <div class="post-comments-list">
                    <ul id="post-comments-${ post._id }">
                        
                    </ul>
                </div>
            </div>
        </li>
    `);
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    showNoty(data.data.flashMessage,data.data.flashType);
                },
                error: function(error){
                    showNoty(error.responseText,'error');
                    console.log(error.responseText);
                }
            });
        })
    }

    let showNoty = function(flashMessage,flashType){
        new Noty({
            theme: 'relax',
            text: flashMessage,
            type: flashType,
            layout: 'topRight',
            timeout: 1500
        }).show();
    }

    let addDynamicDeletion = function(){
        let allPosts = $('#posts-list-container li');
        for(let li of allPosts){
            let post = $(li);
            deletePost($('.delete-post-button', post));
        }
    }

    //method to submit the form data for new comment using AJAX
    // let createComment = function(){
    //     let newCommentForm = $('#new-comment-form');
    //     newCommentForm.submit(function(e){
    //         e.preventDefault();
    //         $.ajax({
    //             type: 'post',
    //             url: '/comments/create',
    //             data: newCommentForm.serialize(),
    //             success: function(data){
    //                 console.log(data);
    //                 let newComment = newCommentDOM(data.data.comment);
    //                 $('#post-comments-' + data.data.comment.post).append(newComment);
    //                 deleteComment($('.delete-comment-button', newComment));
    //             }
    //             ,error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         })
    //     });
    // }

    //method to create a comment in DOM
    // let newCommentDOM = function(comment){
    //     return $(`
    //     <li id="comment-${ comment._id }">
    //         <p>
    //             <small>
    //                 <a href="/comments/destroy/${ comment._id }">X</a>
    //             </small>
    //             ${ comment.content }
    //             <br>
    //             <small>
    //                 ${ comment.user.name }
    //             </small>
    //         </p>
    //     </li>
    //     `)
    // }

    //method to delete a comment from DOM
    // let deleteComment = function(commentLink){
    //     $(commentLink).click(function(e){
    //         e.preventDefault();
    //         $.ajax({
    //             type: 'get',
    //             url: $(commentLink).prop('href'),
    //             success: function(data){
    //                 $(`#comment-${ data.data.comment_id }`).remove();
    //             },
    //             error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         });
    //     });
    // }

    addDynamicDeletion();
    createPost();
    // createComment();
}