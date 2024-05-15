const photoModels = require('../models/photo')

const uploadPhoto = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'Please upload a file'
        });
    }

    const data = {
        url: req.file.location,
        type: req.file.mimetype
    };

    try {
        const { name } = req.params;

        await photoModels.postUserPhoto(data.url, name);
        res.status(201).json({
            data: data,
            status: true
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error.message
        })
    }
};

const getUserPhoto = async (req, res) => {
    const { name } = req.params;

    try {
        const [imageurl] = await photoModels.getUserPhoto(name);
        res.status(200).json({
            url: imageurl
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving photo');
    }
};

const deleteUserPhoto = async (req, res) => {
    const { name } = req.params

    try {
        await photoModels.deleteUserPhoto(name)
        res.status(200).json({
            message: 'Delete photo success'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error delete photo');
    }

}


module.exports = { uploadPhoto, getUserPhoto, deleteUserPhoto };