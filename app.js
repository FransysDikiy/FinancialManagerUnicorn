const express = require('express');
const bodyParser = require('body-parser');
const financialRoutes = require('./routes/financialRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/api/operations', financialRoutes);

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
