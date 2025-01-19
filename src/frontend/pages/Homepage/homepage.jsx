import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./homepage.css";
import Header from "../../components/Headers";
import Context from "../../Context";
import { CraCheckReportProduct } from "plaid";

function Homepage() {
  const { linkSuccess, dispatch } = useContext(Context);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const getInfo = useCallback(async () => {
    const response = await fetch("http://localhost:5000/api/info", { method: "POST" });
    if (!response.ok) {
      dispatch({ type: "SET_STATE", state: { backend: false } });
      return { paymentInitiation: false };
    }
    const data = await response.json();
    const craEnumValues = Object.values({});
    const isUserTokenFlow = data.products.some((product) =>
      craEnumValues.includes(product)
    );
    dispatch({
      type: "SET_STATE",
      state: {
        products: data.products,
        isPaymentInitiation: false,
        isCraProductsExclusively: false,
        isUserTokenFlow,
      },
    });
    return { isUserTokenFlow };
  }, [dispatch]);

  const generateUserToken = useCallback(async () => {
    const response = await fetch("http://localhost:5000/api/create_user_token", { method: "POST" });
    if (!response.ok) {
      dispatch({ type: "SET_STATE", state: { userToken: null } });
      return;
    }
    const data = await response.json();
    if (data) {
      if (data.error != null) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkToken: null,
            linkTokenError: data.error,
          },
        });
        return;
      }
      dispatch({ type: "SET_STATE", state: { userToken: data.user_token } });
      return data.user_token;
    }
  }, [dispatch]);

  const generateToken = useCallback(
    async (isPaymentInitiation) => {
      const path = isPaymentInitiation
        ? "http://localhost:5000/api/create_link_token_for_payment"
        : "http://localhost:5000/api/create_link_token";
      const response = await fetch(path, {
        method: "POST",
      });
      if (!response.ok) {
        dispatch({ type: "SET_STATE", state: { linkToken: null } });
        return;
      }
      const data = await response.json();
      if (data) {
        if (data.error != null) {
          dispatch({
            type: "SET_STATE",
            state: {
              linkToken: null,
              linkTokenError: data.error,
            },
          });
          return;
        }
        dispatch({ type: "SET_STATE", state: { linkToken: data.link_token } });
      }
      localStorage.setItem("link_token", data.link_token);
    },
    [dispatch]
  );

  useEffect(() => {
    const init = async () => {
      const { paymentInitiation, isUserTokenFlow } = await getInfo();
      if (window.location.href.includes("?oauth_state_id=")) {
        dispatch({
          type: "SET_STATE",
          state: {
            linkToken: localStorage.getItem("link_token"),
          },
        });
        return;
      }

      if (isUserTokenFlow) {
        await generateUserToken();
      }
      generateToken(paymentInitiation);
    };
    init();
  }, [dispatch, generateToken, generateUserToken, getInfo]);

  return (
    <div className="container">
      <div className="left-side">
        <h1 className="specialHeader">MicroMingle</h1>
        <div className="card">
          <p>
            MicroMingle is a website used to allow people to round up their
            spendings and then invest that excess cash in small cap companies.
            Small-cap businesses can also then register here and pitch their
            business to the population to get people who would like to invest.
            This is so that people who do not know much about investing could
            still invest and learn about companies that they would not have
            thought about before.
          </p>
        </div>
      </div>
      <div className="right-side">
        <Header />
        <Link to="/dashboard">
          <button onClick={() => console.log("Navigate to login")}>
            Login
          </button>
        </Link>
        <Link to="/dashboard">
          <button onClick={() => console.log("Navigate to sign up")}>
            Sign up
          </button>
        </Link>

        <p className="read-the-docs">Welcome to MicroMingle!</p>
      </div>
    </div>
  );
}

export default Homepage;
