import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.accessToken

        if (!token) {
            return res.status(401).json({ error: 'please login', tokenExpired: true })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        req.role = decoded.role

        next()

    } catch (error) {
        return res.status(401).json({ error: error.message })
    }
}