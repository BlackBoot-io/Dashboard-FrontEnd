import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Card, Segmented, Input, Button, Form } from "antd";
import BagIcon from "assets/images/bag.svg";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EthereumIcon from "assets/images/networks/etherium.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import DangerTriangleIcon from "assets/images/danger-triangle.svg";

import { useAddMutation } from "api/transaction";

import Confirm from "./Confirm";

const BuyTokenForm = () => {
  const [token, setToken] = useState('eth');
  const [modalVisibility, setModalVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, { isLoading, error, isError }] = useAddMutation();

  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    const finalData = Object.assign(values, { network: token, });
    setErrorMsg("");
    const response = await data(finalData).unwrap();
    if (!response.isSuccess) {
      setErrorMsg(response.message);
      return;
    } else {
      openDetailModal();
    }
  };

  const openDetailModal = () => {
    setModalVisibility(true);
  };

  const closeDetailModal = () => {
    setModalVisibility(false);
  };

  return (
    <Col xs={24} xxl={16} id="buy-form">
      <Confirm modalVisibility={modalVisibility} onClose={closeDetailModal} />
      <Card style={{ width: "100%" }} className="buy-card">
        <p className="buy-p">
          Plese choose the network you are going to transfer through.
        </p>
        <Form
          name="buyTokenForm"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Segmented
            block
            value={token}
            onChange={(value) => setToken(value)}
            options={[
              {
                label: <img src={EthereumIcon} alt="ethereumIcon" />,
                value: "eth"
              },
              {
                label: <img src={SolanaIcon} alt="SolanaIcon" />,
                value: "sol"
              },
              {
                label: <img src={BscscanIcon} alt="BscscanIcon" />,
                value: "bnb"
              },
              {
                label: <img src={BitcoinIcon} alt="BitcoinIcon" />,
                value: "btc"
              },
            ]}
          />
          <p className="buy-p" style={{ marginTop: 30 }}>
            Enter the amount in the first box that you would like to contribute to
            purchase tokens.
          </p>
          <Row gutter={[24, 16]}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                name="usdtAmount"
                rules={[
                  { required: true, message: 'This field is required.' },
                  { min: 3, message: 'The deposit can not be less than $100.' }
                ]}
              >
                <label className="custom-label">{`${t("yourDeposit")}`}</label>
                <Input className="custom-input" addonAfter={<span>usd</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item name="cryptoAmount">
                <label className="custom-label">{`${t("yourDeposit")} in `}<span style={{ textTransform: 'uppercase' }}>{token}</span></label>
                <Input className="custom-input" addonAfter={<span>{ token }</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item name="tokenCount">
                <label className="custom-label">{`${t("recieveToken")}`}</label>
                <Input className="custom-input" addonAfter={<span>avn</span>} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={24} style={{ marginTop: 20 }}>
              <img
                src={DangerTriangleIcon}
                style={{ marginRight: 5 }}
                alt="danger icon"
              />
              <p className="buy-p inline" style={{ marginBottom: 0 }}>
                The price shown here is not final. When the payment is submitted
                on the gateway,the network and gas fees will be added.
              </p>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <img
                src={DangerTriangleIcon}
                style={{ marginRight: 5 }}
                alt="danger icon"
              />
              <p className="buy-p inline">
                The contribution will be calculated based on the exchange rate at
                the moment that your transaction is confirmed.
              </p>
            </Col>
            <Col xs={24} md={24} lg={24}>
              <Button
                className="btn-primary w-100 buy-button"
                loading={isLoading}
                htmlType="submit"
              >
                <img src={BagIcon} style={{ marginRight: 7 }} alt="bag logo" />
                {t("beginTransaction")}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  );
};
export default BuyTokenForm;
