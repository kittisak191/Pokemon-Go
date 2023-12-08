import { Col, Layout, Row } from "antd";
import "./Navbar.css";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout className="layout">
      <Header
        className="Navbar-header"
        style={{
          height: "auto",
        }}
      >
        <Row>
          <Col span={12}>
            <img src="./img/logo.png" style={{ width: "300px" }} />
          </Col>
          <Col span={12} style={{ display: "flex", flexDirection: "row" }}>
            <p
              style={{
                marginRight: "20px",
                fontSize: "30px",
                marginTop: "60px",
                color: "red",
              }}
            >
              Pokemon
            </p>
            <p
              style={{
                marginRight: "20px",
                fontSize: "30px",
                marginTop: "60px",
                color: "black",
              }}
            >
              About
            </p>
            <p
              style={{
                marginRight: "20px",
                fontSize: "30px",
                marginTop: "60px",
                color: "blue",
              }}
            >
              Battle Power
            </p>
            <p
              style={{
                marginRight: "20px",
                fontSize: "30px",
                marginTop: "60px",
                color: "black",
              }}
            >
              List of Type Pokemon
            </p>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default Navbar;
