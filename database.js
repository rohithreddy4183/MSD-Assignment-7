const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://patibandlasurya9989:BMgm2qcUYmXcUbnG@cluster0.neogo.mongodb.net/user', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String
});

const User = mongoose.model('User', userSchema);

const user1 = new User({
    email: "221fa04@gmail.com",
    password: "12345678",
    name: "asdfgh"
});

user1.save()
    .then(() => console.log("User saved!"))
    .catch(err => console.error("Error saving user:", err));
