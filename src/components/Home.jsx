import Banner from "./Banner";
import Featured from "./Featured";
import Footer from "./Footer";
import Navigation from "./Navigation";
import PreHeader from "./PreHeader";
import Subscribe from "./Subscribe";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { useState } from "react";

export default function Home(props) {
  let { cart, setCart } = props;
  return (
    <div>
      <PreHeader />
      <Navigation cart={cart} show_cart={true} isActiveHome={props.isActive} />
      <Banner />
      <Featured cart={cart} setCart={setCart} />
      <Subscribe />
      <Footer />
    </div>
  );
}
