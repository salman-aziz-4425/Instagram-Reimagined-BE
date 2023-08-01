// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
	const token = req.header('Authorization')
	console.log(token)
	if (!token) {
		res.status(401).json({ error: 'Access denied, missing token' })
	}
	// eslint-disable-next-line no-undef
	jwt.verify(token, process.env.Secret_KEY, (err, user) => {
		if (err) {
			res.status(403).json({ error: 'Invalid token' })
		}
		req.user = user
		next()
	})
}
export default authenticateToken
