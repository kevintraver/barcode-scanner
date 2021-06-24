import React, { useState } from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { scanOutline, closeOutline } from "ionicons/icons";
import { getScanContent, cancelScan } from "../util/scanner";

interface BarcodeScannerPropTypes {
  onScanComplete: (item: string) => void;
  onScanFail: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerPropTypes> = ({
  onScanComplete,
  onScanFail,
}) => {
  const [isScanning, setIsScanning] = useState(false);

  const onScanClick = async () => {
    if (!isScanning) {
      setIsScanning(true);
      try {
        const scanContent = await getScanContent();
        onScanComplete(scanContent);
        setIsScanning(false);
      } catch (error) {
        cancelScan();
        onScanFail();
        setIsScanning(false);
      }
    } else {
      cancelScan();
      setIsScanning(false);
    }
  };

  return (
    <IonFab
      slot="fixed"
      vertical="bottom"
      horizontal="end"
      style={{ visibility: "visible" }}
    >
      <IonFabButton onClick={onScanClick}>
        <IonIcon icon={isScanning ? closeOutline : scanOutline} />
      </IonFabButton>
    </IonFab>
  );
};

export default BarcodeScanner;
