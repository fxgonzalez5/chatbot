const styleOptions = {
    // Basic
    primaryFont: "Tahoma, Geneva, Verdana, sans-serif, 'Segoe UI'",
    
    // Avatar
    botAvatarInitials: 'AT',
    botAvatarBackgroundColor: "#FFFFFF",
    botAvatarImage: 'images/bot.png',
    userAvatarInitials: 'US',
    userAvatarBackgroundColor: "#FFFFFF",
    userAvatarImage: 'images/user.png',
    
    // Bubble
    bubbleBackground: '#f3f3f3',
    bubbleBorderRadius: 10,
    bubbleFromUserBackground: 'rgb(234, 171, 0, 0.8)',
    bubbleFromUserBorderColor: 'rgb(234, 171, 0)',
    bubbleFromUserBorderRadius: 10,

    // Send box
    hideSendBox: false,
    hideUploadButton: true,
    sendBoxBackground: '#efefef',

    // Send box buttons
    sendBoxButtonColor: '#005896',
    sendBoxHeight: 50,
    sendBoxTextWrap: true,

    // Suggested actions
    suggestedActionBorderRadius: 10,
    suggestedActionLayout: 'stacked',

    suggestedActionBackgroundColorOnActive: '#EDEBE9',
    suggestedActionBorderColorOnActive: 'rgb(234, 171, 0, 0.8)',
    suggestedActionTextColorOnActive: 'rgb(234, 171, 0, 0.8)',
  
    suggestedActionBackgroundColorOnHover: '#F3F2F1',
    suggestedActionBorderColorOnHover: 'rgb(234, 171, 0)',
    suggestedActionTextColorOnHover: 'rgb(234, 171, 0)',

    // Suggested actions stacked layout
    suggestedActionsStackedHeight: 100,
    suggestedActionsStackedOverflow: 'scroll',
    suggestedActionsStackedLayoutButtonTextWrap: true,
  
 };

 var theURL = "https://default6eeb49aa436d43e6becdbbdf79e507.7d.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr70a_atom/directline/token?api-version=2022-03-01-preview";

 var environmentEndPoint = theURL.slice(0,theURL.indexOf('/powervirtualagents'));
 var apiVersion = theURL.slice(theURL.indexOf('api-version')).split('=')[1];
 var regionalChannelSettingsURL = `${environmentEndPoint}/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`; 

 var directline;
     fetch(regionalChannelSettingsURL)
         .then((response) => {
             return response.json();
             })
         .then((data) => {
             directline = data.channelUrlsById.directline;
             })
         .catch(err => console.error("An error occurred: " + err));

fetch(theURL)
    .then(response => response.json())
    .then(conversationInfo => {
        const directLine = window.WebChat.createDirectLine({
            domain: `${directline}v3/directline`,
            token: conversationInfo.token,
        });

        window.WebChat.renderWebChat(
            {
                directLine: directLine,
                styleOptions,
            },
            document.getElementById('webchat')
        );
    })
    .catch(err => console.error("An error occurred: " + err));