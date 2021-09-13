const { Router } = require('express');
const router = Router();

const Photo = require('../models/Photo');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_APY_SECRET
});

const fs = require('fs-extra');

router.get('/', async (req, res) => {
    const photos = await Photo.find();
    res.render('images', {photos});
});

router.get('/images/add', async (req, res) => {
    const photos = await Photo.find();
    res.render('image_form', {photos});
});

router.post('/images/add', async (req, res) => {
    const {title, description} = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newPhoto = new Photo({
        title,
        description,
        imageURL: result.url,
        public_id: result.public_id
    });
    await newPhoto.save();
    await fs.unlink(req.file.path);
    res.redirect('/'); /* /: Vista principal */
});

router.get('/images/delete/:photo_id', async (req, res) => {
    const { photo_id } = req.params;
    const photo = await Photo.findByIdAndDelete(photo_id); //Elimina la informacion de la foto en la Base de datos
    const result = await cloudinary.v2.uploader.destroy(photo.public_id); //Elimina el archivo de cloudinary
    console.log(result);
    res.redirect('/images/add');
});

module.exports = router;


//console.log(req.body); {title: 'test', description: 'test'}
//console.log(result);
//console.log(req.file);
//console.log(photos);