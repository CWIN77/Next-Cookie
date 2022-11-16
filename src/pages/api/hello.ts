import type { NextApiRequest, NextApiResponse } from 'next'
import { getCookie, setCookie, deleteCookie, CookieValueTypes } from 'cookies-next';
type Data = {
  text: CookieValueTypes
} | boolean

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    if (!req.body.text) {
      res.status(400);
      throw new Error("Please add a text field");
    }
    setCookie("text", req.body.text, { req, res, sameSite: true });
    res.status(200).json(true);
  } else if (req.method === 'GET') {
    res.status(200).json({ text: getCookie("text", { req, res }) });
  }
}
