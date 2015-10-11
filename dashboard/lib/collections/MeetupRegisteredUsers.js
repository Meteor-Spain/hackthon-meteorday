MeetupRegisteredUsers = new Meteor.Collection('MeetupRegisteredUsers');

if (Meteor.isServer){

	var usersFetched = Meteor.bindEnvironment(function(usersJson){
		MeetupRegisteredUsers.remove({});
		_.each(transfromMeetupJson(usersJson),function(meetupUser){
			MeetupRegisteredUsers.insert(meetupUser);
		})
    });


	var getMeetupUsers = function(){

		var meetupFetcher = Meteor.npmRequire('meetup-fetcher');
		var fetcher = new meetupFetcher({
		    "meetupKey" : meetupKey, // go to https://secure.meetup.com/meetup_api/key/ and grab yours
		    "apiTimeRate" : 15000 // Meetup API will accept around 200 requests/hour
		});

		var communities = [communityName]; // add urlnames without <> (Case Sensitive)

		fetcher.get(communities,function(err,result){
		    if(err) {
		        console.log(err);
		    } else {
				usersFetched(result);
		    }
		});
	}


	var transfromMeetupJson = function(json){
		var eventsjson = json[communityName][communityName].events;
		var membersjson = json[communityName][communityName].members;
		return _.map(eventsjson.list[eventId].rsvps.list,function(memberId){return {
			name: membersjson.list[memberId].name,
			photo: membersjson.list[memberId].photo["photo_link"],
			meetupId: membersjson.list[memberId].id
		}});
	}

	Meteor.startup(function(){
		getMeetupUsers();
	});
}
