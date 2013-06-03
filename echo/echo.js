Messages = new Meteor.Collection("messages");

if (Meteor.isClient)
{
        Template.MsgBox.events(
        {
                'click button' : function ()
                {
                        var msg = document.getElementTagName("input")[0].value;
                }
        });
}

if (Meteor.isServer)
{
        Meteor.startup(function () {
                // code to run on server at startup
        });
}
