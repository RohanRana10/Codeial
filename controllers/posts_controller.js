const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });
        post = await post.populate('user','-password -createdAt -email -updatedAt -__v');
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    flashMessage: 'Post Published!',
                    flashType: 'success'
                },
                message: 'Post created'
            });
        }
        req.flash('success','Post Published!');
        return res.redirect('/');
    } catch (err) {
        req.flash('error',err);
        return;
    }
    
};

module.exports.destroy = async function(req,res){

    try {
        let post = await Post.findById(req.params.id);

        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                        flashMessage: 'Post and associated comments deleted!',
                        flashType: 'error'
                    },
                    message: 'Post deleted'
                });
            }
            req.flash('success','Post and associated comments deleted!');
            return res.redirect('/');
        }
        else{
            req.flash('error','You cannot delete this post!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error',err);
        return;
    }

}