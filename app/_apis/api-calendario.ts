import { NextApiRequest, NextApiResponse } from "next";

let events = [
  {
    id: 1,
    title: "Reunião com Cliente",
    start: new Date(2024, 10, 26, 10, 0).toISOString(),
    end: new Date(2024, 10, 26, 12, 0).toISOString(),
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(events);
  } else if (req.method === "POST") {
    const newEvent = { ...req.body, id: events.length + 1 };
    events.push(newEvent);
    res.status(201).json(newEvent);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    events = events.filter((event) => event.id !== id);
    res.status(200).json({ success: true });
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
