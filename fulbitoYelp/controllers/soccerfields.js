const SoccerField = require('../models/soccerField')

module.exports.index = async (req, res) => {
    const soccerfield = await SoccerField.find({});
    res.render('soccerfields/index', { soccerfield } );
}