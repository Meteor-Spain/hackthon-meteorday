Checkins = new Meteor.Collection('Checkins');

Checkins.checkin = function(eventId,memberId){
	memberId = parseInt(memberId);
	var user = MeetupRegisteredUsers.findOne({meetupId:memberId});
	if(user){
		Checkins.upsert({userId:user._id},{$set:{userId:user._id}});
	}
}

Checkins.helpers({
	user:function(){
		return MeetupRegisteredUsers.findOne(this.userId);
	}
})
