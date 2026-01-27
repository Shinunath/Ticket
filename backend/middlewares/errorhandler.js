let errorhandler = (err, req, res, next) => {
    if (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = errorhandler