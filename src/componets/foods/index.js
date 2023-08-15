import { React, useState, useEffect } from "react";
import Dishes from "./list";

function Food({ toshow }) {

  const [pro, setPro] = useState(Dishes);
  //  new state for cart
  const [cart, addToCart] = useState([]);

  const [value, setValue] = useState("");
  //const [selectedCat, setSelectedCat] = useState("");
  const [filtered, setFiltered] = useState([]);
  

  useEffect(() => {
    setPro(pro);
    setFiltered(pro);
    //setSelectedCat(pro);
  }, []);

  const handleSearchResults = () => {
    if (value !== "") {
      return pro.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    } else if (value === "" && pro !== []) {
      return pro;
    }
  };

  // const filterByCat = () => {
  //   // Avoid filter for empty string

  //   if (value !== "") {
  //     return pro.filter((item) =>
  //       item.category.split(" ").indexOf(selectedCat) !== -1
  //     );
  //   } else if (value === "" && pro !== []) {
  //     return pro;
  //   }
    
  // };

  useEffect(() => {
    // Search for food
    let filtered = handleSearchResults();
     //filtered = filterByCat();
    setFiltered(filtered);
  }, [value]);


  return (
    <div className="listingPage">
      <section className="container">
        <div className="sectionFilters">
          <div className="searchbox">
            <input
              className="input"
              placeholder="search for food"
              type="text"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}

            />
          </div>
<br/><br/>
<br/><br/>
          {/* <div className="cat-filter">
            <div>Filter by :</div>
            <select
             className="selectbox"
              id="cat-input"
              value={selectedCat}
              onChange={(e) => {
                setSelectedCat(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non Veg</option>
            </select>
          </div> */}

        </div>
        <div className={toshow ? "hide" : "row"} >
          {filtered &&
            filtered.map((item) => {
              return (
                <div className="service" key={item.key}>
                  <div className="prdimag"><img src={item.image} alt={item.name} /></div>

                  <h3>{item.name}</h3>
                  <p>RS. {item.price}</p>
                  <p><strong className={item.category == "Veg" ? "veg" : "nonveg"}>{item.category}</strong></p>
                  <p>{item.descrption}</p>

                  <button className="btn" onClick={() => {
                    // added a function to add the pizza to the cart
                    alert(`${item.name} has been added to cart`);
                    // spread previous values and append new one
                    addToCart([...cart, item]);
                    console.log(item, 'item');
                  }}
                  >
                    Add to basket
                  </button>

                </div>

              );
            })}
        </div>

        {toshow ? (
          <div className=" cart-cont">
            <div className="cart-list">
              <h1>Cart</h1>
              {/* cart items */}
              <div className="row">
              {cart && cart.map((item, index) => {
                return (
                  <div className="service" key={item.key}>
                  <div className="prdimag"><img src={item.image} alt={item.name} /></div>

                  <h3>{item.name}</h3>
                  <p>RS. {item.price}</p>
                  <p><strong className={item.category == "Veg" ? "veg" : "nonveg"}>{item.category}</strong></p>
                  <p>{item.descrption}</p>

                  <button className="btn" onClick={(e) => {
                      // remove item from cart
                      cart.splice(index, 1);
                      let x = cart;
                      addToCart([...x]);
                    }} >Remove Item</button>

                </div>
                  
                );
              })}
              </div>
            </div>
            <div className="total">
              <h1>Total</h1>
              <p>Rs. {cart.reduce((a, b) => a + b.price, 0)}</p>
              <button className="btn">Check out</button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Food;
