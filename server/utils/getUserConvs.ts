import Conversation from "../models/converstionModel";

export default async function getConverstions(userID: string) {
  if (!userID) {
    return [];
  }
  const userConverstions = await Conversation.find({
    $or: [
      {
        receiver: userID,
      },
      {
        sender: userID,
      },
    ],
  })
    .sort({ updatedAt: -1 })
    .populate("sender receiver messages");

  const payloadConverstions = userConverstions?.map((converstion) => {
    const countUnSeenMsg = converstion?.messages?.reduce(
      (acc: number, msg: any) => {
        if (userID.toString() !== msg?.msgBy.toString()) {
          return acc + (msg?.seen ? 0 : 1);
        }
        return acc;
      },
      0
    );
    return {
      _id: converstion?._id,
      lastMsg: converstion?.messages[converstion?.messages.length - 1],
      sender: converstion?.sender,
      receiver: converstion?.receiver,
      countUnSeenMsg,
    };
  });
  return payloadConverstions;
}
