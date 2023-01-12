import { Request, Response } from "express";
import { listAllUsersService } from "../../services";

const listAllUsersController = async (req: Request, res: Response) => {
  const listPerformers = await listAllUsersService();
  return res.status(200).json(listPerformers);
};

export default listAllUsersController;
