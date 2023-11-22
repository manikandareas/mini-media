import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "~/server/db";

async function handler(request: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the body
  const payload = (await request.json()) as unknown;
  const body = JSON.stringify(payload);
  const headerPayload = headers();

  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, ...data } = evt.data;

    await db.user.upsert({
      create: {
        id: id as unknown as string,
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username ?? "",
        email: data.email_addresses[0]?.email_address ?? "",
        birthday: data.birthday,
        imageUrl: data.image_url,
        gender: data.gender,
        lastSignInAt: data.last_sign_in_at ?? 0,
        hasImage: data.has_image,
      },
      update: {
        firstName: data.first_name,
        lastName: data.last_name,
        username: data.username ?? "",
        email: data.email_addresses[0]?.email_address ?? "",
        birthday: data.birthday,
        imageUrl: data.image_url,
        gender: data.gender,
        lastSignInAt: data.last_sign_in_at ?? 0,
        hasImage: data.has_image,
      },
      where: {
        id: id as unknown as string,
      },
    });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
