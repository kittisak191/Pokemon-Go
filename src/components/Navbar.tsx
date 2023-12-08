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
          <Col style={{textAlign:'center'}} span={24}>
            <img src="./img/logo.png" style={{ width: "300px"}} />
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default Navbar;
