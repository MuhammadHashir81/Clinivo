import jwt from 'jsonwebtoken'

export const veifyUser = (req, res, next) => {
    try {
        const token = req.cookies.accessToken

        if (!token) {
            return res.status(401).json({ error: 'please login', tokenExpired: true })
        }

        const decoded = jwt.verify(token, process.JWT_SECRET)
        req.userId = decoded.id
        req.role = decoded.role

        next()

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}