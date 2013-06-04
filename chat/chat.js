var Messages = new Meteor.Collection("Messages");
var Users = new Meteor.Collection("Users");

if (Meteor.isClient)
{
        Meteor.startup(function()
        {
                if (!Session.get('nick'))
                {
                        var nick = prompt("Enter your name");
                        Session.set('nick', nick);
                        Users.insert({
                                'nick': nick,
                                'active': Date.now()
                        });
                }
        });

        Meteor.setInterval(function()
        {
                Meteor.call('usercheck', Session.get('nick'));
        }, 1000);

        Template.Input.events(
        {
                'click button' : function ()
                {
                        var msg = document.querySelector("#msginput").value;
                        Messages.insert({
                                'time': Date.now(),
                                'nick': Session.get('nick'),
                                'msg': msg
                        });
                        document.querySelector("#msginput").value = '';
                }
        });

        Template.Messages.Messages = function()
        {
                return Messages.find({}, {sort: {time: -1}});
        };
        Template.message.date = function(t)
        {
                var date = new Date(t);
                return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        };

        Template.Users.Users = function()
        {
                return Users.find();
        };
}

if (Meteor.isServer)
{
        Meteor.methods({
                usercheck: function (nick)
                {
                        Users.update({
                                'nick': nick
                        }, { $set: {
                                'active': Date.now()
                        }});
                }
        });

        Meteor.setInterval(function()
        {
                Users.remove({'active': {$lt: (Date.now() - 60000)}});
        }, 1000);
}