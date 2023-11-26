import { db } from "~/server/db";

async function main() {
  const alice = await db.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      image: "https://robohash.org/alien",
    },
  });
  const bob = await db.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      image: "https://robohash.org/125.160.115.188.png",
    },
  });

  await db.post.createMany({
    data: [
      {
        content:
          "Hari ini suka hangat, semoga mendapatkan cuaca yang baik di hari ini 🌞🌸. Saya sedang mencoba membuat rencana untuk minggu depan, semoga semua bisa berjalan sesuai rencana 📅👍. Saya juga sedang mencoba untuk mencapai beberapa tujuan pribadi, semoga bisa mencapainya dengan baik 🎯👍.",
        authorId: alice.id,
        id: 1,
      },
      {
        content:
          "Terlalu banyak pekerjaan, tapi semoga bisa selesai semua tugas dalam waktu dekat 😅💻. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍. Saya juga sedang mencoba untuk menjaga hubungan dengan orang-orang yang saya cintai, semoga bisa tetap baik-baik saja 🤗👍.",
        authorId: alice.id,
        id: 2,
      },
      {
        content:
          "Acara keluarga di hari ini, semoga semua berjalan lancar 🎉👨‍👩‍👧‍👦. Saya juga sedang mencoba untuk menjaga keseragaman dalam keluarga, semoga bisa tetap baik-baik saja 👫👍. Saya juga sedang mencoba untuk menjaga kesejahteraan anggota keluarga, semoga bisa tetap baik-baik saja 🏠👍.",
        authorId: alice.id,
        id: 3,
      },
      {
        content:
          "Makan siang, hari ini saya makan nasi goreng 🍚😋. Saya juga sedang mencoba untuk menjaga diet, semoga bisa tetap sehat dan bugar 🍎👍. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍.",
        authorId: alice.id,
        id: 4,
      },
      {
        content:
          "Belajar kuliah, semoga bisa lulus dengan baik 🎓👍. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍. Saya juga sedang mencoba untuk menjaga kesejahteraan, semoga bisa tetap baik-baik saja 👍👍.",
        authorId: alice.id,
        id: 5,
      },
    ],
  });

  await db.images.createMany({
    data: [
      {
        url: "https://source.unsplash.com/random/300x300?1",
        postId: 1,
      },
      {
        url: "https://source.unsplash.com/random/300x300?5",
        postId: 1,
      },
      {
        url: "https://source.unsplash.com/random/300x300?2",
        postId: 2,
      },
      {
        url: "https://source.unsplash.com/random/300x300?3",
        postId: 3,
      },
      {
        url: "https://source.unsplash.com/random/300x300?6",
        postId: 3,
      },
      {
        url: "https://source.unsplash.com/random/300x300?7",
        postId: 3,
      },
      {
        url: "https://source.unsplash.com/random/300x300?8",
        postId: 4,
      },
      {
        url: "https://source.unsplash.com/random/300x300?4",
        postId: 5,
      },
      {
        url: "https://source.unsplash.com/random/300x300?10",
        postId: 5,
      },
      {
        url: "https://source.unsplash.com/random/300x300?11",
        postId: 5,
      },
      {
        url: "https://source.unsplash.com/random/300x300?12",
        postId: 5,
      },
    ],
  });

  await db.post.createMany({
    data: [
      {
        content:
          "Membuat rencana untuk minggu depan, semoga semua bisa berjalan sesuai rencana 📅👍. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍. Saya juga sedang mencoba untuk menjaga kesejahteraan, semoga bisa tetap baik-baik saja 👍👍.",
        authorId: bob.id,
        id: 6,
      },
      {
        content:
          "Hari ini cuaca hujan, tetapi saya merasa bahagia 🌧️😊. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍. Saya juga sedang mencoba untuk menjaga kesejahteraan, semoga bisa tetap baik-baik saja 👍👍.",
        authorId: bob.id,
        id: 7,
      },
      {
        content:
          "Membuat rencana untuk bulan depan, semoga semua bisa berjalan lancar 📆👍. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍. Saya juga sedang mencoba untuk menjaga kesejahteraan, semoga bisa tetap baik-baik saja 👍👍.",
        authorId: bob.id,
        id: 8,
      },
      {
        content:
          "Saya merasa kesel, tetapi semoga bisa mengatasinya dengan positif 😔💪. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍. Saya juga sedang mencoba untuk menjaga kesejahteraan, semoga bisa tetap baik-baik saja 👍👍.",
        authorId: bob.id,
        id: 9,
      },
      {
        content:
          "Hari ini saya merasa bahagia, tetapi semoga bisa tetap bahagia di hari-hari mendatang 😊🌞. Saya juga sedang mencoba untuk menjaga kesehatan, semoga bisa tetap sehat dan bugar 💪👍. Saya juga sedang mencoba untuk menjaga kesejahteraan, semoga bisa tetap baik-baik saja 👍👍.",
        authorId: bob.id,
        id: 10,
      },
    ],
  });

  await db.images.createMany({
    data: [
      {
        url: "https://source.unsplash.com/random/300x300?1",
        postId: 6,
      },
      {
        url: "https://source.unsplash.com/random/300x300?1",
        postId: 6,
      },
      {
        url: "https://source.unsplash.com/random/300x300?2",
        postId: 7,
      },
      {
        url: "https://source.unsplash.com/random/300x300?2",
        postId: 7,
      },
      {
        url: "https://source.unsplash.com/random/300x300?2",
        postId: 7,
      },
      {
        url: "https://source.unsplash.com/random/300x300?2",
        postId: 7,
      },
      {
        url: "https://source.unsplash.com/random/300x300?3",
        postId: 8,
      },
      {
        url: "https://source.unsplash.com/random/300x300?3",
        postId: 8,
      },
      {
        url: "https://source.unsplash.com/random/300x300?3",
        postId: 8,
      },
      {
        url: "https://source.unsplash.com/random/300x300?4",
        postId: 9,
      },
      {
        url: "https://source.unsplash.com/random/300x300?5",
        postId: 10,
      },
    ],
  });

  console.log({ alice, bob });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
