const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cors = require('cors');

const URL = 'mongodb+srv://admin:admin123@cluster0.b6dvr7w.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3003;
const app = express();
app.use (cors());

app.use(express.json());

mongoose.connect(URL, {
    dbName: "client",
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter your full name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password']
    }
});

const user = mongoose.model('client', userSchema);

const Password = (password) => {
    return bcrypt.hashSync(password, 10);
};

const isFullNameValid = (fullName) => {
    return /^[A-Za-z\s]+$/.test(fullName) && fullName.trim() !== '';
};
const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const isPasswordStrong = (password) => {
    return password.length >= 8;
};

app.post('/user/create', (req, res) => {
    const {
        fullName,
        email,
        password
    } = req.body;

    if (!isFullNameValid(fullName) || !isEmailValid(email) || !isPasswordStrong(password))
        return;

    const newUser = new user({
        fullName,
        email,
        password: Password(password),
    });

    newUser.save().then(() => {
        res.status(201).json({
            message: 'User created successfully'
        });
    }, (err) => console.log(err));
});

app.put('/user/update', async (req, res) => {
    const {
        fullName,
        email,
        password
    } = req.body;

    if (!isFullNameValid(fullName) || !isEmailValid(email) || !isPasswordStrong(password))
        return;

    let nuser = await user.findOneAndUpdate({
        email: email
    }, {
        fullName: fullName,
        password: Password(password)
    });

    if (!nuser) {
        res.send("User not found");
    } else {
        res.send(await user.findOne({
            email: email
        }));
    }

});

app.delete('/user/delete', async (req, res) => {
    const {
        email
    } = req.body;

    if (!email) {
        return res.status(404).json({
            message: 'User not found'
        });
    }

    let nuser = await user.findOneAndDelete({
        email: email
    });

    if (!nuser) {
        res.send("User not found");
    } else {
        res.send("User deleted successfully");
    }
});

app.get('/user/get', async (req, res) => {
    res.send(await user.find());
});


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));