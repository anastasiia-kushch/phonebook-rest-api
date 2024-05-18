export const uploadAvatar = async (req, res, next) => {
    try {
        res.status(200).json('Upload Avatar')
    } catch (error) {
       next(error);
    }
}