import client from "./client";

const endpoint = "/messages";

const sendListingMessage = (messageInfo) => client.post(endpoint, messageInfo);

const getMessages = async (contactId) => {
  const seedMessages = [
    {
      text: "how are you?",
      isFrom: true,
      date: "01-30-2020::11:30:22",
      _id: 1,
    },
    { text: "im great!!", isFrom: false, date: "01-30-2020::12:30:22", _id: 2 },
    {
      text: "did you start the assignment?",
      isFrom: false,
      date: "01-30-2020::12:30:55",
      _id: 3,
    },
    { text: "not yet...", isFrom: false, date: "01-30-2020::12:45:22", _id: 4 },
    {
      text: "bye bye!!!",
      isFrom: false,
      date: "01-30-2020::12:46:22",
      _id: 66,
    },
    { text: "see ya bro", isFrom: true, date: "01-30-2020::12:55:22", _id: 67 },
  ];
  return seedMessages;
  //return client.get(endpoint);
};
export default { sendListingMessage, getMessages };
