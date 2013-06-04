var Messages = new Meteor.Collection("Messages");
var Users = new Meteor.Collection("Users");

if (Meteor.isClient)
{
        Template.Input.events(
        {
                'click button' : function ()
                {
                        var msg = document.querySelector("#msginput").value;
                        Messages.insert({
                                'time': new Date().getTime(),
                                'nick': 'Nick',
                                'msg': msg
                        });
                }
        });

        Template.Messages.Messages = function()
        {
                return Messages.find({}, {sort: {time: -1}});
        };

        Template.Users.Users = function()
        {
                return Users.find();
        };
}