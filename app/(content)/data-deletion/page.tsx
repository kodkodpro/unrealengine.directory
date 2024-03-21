import { Text, TextLink } from "@/components/catalyst/text"
import PageTitle from "@/components/content/PageTitle"

export default async function DataDeletionPage() {
  return (
    <div className="px-8 pt-8">
      <PageTitle className="mb-1">
        Data Deletion Instructions
      </PageTitle>
      <Text>
        To delete your data, please contact us at{" "}
        <TextLink href="mailto:andrew@kodkod.me">our support email</TextLink>.
      </Text>
    </div>
  )
}
