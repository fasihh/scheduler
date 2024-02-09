module.exports = (res, err) => {
    console.log(err); // debug purposes
    return res.status(500).json({ message: err.message });
}