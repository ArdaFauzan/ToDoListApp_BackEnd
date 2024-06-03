const photoModels = require('../models/photo')

const uploadPhoto = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: 'Please upload a file'
        });
    }

    const data = {
        url: req.file.filename,
        type: req.file.mimetype
    };

    try {
        const { user_id } = req.params;

        await photoModels.postUserPhoto(data.url, user_id);
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
    const { user_id } = req.params;

    try {
        const [user] = await photoModels.getUserPhoto(user_id);
        const imageUrl = user[0].imageurl;

        if (!imageUrl) {
            return res.status(404).json({ 
                message: 'Photo not found',
            });
        }

        const fullUrl = `${req.protocol}://${req.get('host')}/images/${imageUrl}`;

        res.status(200).json({ 
            message: 'photo found',
            url: fullUrl });
    } catch (error) {
        console.error('Error retrieving photo:', error);
        res.status(500).send('Error retrieving photo');
    }
};

const deleteUserPhoto = async (req, res) => {
    const { user_id } = req.params

    try {
        await photoModels.deleteUserPhoto(user_id)
        res.status(200).json({
            message: 'Delete photo success'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('Error delete photo');
    }

}


module.exports = { uploadPhoto, getUserPhoto, deleteUserPhoto };