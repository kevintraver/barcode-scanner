import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import ProductList from "../../components/ProductList";
import BarcodeScanner from "../../components/BarcodeScanner";
import { getProductFromCode } from "../../util/product";
import { ScanResponse, ScanProduct } from "../../types";
import "./ProductListPage.css";

const ProductListPage: React.FC = () => {
  const [scanCode, setScanCode] = useState<string | null>(null);
  const [productList, setProductList] = useState<ScanProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (scanCode) {
      setIsLoading(true);
      getProductFromCode(scanCode)
        .then((response: ScanResponse) => {
          const { data } = response;
          setProductList(productList ? [...productList, data] : [data]);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
      setScanCode(null);
    }
  }, [scanCode, productList]);

  const handleScanComplete = (item: string) => {
    setScanCode(item);
  };

  const handleScanFail = () => {
    setScanCode(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"primary"}>
          <IonTitle>Scan Monkey</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar color="light" slot={"start"}>
        <IonTitle size="small">{productList.length} products scanned.</IonTitle>
      </IonToolbar>
      <IonContent fullscreen>
        <ProductList items={productList} />
        <BarcodeScanner
          onScanComplete={handleScanComplete}
          onScanFail={handleScanFail}
        />
        <IonLoading isOpen={isLoading} message={"Retrieving product ..."} />
      </IonContent>
    </IonPage>
  );
};

export default ProductListPage;
