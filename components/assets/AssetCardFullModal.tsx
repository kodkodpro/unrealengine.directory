import { XMarkIcon } from "@heroicons/react/24/solid"
import AssetCardFull from "@/components/assets/AssetCardFull"
import { Button } from "@/components/catalyst/button"
import { Dialog, DialogBody, DialogDescription, DialogTitle } from "@/components/catalyst/dialog"
import { AssetFull } from "@/lib/types/AssetFull"
import { closeModal } from "@/stores/modal"

export type AssetCardFullModalProps = {
  asset: AssetFull
}

export default function AssetCardFullModal({ asset }: AssetCardFullModalProps) {
  return (
    <Dialog
      open
      size="screen-2xl"
      onClose={closeModal}
    >
      <DialogTitle className="sm:text-2xl">
        {asset.name}

        <Button
          plain
          className="float-right [&>[data-slot=icon]]:sm:size-6"
          onClick={closeModal}
        >
          <XMarkIcon />
        </Button>
      </DialogTitle>
      <DialogDescription>
        {asset.shortDescription}
      </DialogDescription>
      <DialogBody>
        <AssetCardFull
          asset={asset}
          showTitle={false}
        />
      </DialogBody>
    </Dialog>
  )
}
