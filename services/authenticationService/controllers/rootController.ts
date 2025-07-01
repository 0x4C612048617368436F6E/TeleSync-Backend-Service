import { REQUESTOBJECT } from "../expose/types/types";
const rootControllerGET = (req: REQUESTOBJECT, res: any) => {
  //No need to do any authentication stuff here
  return res.status(200).json({
    message: "Response successful",
  });
};

export default rootControllerGET;
