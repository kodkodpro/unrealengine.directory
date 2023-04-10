-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "plainData" JSONB NOT NULL DEFAULT '{}';

-- CreateIndex
CREATE INDEX "Asset_price_idx" ON "Asset"("price");

-- CreateIndex
CREATE INDEX "Asset_ratingScore_idx" ON "Asset"("ratingScore");

-- CreateIndex
CREATE INDEX "Asset_releasedAt_idx" ON "Asset"("releasedAt");
