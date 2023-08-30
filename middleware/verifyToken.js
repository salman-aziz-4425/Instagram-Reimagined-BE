import jwt from 'jsonwebtoken'

const authenticateToken = (req, res, next) => {
	try {
		const token = req.headers.authorization.replace('Bearer', '').trim()
		if (!token) {
			res.status(401).send({ error: 'Access denied, missing token' })
		}
		jwt.verify(token.trim(), process.env.SECRET_KEY, (err, user) => {
			if (err) {
				res.status(400).send('Session out')
			}
			else {
				req.user = user
				next()
			}
		})
	}
	catch (error) {
		res.status(500).send('Internal server error')
	}
}
export default authenticateToken
