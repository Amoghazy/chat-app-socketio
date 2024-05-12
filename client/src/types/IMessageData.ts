interface IDataMessage {
  sender: string;
  reciver: string;
  messageText: string;
  image: Buffer | string;
  video: Buffer | string;
  pdf: Buffer | string;
}
export default IDataMessage;
