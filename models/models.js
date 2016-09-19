module.exports = function(mongoose)
{
    var contact = mongoose.Schema(
    {
        "name": String,
        "email":
        {
            type: String,
            unique: true
        },
        "phone": String
    });

    var models = {
        contact: mongoose.model('contact', contact)
    }

    return models;
}
