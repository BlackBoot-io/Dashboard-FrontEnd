import { Col, Row } from "antd";
import { Option } from "antd/lib/mentions";
import Button from "components/comps/Button";
import Dropdown from "components/comps/Dropdown";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import List from "./comps/List";

const Notifications = () => {
  const { t } = useTranslation();
  const [pageSize, setPageSize] = useState(50)

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  return (
    <div id="notifications">
      <Row className="notifications-title-row">
        <Col xs={24} sm={6} className="notifications-title">
          <div className="notifications-title-image">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 16C0 8.45753 0 4.68629 2.34315 2.34315C4.68629 0 8.45753 0 16 0H28C35.5425 0 39.3137 0 41.6569 2.34315C44 4.68629 44 8.45753 44 16V28C44 35.5425 44 39.3137 41.6569 41.6569C39.3137 44 35.5425 44 28 44H16C8.45753 44 4.68629 44 2.34315 41.6569C0 39.3137 0 35.5425 0 28V16Z"
                fill="#FF7E00"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.522 23.2524C12.3334 18.0997 16.3496 13.7659 21.5017 13.5625C26.6538 13.7659 30.67 18.0997 30.4815 23.2524C30.4815 25.3925 32.8068 27.4774 32.8751 29.6224C32.8751 29.6527 32.8751 29.683 32.8751 29.7134C32.9254 31.0876 31.854 32.2434 30.4798 32.2971H25.2928C25.2976 33.3502 24.9007 34.3654 24.183 35.136C23.4928 35.8855 22.5205 36.3119 21.5017 36.3119C20.4829 36.3119 19.5106 35.8855 18.8205 35.136C18.1027 34.3654 17.7058 33.3502 17.7106 32.2971H12.522C11.1478 32.2434 10.0764 31.0876 10.1267 29.7134C10.1267 29.683 10.1267 29.6527 10.1267 29.6224C10.1966 27.4839 12.522 25.3941 12.522 23.2524Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7106 31.5471C17.2964 31.5471 16.9606 31.8829 16.9606 32.2971C16.9606 32.7113 17.2964 33.0471 17.7106 33.0471V31.5471ZM25.2928 33.0471C25.707 33.0471 26.0428 32.7113 26.0428 32.2971C26.0428 31.8829 25.707 31.5471 25.2928 31.5471V33.0471ZM23.1267 11.0625C23.5409 11.0625 23.8767 10.7267 23.8767 10.3125C23.8767 9.89829 23.5409 9.5625 23.1267 9.5625V11.0625ZM19.8767 9.5625C19.4625 9.5625 19.1267 9.89829 19.1267 10.3125C19.1267 10.7267 19.4625 11.0625 19.8767 11.0625V9.5625ZM17.7106 33.0471H25.2928V31.5471H17.7106V33.0471ZM23.1267 9.5625H19.8767V11.0625H23.1267V9.5625Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="notifications-title-text">{t("notifications")}</div>
        </Col>
        <Col xs={24} md={18} className="action">
          <div className="pager">
            <h4>{t("ShowRows")}</h4>
            <Dropdown
              defaultValue={50}
              onChange={handlePageSizeChange}
              allowClear={false}
            >
              <Option value="50">50</Option>
              <Option value="100">100</Option>
              <Option value="200">200</Option>
            </Dropdown>
          </div>
        </Col>
      </Row>
      <Row>
        <List />
      </Row>
    </div>
  );
};

export default Notifications;
