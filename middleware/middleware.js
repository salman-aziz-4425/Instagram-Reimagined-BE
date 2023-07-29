// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
	try{
	const token = req.headers.authorization.replace('Bearer','')
	if (!token) {
		res.status(401).json({ error: 'Access denied, missing token' })
	}
	jwt.verify(token.trim(), process.env.SECRET_KEY,(err,user)=>{
		if(err){
			res.status(400).send('invalid token')
		}
		req.user=user
		next()
	})
}
catch(error){
    res.status(500).send('Internal server error');
}
}
export default authenticateToken
