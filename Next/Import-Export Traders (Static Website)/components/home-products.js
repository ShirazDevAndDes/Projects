import { useState } from "react";
import { caseToUpper } from "./myFunctions";
import Animate from "../components/animation";

function Products({ productItems }) {
  return (
    <Animate className="row justify-content-evenly">
      {productItems.map((productItem, index) => (
        <Animate
          variant={"popIn"}
          key={index}
          className="col-sm-4 col-md-3 col-lg-2 pb-4"
        >
          <div className="card text-center item-card">
            <img
              className="card-img-top"
              src={productItem.img}
              alt="productItem.name"
            />
            <div className="card-body">
              <h4 className="card-title h3">{caseToUpper(productItem.name)}</h4>
            </div>
          </div>
        </Animate>
      ))}
    </Animate>
  );
}

export default Products;
