// {
//     // function to submit the form data for new comment using AJAX
//     let createComment = function(){
//         let newCommentForm = $('#new-comment-form');
//         newCommentForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type: 'post',
//                 url: '/comments/create',
//                 data: newCommentForm.serialize(),
//                 success: function(data){
//                     console.log(data);
//                 }
//                 ,error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         });
//     }

//     //function to create a comment in DOM

//     createComment();
// }

// {
//     //submit the form data
//     let createComment = function(){
//         let newCommentForm = $('#new-comment-form');
//         newCommentForm.submit(function(e){
//             console.log('hello 2');
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/comments/create',
//                 data: newCommentForm.serialize(), // converts to json
//                 success: function(data){
//                     console.log(data);
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });
//         });
//     }
    
//     createComment();
// }