import type { ProgramContent } from "./types";

/** Migrated from the-eco-retreat-old/app.js — copy preserved verbatim */
export const programs: ProgramContent[] = [
  {
    slug: "7-day",
    label: "7-Day Program",
    bookable: true,
    priceInr: 20000,
    kicker: "Monthly Immersion",
    title: "7-Day Program",
    intro:
      "A small-group retreat for deeper reconnection through yoga, mindful living, and community participation.",
    blocks: [
      {
        type: "paragraph",
        text: "This 7-day program will support you on your inner reconnection journey thanks to various activities and training opportunities.",
      },
      {
        type: "paragraph",
        text: "The Eco Retreat's program includes yoga, mindfulness training, chanting, breathwork, gardening, self-empowerment activities and the opportunity to engage in karma yoga and cross-cultural exchange with the local community.",
      },
      {
        type: "list",
        title: "Typical Day",
        items: [
          "7am to 8am: Yoga",
          "8am to 9am: Free time",
          "9am to 10am: Breakfast",
          "11am to 12pm: Karma Yoga",
          "12pm to 12.30pm: Breathing and Relaxation Class",
          "1pm to 2pm: Lunch",
          "3pm to 4pm: Mindful Practice (meditation, silence, reading, artistic activities, walking)",
          "4.30pm to 5pm: Chanting",
          "5pm to 6pm: Dinner",
        ],
      },
      {
        type: "list",
        title: "Practical Information Before Registering",
        items: [
          "This 7-day retreat takes place every month, from the 1st to the 7th",
          "Each session welcomes a small group of 10 to 12 participants",
          "The cost for the entire week is 20,000 rupees, which includes everything (accommodation, meals, and all activities)",
        ],
      },
    ],
  },
  {
    slug: "weekend",
    label: "Weekend Program",
    bookable: true,
    kicker: "Short Renewal",
    title: "Weekend Program",
    intro: "For busy schedules, with space to pause, breathe, and reset.",
    blocks: [
      {
        type: "paragraph",
        text: "Our weekend program is designed for those with busy schedules who want to step away from the hustle and bustle of daily life.",
      },
      {
        type: "list",
        title: "Over the Course of the Weekend, You Will",
        items: [
          "Immerse yourself in nature, away from screens and distractions",
          "Experience the art of yoga, with guided sessions perfect for beginners and those curious about its philosophy and benefits",
          "Have the time to rest deeply, allowing yourself to pause and settle into the present moment",
          "Gain an introduction to the essence of spirituality in a global and inclusive way",
          "Simply take time to be with yourself, nurturing a sense of balance and renewal",
        ],
      },
      {
        type: "paragraph",
        text: "This weekend retreat takes place every second and fourth weekend of the month. Each session welcomes a small group of 10 to 12 participants.",
      },
    ],
  },
  {
    slug: "stay-with-us",
    label: "Stay With Us",
    bookable: false,
    kicker: "Open Invitation",
    title: "Stay With Us",
    intro: "For those who feel called to spend intentional time in this Ashram environment.",
    blocks: [
      {
        type: "paragraph",
        text: "If you feel the calling to visit us, wish to experience personal introspection in a calm and supportive environment, are ready to embrace an authentic Indian lifestyle with simple facilities, want to contribute to social causes, and are aligned with our guidelines and values, then you are more than welcome.",
      },
      {
        type: "paragraph",
        text: "The Ashram is open to you at any time. And the most important thing will always be the calling: if there is a calling of the heart, it's always for a good reason.",
      },
      {
        type: "paragraph",
        text: "Please feel free to contact us at theecoretreat@gmail.com to discuss the details.",
      },
    ],
  },
];

export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
