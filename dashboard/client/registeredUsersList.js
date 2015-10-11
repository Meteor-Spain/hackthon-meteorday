Template.registeredUsersList.helpers({
	users:function(){
		return MeetupRegisteredUsers.find();
	}
})
