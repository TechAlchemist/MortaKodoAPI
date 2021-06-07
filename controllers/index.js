function getIntroMessage(req, res) {
    return res.json({"Message": "Morta Kodo API is Online."});
}

module.exports = {
    getIntroMessage
}