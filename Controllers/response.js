const db = require('../Model/index');
const records = db.responses;

exports.responseController = {
    recordResponse: (req, res) => {
        const record = req.body;
        records.create(record)
            .then((data) => {
                res
                    .status(200)
                    .send({
                        status: "success",
                        massage: "record submitted successfully",
                        data: data
                    })
            })
            .catch((err) => {
                res
                    .status(400)
                    .send(err)
            })
    }
}