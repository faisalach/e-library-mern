const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    judul_buku: {
        required: true,
        type: String
    },
    kategori_buku: {
        required: true,
        type: String
    },
    penerbit: {
        required: false,
        type: String
    },
    pengarang: {
        required: false,
        type: String
    },
    tahun_terbit: {
        required: false,
        type: Number
    },
    jumlah_halaman: {
        required: true,
        type: Number
    },
    jumlah_eksemplar: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('buku', dataSchema)
