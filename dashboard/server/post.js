var bodyParser = Meteor.npmRequire('body-parser');
Picker.middleware(bodyParser.urlencoded( {extended : false} ));
Picker.middleware(bodyParser.text());
Picker.middleware(bodyParser.json());

var postRoutes = Picker.filter(function(req, res) {
  return req.method == "POST";
});

postRoutes.route('/checkin/:eventId/:memberId', function(params, req, res, next) {
    console.log("llega");
    console.log(params);
	var eventId = params['eventId'];
	var memberId = params['memberId'];
	Checkins.checkin(eventId,memberId);
	res.end();
});

postRoutes.route('/setcurrentap', function(params, req, res, next) {
    console.log(req.body);
	var ssid = req.body['ssid'];
    var password = req.body['password'];
	ConnectionAP.save(ssid,password);
	res.end();
});
