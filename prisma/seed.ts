import { PrismaClient, MemberRole, RecruitStatus, ImportType, ImportStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: { email: "owner@example.com", name: "Owner" }
  });
  const user2 = await prisma.user.create({
    data: { email: "user@example.com", name: "User" }
  });

  const dynasty = await prisma.dynasty.create({
    data: {
      name: "Demo Dynasty",
      members: {
        create: [
          { userId: user1.id, role: MemberRole.OWNER },
          { userId: user2.id, role: MemberRole.USER }
        ]
      },
      teams: {
        create: [
          { name: "Ohio State", abbrev: "OSU", mascot: "Buckeyes" },
          { name: "Alabama", abbrev: "BAMA", mascot: "Crimson Tide" },
          { name: "Texas", abbrev: "TEX", mascot: "Longhorns" }
        ]
      }
    },
    include: { teams: true }
  });

  // players
  for (const team of dynasty.teams) {
    for (let i = 1; i <= 10; i++) {
      await prisma.player.create({
        data: {
          teamId: team.id,
          name: `${team.abbrev} Player ${i}`,
          position: "QB",
          year: "FR",
          ovr: 70 + i
        }
      });
    }
  }

  // games
  const teams = dynasty.teams;
  const games = [
    { week: 1, homeTeam: teams[0].id, awayTeam: teams[1].id },
    { week: 1, homeTeam: teams[2].id, awayTeam: teams[0].id },
    { week: 2, homeTeam: teams[1].id, awayTeam: teams[2].id }
  ];
  for (const g of games) {
    await prisma.game.create({
      data: {
        dynastyId: dynasty.id,
        season: 1,
        week: g.week,
        homeTeam: g.homeTeam,
        awayTeam: g.awayTeam,
        homeScore: g.week === 1 ? 21 : null,
        awayScore: g.week === 1 ? 14 : null
      }
    });
  }

  // recruits
  const targets = await Promise.all(
    Array.from({ length: 6 }).map((_, i) =>
      prisma.recruitTarget.create({
        data: {
          dynastyId: dynasty.id,
          name: `Recruit ${i + 1}`,
          position: "ATH",
          stars: 3 + (i % 3),
          interest: {},
          status: RecruitStatus.ACTIVE,
          portal: i % 2 === 0
        }
      })
    )
  );

  await prisma.offer.create({
    data: { teamId: teams[0].id, recruitId: targets[0].id, amount: 100 }
  });

  // posts
  for (let i = 1; i <= 3; i++) {
    await prisma.post.create({
      data: {
        dynastyId: dynasty.id,
        authorId: user1.id,
        title: `Post ${i}`,
        body: "Demo post",
        images: ["/placeholder.png"]
      }
    });
  }

  // poll
  await prisma.poll.create({
    data: {
      dynastyId: dynasty.id,
      authorId: user1.id,
      question: "Advance to next week Wednesday 8pm?",
      options: {
        create: [{ text: "Yes" }, { text: "No" }, { text: "Need more time" }]
      }
    }
  });

  // import batches
  await prisma.importBatch.create({
    data: {
      dynastyId: dynasty.id,
      teamId: teams[0].id,
      type: ImportType.ROSTER,
      imageUrl: "/placeholder.png",
      status: ImportStatus.PARSED,
      parsedJson: { rows: [{ name: "QB Test", position: "QB" }] },
      createdById: user1.id
    }
  });

  await prisma.importBatch.create({
    data: {
      dynastyId: dynasty.id,
      type: ImportType.RECRUITING,
      imageUrl: "/placeholder.png",
      status: ImportStatus.PARSED,
      parsedJson: { rows: [{ name: "Recruit Test", position: "ATH" }] },
      createdById: user1.id
    }
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
