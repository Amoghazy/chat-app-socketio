import { Request, Response } from "express";

const handelError = (asyncfn: any) => {
  return (req: Request, res: Response, next: Function) => {
    asyncfn(req, res, next).catch((err: Error) => next(err));
  };
};
export default handelError;
