const express = require('express');
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 5000;
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')))

app.get('/data', async (req, res) => {
    try {
        const { data } = await axios.get(`https://www.gov.uk/bank-holidays.json`);
        res.status(200).send(data)
    } catch (err) {
        res.status(500).json({
            status: "fail",
            data: {
                message: "Some unknown error occured on the server"
            }
        })
    }
})



app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})