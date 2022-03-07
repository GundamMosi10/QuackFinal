const router = require('express').Router();
const {Post, User, Comment} = require('../models')


router.get('/', (req, res) => {
    // find all posts
    Post.findAll({
        attributes: ['id', 'post', 'likes', 'dislikes', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment', 'likes', 'dislikes', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
      
    }).then(dbPostData => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('all-posts', {posts, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post', 'likes', 'dislikes', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment', 'likes', 'dislikes', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
    }) .then (dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' })
            return;
        }
        const post = dbPostData.get({plain: true});

        res.render('single-post', {post, loggedIn: req.session.loggedIn})
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});


module.exports = router;