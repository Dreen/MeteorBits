var Messages = new Meteor.Collection("Messages");

if (Meteor.isClient)
{
        Template.MsgBox.events(
        {
                'click button' : function ()
                {
                        var msg = document.querySelector("input").value;
                        Messages.insert({
                                'msg': msg
                        });
                }
        });

        Template.Messages.getMessages = function()
        {
                return Messages.find();
        };
}

if (Meteor.isServer)
{
        Meteor.startup(function () {
                // code to run on server at startup
        });
}
