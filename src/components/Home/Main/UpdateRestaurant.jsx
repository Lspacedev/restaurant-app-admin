import { useState } from "react";
import { CgClose } from "react-icons/cg";

function UpdateRestaurant({ closeForm, restaurant }) {
  const [obj, setObj] = useState({
    name: restaurant.name,
    address: [],
    about: restaurant.about,
    phone: restaurant.phone,
    days: "",
    hours: "",
    menu: restaurant.menu,
    tags: restaurant.tags,
  });
  const [tag, setTag] = useState("");
  const [menuItem, setMenuItem] = useState("");
  const [street, setStreet] = useState(restaurant.address[0]);
  const [city, setCity] = useState(restaurant.address[1]);
  const [province, setProvince] = useState(restaurant.address[2]);
  const [country, setCountry] = useState(restaurant.address[3]);
  const [code, setCode] = useState(restaurant.address[4]);

  const [image, setImage] = useState();
  const token = localStorage.getItem("token");
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  function handleAddressSubmit() {
    let updateAddress = [...obj.address];
    updateAddress.push(street);
    updateAddress.push(city);
    updateAddress.push(province);
    updateAddress.push(country);
    updateAddress.push(code);

    setObj((prev) => ({ ...prev, address: updateAddress }));
  }
  function handleTagSubmit() {
    let updateTags = [...obj.tags, tag];

    setObj((prev) => ({ ...prev, tags: updateTags }));
    //setTag("");
    alert("Tag added");
  }
  function handleTagDelete(delTag) {
    let updateTags = [...obj.tags];

    setObj((prev) => ({
      ...prev,
      tags: updateTags.filter((tag) => tag !== delTag),
    }));
    alert("Tag deleted");
  }
  function handleMenuItemDelete(delItem) {
    let updateMenu = [...obj.menu];

    setObj((prev) => ({
      ...prev,
      menu: updateMenu.filter((item) => item !== delItem),
    }));
    alert("Item deleted");
  }
  function handleMenuItemSubmit() {
    let updateMenu = [...obj.menu, menuItem];

    setObj((prev) => ({ ...prev, menu: updateMenu }));
    //setMenuItem("");
    alert("Item added");
  }
  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function updateRestaurant() {
    try {
      let updateAddress = [...obj.address];
      updateAddress.push(street);
      updateAddress.push(city);
      updateAddress.push(province);
      updateAddress.push(country);
      updateAddress.push(code);
      if (
        obj.name === "" &&
        updateAddress.length === 0 &&
        obj.about === "" &&
        obj.phone === ""
      ) {
        alert("Please enter restaurant information.");
        closeForm();
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/restaurants/${restaurant._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...obj, address: updateAddress }),
        }
      );
      const data = await response.json();
      if (response.ok === true) {
        //navigation(0);
        closeForm();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="UpdateRestaurant">
      <div className="create-nav">
        <div className="form-close" onClick={closeForm}>
          <CgClose />
        </div>
        <div style={{ color: "white", fontSize: "20px" }}>
          Update Restaurant
        </div>
        <button className="save-btn" onClick={updateRestaurant}>
          Save
        </button>
      </div>
      <div className="input">
        <label htmlFor="name">Restaurant Name</label>

        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => handleChange(e)}
          value={obj.name}
        />
        <br />
      </div>
      <div className="input">
        <label htmlFor="phone">Phone</label>

        <input
          type="text"
          name="phone"
          id="phone"
          onChange={(e) => handleChange(e)}
          value={obj.phone}
        />
        <br />
      </div>
      <div className="input">
        <h3>Address</h3>
        <label htmlFor="street">Street</label>

        <input
          type="text"
          name="street"
          id="street"
          onChange={(e) => setStreet(e.target.value)}
          value={street}
        />

        <br />
        <label htmlFor="city">City</label>

        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />
        <br />
        <label htmlFor="province">Province</label>

        <input
          type="text"
          name="province"
          id="province"
          onChange={(e) => setProvince(e.target.value)}
          value={province}
        />
        <br />
        <label htmlFor="country">Country</label>

        <input
          type="text"
          name="country"
          id="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
        <br />
        <label htmlFor="code">Code</label>

        <input
          type="text"
          name="code"
          id="code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
      </div>
      <div className="input">
        <label htmlFor="days">Days</label>
        <select name="days" onChange={handleDropdownChange} value={obj.value}>
          <option value=""></option>
          <option value="Mon-Fri">Monday - Friday</option>
          <option value="Mon-Sun">Monday - Sunday</option>
        </select>
        <br />
      </div>
      <div className="input">
        <label htmlFor="hours">hours</label>

        <select name="hours" onChange={handleDropdownChange} value={obj.value}>
          <option value=""></option>
          <option value="Breakfast-Dinner">Breakfast to Dinner</option>
          <option value="Breakfast-Lunch">Breakfast to Lunch</option>
          <option value="Lunch-Dinner">Lunch to Dinner</option>
          <option value="247">247</option>
        </select>
        <br />
      </div>
      <div className="input">
        <label htmlFor="about">About</label>
        <textarea
          id="about"
          name="about"
          onChange={(e) => handleChange(e)}
          value={obj.about}
        ></textarea>

        <br />
      </div>
      <div className="input">
        <label htmlFor="menu">Menu</label>
        <div className="update menu">
          {obj.menu.length > 0 &&
            obj.menu.map((item, i) => (
              <div className="update item" key={i}>
                <div>{item}</div>
                <div onClick={() => handleMenuItemDelete(item)}>
                  <CgClose />
                </div>
              </div>
            ))}
        </div>
        <input
          type="text"
          name="menu"
          id="menu"
          onChange={(e) => setMenuItem(e.target.value)}
        />
        <br />
        <button onClick={() => handleMenuItemSubmit()}>Add Item</button>
      </div>
      <div className="input">
        <label htmlFor="tags">Tags</label>

        <div className="update tags">
          {obj.tags.length > 0 &&
            obj.tags.map((tag, i) => (
              <div className="update tag" key={i}>
                <div>{tag}</div>
                <div onClick={() => handleTagDelete(tag)}>
                  <CgClose />
                </div>
              </div>
            ))}
        </div>
        <input
          type="text"
          name="tags"
          id="tags"
          onChange={(e) => setTag(e.target.value)}
        />
        <br />
        <button onClick={() => handleTagSubmit()}>Add Tag</button>
      </div>
    </div>
  );
}

export default UpdateRestaurant;