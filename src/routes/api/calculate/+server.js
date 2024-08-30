import { json } from "@sveltejs/kit";

export async function POST(event) {
    const body = await event.request.json();
    if(!body){
        throw new Error('data not valid')
    }
   const result = body.numberOne + body.numberTwo
  return json(result)
}