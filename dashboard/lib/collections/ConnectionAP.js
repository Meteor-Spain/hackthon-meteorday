ConnectionAP = new Meteor.Collection('ConnectionAP');

ConnectionAP.save = function(ssid,password){
	ConnectionAP.remove({});
	ConnectionAP.insert({ssid:ssid,password:password});
}
