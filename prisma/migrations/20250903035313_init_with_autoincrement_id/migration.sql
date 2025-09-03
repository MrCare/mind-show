-- CreateTable
CREATE TABLE "public"."mindmap_html" (
    "id" SERIAL NOT NULL,
    "address" TEXT,
    "htmlBlob" BYTEA NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mindmap_html_pkey" PRIMARY KEY ("id")
);
