import { NextApiRequest, NextApiResponse } from "next";
import {open} from 'sqlite';
import sqlite3 from 'sqlite3';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({filename: '/tmp/database.db', driver: sqlite3.Database});
    const results = await db.all('select * from PersonTest')
    // res.json(rows);
    return new Response(JSON.stringify(results), {
        status: 200});
        // return new Response('Hello, Next.js!', {
        // status: 200});
}