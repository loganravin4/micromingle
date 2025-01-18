import React, { useContext } from "react";

import Endpoint from "../Endpoint";
import Context from "../Context";
import ProductTypesContainer from "./ProductTypesContainer";
import { transactionsCategories,} from "../dataUtilities";

const Products = () => {
  const { products, isCraProductsExclusively } = useContext(Context);
  return (
    <ProductTypesContainer productType="Products">
      {products.includes("transactions") && (
        <Endpoint
          endpoint="transactions"
          name="Transactions"
          categories={transactionsCategories}
          schema="/transactions/sync/"
          description="Retrieve transactions or incremental updates for credit and depository accounts."
          transformData={transformTransactionsData}
        />
      )}
    </ProductTypesContainer>
  );
};

Products.displayName = "Products";

export default Products;
