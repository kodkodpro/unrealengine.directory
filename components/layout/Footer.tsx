import { Text, TextLink } from "@/components/catalyst/text"

export default function Footer() {
  return (
    <div className="space-y-2 px-4 py-12 text-center">
      <Text className="sm:text-xs">This project is not affiliated with Epic Games, Inc. in any way. All trademarks are property of their respective owners in the US and other countries. All other trademarks are property of their respective owners.</Text>
      <Text className="sm:text-xs">
        Created by{" "}
        <TextLink
          href="https://github.com/akodkod"
          target="_blank"
        >
          Andrew Kodkod
        </TextLink>.{" "}
        Feedback is <TextLink href="mailto:andrew@kodkod.me">very welcome</TextLink>!
      </Text>
    </div>
  )
}
