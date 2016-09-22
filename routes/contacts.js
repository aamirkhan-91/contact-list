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
            "_id": req.params.id
        }, function(err, contact)
        {
            if (err)
            {
                console.log('An error occurred.');
            }

            else if (contact)
            {
                console.log(contact);
                res.json(contact);
            }
            else
            {
                console.log("No contact exists by that id");
                //res.json("")
            }
        });
    });

    router.put('/:id', function(req, res)
    {
        console.log('PUT /contacts/' + req.params.id);
        console.log(req.body);

        models.contact.update(
        {
            "_id": req.params.id
        }, req.body, function(err, N)
        {
            if (err)
            {
                console.log("An error occurred");
            }

            console.log(N);
        });
    });

    return router;
}
