module.exports = {
    e404: (req, res) => {
        res.status(404).end();
    },
    e503: (req, res) => {
        res.status(503).end();
    }
}