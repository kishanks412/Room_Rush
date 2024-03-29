import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;
 
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const dispatch = useDispatch();
  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `${backend_url}/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log(data);
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      // console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);
  // console.log(propertyList)

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title-list">Your Property List</h1>
        {propertyList == "" ? (
          <p className="para">Nothing to Show</p>
        ) : (
          <div className="list">
            {propertyList?.map(
              ({
                _id,
                creator,
                listingPhotoPaths,
                city,
                province,
                country,
                category,
                type,
                price,
                booking = false,
              }) => (
                <ListingCard
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              )
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PropertyList;
