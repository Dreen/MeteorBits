var Messages = new Meteor.Collection("Messages");
var Users = new Meteor.Collection("Users");

if (Meteor.isClient)
{
        Meteor.startup(function()
        {
                if(!Session.get('nick'))
                {
                        var nick = prompt("Enter your name");
                        Session.set('uid', nick);
                        Users.insert({
                                'nick': nick
                        });
                }
        });

        Template.Input.events(
        {
                'click button' : function ()
                {
                        var msg = document.querySelector("#msginput").value;
                        Messages.insert({
                                'time': new Date().getTime(),
                                'nick': Session.get('nick'),
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

if (Meteor.isServer)
{
        Meteor.startup(function()
        {
                Users.remove();
        });

}