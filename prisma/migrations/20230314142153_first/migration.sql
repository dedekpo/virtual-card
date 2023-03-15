-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "linkedin_url" TEXT,
    "github_url" TEXT,
    "history" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
