import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import asyncHandler from "express-async-handler";
import Message from "../components/Message";
import Loader from "./../components/Loader";
import { deliverOrder, getOrderDetails, payOrder } from "./../actions/order";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/order";
import { getPaymentToken, processPayment } from "../actions/payment";
import { PAYMENT_PROCESS_RESET } from "./../constants/payment";

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;

  let instance = {};

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successOrder } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const paymentProcess = useSelector((state) => state.paymentProcess);
  const {
    success: successPayment,
    paymentData,
    loading: paymentLoading,
  } = paymentProcess;

  const paymentToken = useSelector((state) => state.paymentToken);
  const {
    payment,
    loading: loadingToken,
    success: successToken,
  } = paymentToken;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (successPayment) {
      const paymentResult = {
        id: paymentData.transaction.id,
        status: "COMPLETED",
        update_time: paymentData.transaction.updatedAt,
      };
      dispatch(payOrder(orderId, paymentResult));
    }
    if (!order || order._id !== orderId || successOrder || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch({ type: PAYMENT_PROCESS_RESET });
      dispatch(getPaymentToken());
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    orderId,
    order,
    successOrder,
    paymentData,
    successPayment,
    successDeliver,
    history,
    userInfo,
  ]);

  const onPurchase = asyncHandler(async () => {
    let nonce;
    let data = await instance.requestPaymentMethod();

    nonce = data.nonce;

    const processPaymentData = {
      paymentMethodNonce: nonce,
      amount: order.totalPrice,
      orderId: orderId,
    };
    dispatch(processPayment(processPaymentData));
  });

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>No order</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs. {item.price} = Rs.{" "}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs. {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs. {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs. {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs. {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingToken && <Loader />}
                  {paymentLoading && <Loader />}
                  {!successToken ? (
                    <Loader />
                  ) : (
                    <>
                      <DropIn
                        options={{ authorization: payment.clientToken }}
                        onInstance={(inst) => (instance = inst)}
                      />
                      <Button onClick={onPurchase} className="d-grid col-12">
                        Buy
                      </Button>
                    </>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="d-grid col-12"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;
