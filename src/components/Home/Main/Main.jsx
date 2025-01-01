import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import CreateRestaurant from "./CreateRestaurant";
import UpdateRestaurant from "./UpdateRestaurant";
import { CgClose } from "react-icons/cg";

function Main() {
  const [openModal, setOpenModal] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [restaurant, setRestaurant] = useState({});
  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRestaurant();
    fetchProfile();
  }, []);
  async function fetchRestaurant() {
    try {
      const res = await fetch(`http://localhost:3000/api/restaurant`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok === true) {
        if (data.length > 0) {
          setRestaurant(data[0]);
          setIsRestaurant(true);
          localStorage.setItem("resId", JSON.stringify(data[0]._id));
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchProfile() {
    try {
      const res = await fetch(`http://localhost:3000/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok === true) {
        setUser(data);
        setIsUser(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Main">
      {showNotifications && user.notifications && (
        <div className="Modal">
          <div className="notifications">
            <div className="notifs-nav">
              <div
                className="form-close"
                onClick={() => setShowNotifications(false)}
              >
                <CgClose />
              </div>
              <div style={{ color: "white", fontSize: "20px" }}>
                Notifications
              </div>
            </div>
            {user.notifications.length > 0 ? (
              user.notifications.map((notification, i) => (
                <div key={i} className="notification">
                  {notification}
                </div>
              ))
            ) : (
              <div style={{ display: "flex", color: "white" }}>
                No notifications found
              </div>
            )}
          </div>
        </div>
      )}
      {openModal && (
        <div className="Modal">
          {isRestaurant && typeof restaurant ? (
            <UpdateRestaurant
              closeForm={() => setOpenModal(false)}
              restaurant={restaurant}
            />
          ) : (
            <CreateRestaurant closeForm={() => setOpenModal(false)} />
          )}
        </div>
      )}
      <div className="add-update-restaurant">
        <div className="notifs" onClick={() => setShowNotifications(true)}>
          <IoNotifications color="#e6e8e6" size="2.5rem" className="icon" />
          <span>{user && user.notifications && user.notifications.length}</span>
        </div>
        {isRestaurant ? (
          <div>Update your restaurant</div>
        ) : (
          <div>Add your restaurant</div>
        )}

        <button onClick={() => setOpenModal(true)}>
          {isRestaurant ? (
            <MdEdit color="#e6e8e6" size="2.5rem" className="icon" />
          ) : (
            <IoAdd color="#e6e8e6" size="2.5rem" className="icon" />
          )}
        </button>
      </div>
      <div className="restaurant">
        {loading ? (
          <div style={{ display: "flex", color: "white" }}>Loading...</div>
        ) : JSON.stringify(restaurant) !== "{}" ? (
          <>
            <div className="details">
              <h3>{restaurant.name}</h3>
            </div>
            <div className="image-address">
              <div className="image">
                <img src={restaurant.imageUrl} />
              </div>
              <div className="address">
                <h4>Address</h4>
                {restaurant.address &&
                  restaurant.address.length > 0 &&
                  restaurant.address.map((line, i) => (
                    <div className="line" key={i}>
                      {line}
                    </div>
                  ))}
              </div>
            </div>
            <div className="details">
              <h4>About</h4>
              <div className="text">{restaurant.about}</div>
            </div>
            <div className="details">
              <h4>Contact</h4>
              <div className="text">{restaurant.phone}</div>
            </div>

            <div className="details">
              <h4>Opening Days/Hours</h4>
              <div className="days-hours">
                <div className="days text">{restaurant.days}</div>
                <div className="hours text">{restaurant.hours}</div>
              </div>
            </div>
            <div className="details">
              <h4>Tags</h4>

              <div className="tags">
                {restaurant.tags &&
                  restaurant.tags.length > 0 &&
                  restaurant.tags.map((tag, i) => (
                    <div className="tag" key={i}>
                      {tag}
                    </div>
                  ))}
              </div>
            </div>
            <div className="details">
              <h4>Menu</h4>
              <div className="menu">
                {restaurant.menu &&
                  restaurant.menu.length > 0 &&
                  restaurant.menu.map((item, i) => (
                    <div className="item" key={i}>
                      {item}
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              color: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No restaurant informationto show
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
