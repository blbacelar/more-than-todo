import { Request, Response } from 'express';

export const receiveTokens = (req: Request, res: Response) => {
  const { githubToken, jiraToken } = req.body;
  // Aqui você pode armazenar os tokens ou usá-los conforme necessário
  res.status(200).json({ message: 'Tokens received' });
};
