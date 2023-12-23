const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;
const app = express();
const BukuModel = require('./model/Buku');
const Buku = require('./model/Buku');
const bodyParser = require('body-parser');


const connect = async () => {
	try {
		const mongoString = "mongodb+srv://faisal:faisal123@cluster0.b6uqxsg.mongodb.net/?retryWrites=true&w=majority"
		await mongoose.connect(mongoString);
		console.log("Connected to MongoDB.");
	} catch (error) {
		console.log(error);
	}
};

connect();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


// Handle GET requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});
app.get("/api/get_all", async (req, res) => {
	try{
        const data = await BukuModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});
app.post("/api/insert", async (req, res) => {
	const data = new BukuModel({
		judul_buku : req.body?.judul_buku,
		kategori_buku : req.body?.kategori_buku,
		penerbit : req.body?.penerbit,
		pengarang : req.body?.pengarang,
		tahun_terbit : req.body?.tahun_terbit,
		jumlah_halaman : req.body?.jumlah_halaman,
		jumlah_eksemplar : req.body?.jumlah_eksemplar,
	})
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});
app.post("/api/update/:id", async (req, res) => {
	try {
        const id = req.params.id;
        const updatedData = {
			judul_buku : req.body?.judul_buku,
			kategori_buku : req.body?.kategori_buku,
			penerbit : req.body?.penerbit,
			pengarang : req.body?.pengarang,
			tahun_terbit : req.body?.tahun_terbit,
			jumlah_halaman : req.body?.jumlah_halaman,
			jumlah_eksemplar : req.body?.jumlah_eksemplar,
		};
        const options = { new: true };
        const result = await BukuModel.findByIdAndUpdate(
            id, updatedData, options
        )
		res.status(200).json(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
app.post("/api/delete/:id", async (req, res) => {
	try {
        const id = req.params.id;
        const data = await BukuModel.findByIdAndDelete(id)
		res.status(200).json(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});