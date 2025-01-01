import { useState } from "react";
import { CgClose } from "react-icons/cg";

function CreateRestaurant({ closeForm }) {
  const [obj, setObj] = useState({
    name: "",
    address: [],
    about: "",
    phone: "",
    days: "",
    hours: "",
    menu: [],
    tags: [],
  });
  const [tag, setTag] = useState("");
  const [menuItem, setMenuItem] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");

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
    alert("Tag added");
  }
  function handleMenuItemSubmit() {
    let updateMenu = [...obj.menu, menuItem];

    setObj((prev) => ({ ...prev, menu: updateMenu }));
    alert("Item added");
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
  function handleDropdownChange(e) {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function createRestaurant() {
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
      const formData = new FormData();
      formData.append("name", obj.name);
      formData.append("address", JSON.stringify(updateAddress));
      formData.append("about", obj.about);

      formData.append("phone", obj.phone);
      formData.append("days", obj.days);
      formData.append("hours", obj.hours);
      formData.append("tags", JSON.stringify(obj.tags));
      formData.append("menu", JSON.stringify(obj.menu));
      formData.append("image", image);
      const response = await fetch("http://localhost:3000/api/restaurants", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
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
    <div className="CreateRestaurant">
      <div className="create-nav">
        <div className="form-close" onClick={closeForm}>
          <CgClose />
        </div>
        <div style={{ color: "white", fontSize: "20px" }}>
          Create Restaurant
        </div>
        <button className="save-btn" onClick={createRestaurant}>
          Create
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
        />

        <br />
        <label htmlFor="city">City</label>

        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <label htmlFor="province">Province</label>

        <input
          type="text"
          name="province"
          id="province"
          onChange={(e) => setProvince(e.target.value)}
        />
        <br />
        <label htmlFor="country">Country</label>

        <input
          type="text"
          name="country"
          id="country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <label htmlFor="code">Code</label>

        <input
          type="text"
          name="code"
          id="code"
          onChange={(e) => setCode(e.target.value)}
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
        <label htmlFor="hours">Hours</label>

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
        <label htmlFor="image">Menu</label>
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
        <button onClick={() => handleTagSubmit()}>Add Item</button>
      </div>
      <div className="input">
        <label htmlFor="pic">Picture</label>

        <input
          type="file"
          name="pic"
          id="pic"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
      </div>
    </div>
  );
}

export default CreateRestaurant;
