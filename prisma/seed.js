import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { defineConfig } from "prisma/config";

const prisma = new PrismaClient();
console.log(process.env.DATABASE_URL);
async function seed() {
    const course = await prisma.course.create({
        data: {
            title: "Typescript with Vue.js 3",
            description: "Learn how to use Typescript with Vue.js 3",
            chapters: {
                create: [
                    {
                        title: "Chapter 1",
                        description: "Learn the basics of Typescript",
                        slug: "1",
                        lessons: {
                            create: [
                                {
                                    title: "Lesson 1",
                                    slug: "1",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 2",
                                    slug: "2",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 3",
                                    slug: "3",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 4",
                                    slug: "4",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                }
                            ]
                        },
                    },
                    {
                        title: "Chapter 2",
                        description: "Learn the basics of Vue.js 3",
                        slug: "2",
                        lessons: {
                            create: [
                                {
                                    title: "Lesson 1",
                                    slug: "1",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 2",
                                    slug: "2",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 3",
                                    slug: "3",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 4",
                                    slug: "4",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                }
                            ]
                        }
                    },
                    {
                        title: "Chapter 3",
                        description: "Learn the basics of Vue.js 3",
                        slug: "3",
                        lessons: {
                            create: [
                                {
                                    title: "Lesson 1",
                                    slug: "1",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 2",
                                    slug: "2",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 3",
                                    slug: "3",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 4",
                                    slug: "4",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 5",
                                    slug: "5",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                }
                            ]
                        }
                    },
                    {
                        title: "Chapter 4",
                        description: "Learn the basics of Vue.js 3",
                        slug: "4",
                        lessons: {
                            create: [
                                {
                                    title: "Lesson 1",
                                    slug: "1",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 2",
                                    slug: "2",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                },
                                {
                                    title: "Lesson 3",
                                    slug: "3",
                                    description: "I dont know what to write here",
                                    videoId: "76979871"
                                }
                            ]
                        }
                    }
                ]
            }
        }
    })
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });