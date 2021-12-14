module.exports = (req, res, next) => {
    const {token} = req.body
    console.log("Middleware cookie: ")
    console.log(res.cookie)
    if (token !== res.cookie.token) {
        // return res.redirect(':3000/')
        return res.json({
            result: false,
            info: 'wrong token'
        })
    }

    next()
}