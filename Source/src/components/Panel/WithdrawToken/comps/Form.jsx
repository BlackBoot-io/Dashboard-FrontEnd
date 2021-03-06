import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card, Form, Segmented, Input, Alert, notification } from "antd";
import { useTranslation } from "react-i18next";
import { useAddMutation, useGetUserBalanceQuery } from "api/transaction";
import utils from 'config/utils'
import { networkTypes, transactionTypes } from "config/enums";
import Button from "../../../comps/Button";
import ethereumIcon from "assets/images/networks/ethereum.svg";
import routes from "../../../../config/routes";
import { useSelector } from "react-redux";

const WithdrawForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedNetwork, setSelectedNetwork] = useState(networkTypes.Ethereum)
    const { user } = useSelector(x => x.auth);
    const [add, { isLoading, isSuccess, error, isError }] = useAddMutation();
    const userBalance = useGetUserBalanceQuery();

    const openNotification = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    const validateMessages = {
        required: 'input is required!',
    };
    const onClickSetMax = (value) => {
        form.setFieldsValue({
            amount: value,
        });
    };
    const handleSubmit = async (value) => {
        const values = await form.validateFields();
        var data = {
            Network: selectedNetwork,
            TokenCount: values.amount,
            Type: transactionTypes.Withdraw
        }
        const response = await add(data).unwrap();
        if (!response.isSuccess) {
            openNotification('error', response.message);
            return;
        }
        openNotification('success', t("tokenWithdrawnSuccessfully"));
        navigate(`/${routes.transactions}`)
    };
    return (
        <Col xs={24} xl={16} xxl={16} id="withdraw-form">
            <div style={{ width: '100%' }} className="custom-card withdraw-card">
                <p className="withdraw-p">
                    Withdraw via network
                </p>
                <Form
                    validateMessages={validateMessages}
                    form={form}
                    name="withdrawTokenForm"
                    initialValues={{ address: user.walletAddress }}
                    layout="vertical" >
                    <Segmented
                        options={[
                            {
                                icon: (
                                    <img
                                        src={ethereumIcon}
                                        alt="EthereumIcon"
                                        onClick={() => setSelectedNetwork(networkTypes.Ethereum)}
                                    />
                                ),
                                value: 'etherium',
                            }
                        ]}
                    />

                    {
                        (user.walletAddress == null) ?
                            <Col xs={24} md={24} lg={24} style={{ marginTop: "33px", padding: 0 }}>
                                <Alert className="alert-wallet" action={
                                    <Button size="small" type="text" className="btn-profile" onClick={() => navigate(`/${routes.profile}`)} >
                                        Update Profile
                                    </Button>
                                } message="You do not have wallete address for withdrawing update your profile" />
                            </Col>
                            :
                            <Col xs={24} md={24} lg={24} style={{ marginTop: "33px", padding: 0 }}>
                                <label className="custom-label">{`${t("walletAddress")}`}</label>
                                <Form.Item name="address">
                                    <Input className="custom-input" disabled />
                                </Form.Item>
                            </Col>

                    }

                    <Col xs={24} md={24} lg={24} style={{ marginTop: "42px", padding: 0 }}>
                        <div className="withdraw-amount-holder">
                            <p className="withdraw-amount"> Available withdrawal amount:<span className="withdraw-maxamount">{utils.commaThousondSeperator(userBalance.data?.data)}</span>AVN </p>
                            <button className="withdraw-btn-max" onClick={() => onClickSetMax(userBalance.data?.data)}>Max</button>
                        </div>
                        <Form.Item name="amount"
                            label={`${t("withdrawalAmount")}:`}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input amount!'
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value != "" && value > userBalance.data?.data) {
                                            return Promise.reject(new Error(t('moreThanAvailableWithdrawalAmount')));
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (value != "" && isNaN(value)) {
                                            return Promise.reject(new Error(t("withdrawValueTypeError")));
                                        }
                                        return Promise.resolve();
                                    },
                                })]} >
                            <Input className="custom-input" maxLength={userBalance.data?.data.length} />
                        </Form.Item>
                        <div className="withdraw-amount-holder">
                            <p className="withdraw-amount"> Withdrawal fees : <span >{utils.commaThousondSeperator(userBalance.data?.data)}</span> USDT </p>
                        </div>
                    </Col>

                    <Col xs={24} md={24} lg={24} style={{ padding: 0 }}>
                        <Form.Item className="mb-1">
                            <Button className="btn-primary w-100 buy-button" style={{ marginTop: "60px", padding: 0 }} type="submit" loading={isLoading} onClick={handleSubmit}>
                                {t("Withdraw")}
                            </Button>
                        </Form.Item>
                    </Col>
                </Form>
            </div >
        </Col>
    );
};
export default WithdrawForm;
