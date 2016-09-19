module.exports = function(express)
{
    var router = express.Router();
    var mongoose = require('mongoose');
    var models = require('../models/models')(mongoose);

    router.get('/', function(req, res)
    {
        console.log("Received GET /contacts");

        models.contact.find(function(err, docs)
        {
            if (err)
            {
                console.log('An error occurred.');
            }

            else if (docs)
            {
                res.json(docs);
            }

            else
            {
                res.json();
            }
        });
    });

    router.post('/', function(req, res)
    {
        console.log('Received POST /contacts');
        console.log(req.body);

        var contact = new models.contact(
        {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        });

        contact.save(function(err)
        {
            if (err)
            {
                console.log('An error occurred.');
            }

            else
            {
                res.json(contact);
            }
        });
    });

    router.delete('/:id', function(req, res)
    {
        console.log('DELETE /contacts/' + req.params.id);

        models.contact.findOneAndRemove(
        {
            "id": req.body.id
        }, function(err, contact)
        {
            if (err)
            {
                console.log('An error occurred.');
            }

            else
            {
                console.log("Deleted");
                res.json(contact);
            }
        });
    });

    return router;
}
