import { Col, DatePicker, Form, Input, message, Row, Select } from "antd";
import { useGetCurrentUserInfoQuery, useUpdateProfileMutation } from "api/account";
import Button from "components/comps/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { countryNames } from "config/constants";

const UpdateProfile = ({ data }) => {
    const [form] = Form.useForm();
    const { t } = useTranslation();
    const [errorMsg, setErrorMsg] = useState("");

    const dispatch = useDispatch();
    const { user } = useSelector((x) => x.auth);
    const [updateProfile, { isLoading, error, isError }] = useUpdateProfileMutation();

    const handleSubmit = async (values) => {
        setErrorMsg("");
        const call = await updateProfile(values);
        if (call.error) {
            setErrorMsg(call.error.data.message);
            message.error(t("updateFailed"));
            return;
        }

        message.success(t("updateProfileSuccess"));
    };

    useEffect(() => {
        form.setFieldsValue({
            fullname: user.fullName,
            email: user.email,
            birthdayDate: moment(new Date(user.birthdayDate), 'YYYY/MM/DD'),
            gender: user.gender,
            nationality: user.nationality
        })
    }, [])

    return <div id="update-profile">
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
        >
            <Row gutter={[24, 16]} style={{ marginBottom: '20px' }}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item name="fullname" label={<span className="input-label">{t("name")}</span>}>
                        <Input className="custom-input" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item name="email" label={<span className="input-label">{t("email")}</span>}>
                        <Input className="custom-input" suffix={
                            <span className="verified-email">Verified</span>
                        } />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item name="birthdayDate" label={<span className="input-label">{t("birthdayDate")}</span>}>
                        <DatePicker className="custom-input" format="YYYY/MM/DD" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[24, 16]} style={{ marginBottom: '28px' }}>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item name="gender" label={<span className="input-label">{t("gender")}</span>}>
                        <Select >
                            <Select.Option key={1} value={1}>Male</Select.Option>
                            <Select.Option key={0} value={0}>Female</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item name="nationality" label={<span className="input-label">{t("nationality")}</span>}>
                        <Select className="custom-input">
                            {countryNames.map(countryName => <Select.Option key={countryName} value={countryName}>{countryName}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item>
                    <Button
                        className="btn-primary w-100 update-profile-button"
                        type="submit"
                        loading={isLoading}
                        style={{ width: '169px', height: '48px' }}
                    >
                        {t("updateProfile")}
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    </div>;
};

export default UpdateProfile;
