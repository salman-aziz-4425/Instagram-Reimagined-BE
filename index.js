import express from 'express'
import cors from 'cors'


import  './db/mongoose.js'
import users_routes from './routes/users.routes.js'
import post_routes from './routes/posts.routes.js'
import followers_routes from './routes/followers.routes.js'
import comments_routes from './routes/comments.routes.js'
import stories_routes from './routes/stories.routes.js'
import routeUrls from './constants.js'
import './jobs/stories.job.js'


const app = express()

app.use(cors({
    origin: (origin, callback) => {
        if (process.env.ALLOWED_ORIGIN.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json())

app.use(routeUrls.users, users_routes)
app.use(routeUrls.posts, post_routes)
app.use(routeUrls.followers, followers_routes)
app.use(routeUrls.comments,comments_routes)
app.use(routeUrls.stories,stories_routes)


app.listen(process.env.PORT, () => {
	console.log('server connected at port:'+process.env.PORT)
})
