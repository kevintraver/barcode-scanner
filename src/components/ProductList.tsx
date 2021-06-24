import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { ScanProduct } from "../types";
import "./ProductList.css";

interface ProductListPropTypes {
  items: ScanProduct[];
}

const ProductList: React.FC<ProductListPropTypes> = ({ items }) => (
  <div className="product-list">
    {items.map((item, index) => (
      <IonCard key={index}>
        <IonGrid>
          <IonRow>
            <IonCol size={"7"}>
              <IonCardHeader>
                <IonCardSubtitle>{item.product?.brands}</IonCardSubtitle>
                <IonCardTitle>{item.product?.product_name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>{item.code}</IonCardContent>
            </IonCol>
            <IonCol>
              <div className="img-wrapper">
                {item.product?.image_front_url && (
                  <img
                    className="img"
                    src={item.product?.image_front_url}
                    alt=""
                  />
                )}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCard>
    ))}
  </div>
);

export default ProductList;
