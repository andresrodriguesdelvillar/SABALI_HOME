// custom event for popups
const event = document.createEvent("CustomEvent", { popupType: "" });

event.initEvent("PopUp", true, false);

export const popupEvent = event;
