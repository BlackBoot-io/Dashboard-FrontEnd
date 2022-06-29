import Icon from "components/comps/Icon";
import { useTranslation } from "react-i18next";
import Utils from "config/utils";
import { Row } from "antd";
import DataTable from "components/comps/DataTable";
import {
  transactionTypes,
  transactionStatusTypes,
  networkTypes,
} from "config/enums";
import BitcoinIcon from "assets/images/networks/bitcoin.svg";
import BscscanIcon from "assets/images/networks/bscscan.svg";
import EthereumIcon from "assets/images/networks/etherium.svg";
import SolanaIcon from "assets/images/networks/solana.svg";
import TetherIcon from "assets/images/networks/tetherIcon.svg";

const NetworkType = ({ network }) => {
  let src = "";
  let alt = "";
  switch (network) {
    case networkTypes.Binance:
      src = BscscanIcon;
      alt = "Binance Network";
      break;
    case networkTypes.Bitcoin:
      src = BitcoinIcon;
      alt = "Bitcoin Network";
      break;
    case networkTypes.Ethereum:
      src = EthereumIcon;
      alt = "Ethereum Network";
      break;
    case networkTypes.Solana:
      src = SolanaIcon;
      alt = "Solana Network";
      break;
    case networkTypes.Tether:
      src = TetherIcon;
      alt = "Tether Network";
      break;
    default:
      break;
  }
  return <img width={85} src={src} alt={alt} />;
};

const Price = ({ usdtAmount, cryptoAmount, network }) => {
  let networkSymbol = "";
  switch (network) {
    case networkTypes.Binance:
      networkSymbol = "BNB";
      break;
    case networkTypes.Bitcoin:
      networkSymbol = "BTC";
      break;
    case networkTypes.Ethereum:
      networkSymbol = "ETH";
      break;
    case networkTypes.Solana:
      networkSymbol = "SOL";
      break;
    case networkTypes.Tether:
      networkSymbol = "USDT";
      break;
    default:
      break;
  }
  return (
    <>
      <span
        style={{
          fontWeight: 600,
        }}
      >
        {usdtAmount} USDT
      </span>
      <p>
        {cryptoAmount} {networkSymbol}
      </p>
    </>
  );
};
const List = (props) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: () => t("Price"),
      dataIndex: ["usdtAmount", "cryptoAmount", "network"],
      align: "center",
      render: (text, row) => (
        <Price
          usdtAmount={row["usdtAmount"]}
          cryptoAmount={row["cryptoAmount"]}
          network={row["network"]}
        ></Price>
      ),
    },
    {
      title: () => t("Network"),
      dataIndex: "network",
      align: "center",

      render: (value) => <NetworkType network={value}></NetworkType>,
    },
    {
      title: () => t("WalletAddress"),
      dataIndex: "walletAddress",
      align: "center",

      render: (value) => (
        <div>
          {Utils.shortTextMiddle(value, 20)}

          <span
            onClick={Utils.copyToClipboard(value)}
            style={{
              marginLeft: 4,
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 13C12 13.5304 11.7893 14.0391 11.4142 14.4142C11.0391 14.7893 10.5304 15 10 15H3C2.46957 15 1.96086 14.7893 1.58579 14.4142C1.21071 14.0391 1 13.5304 1 13V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4V5C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H10C10.2652 14 10.5196 13.8946 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13H12Z"
                fill="#5B626E"
              />
              <path
                d="M6 2C5.73478 2 5.48043 2.10536 5.29289 2.29289C5.10536 2.48043 5 2.73478 5 3V10C5 10.2652 5.10536 10.5196 5.29289 10.7071C5.48043 10.8946 5.73478 11 6 11H13C13.2652 11 13.5196 10.8946 13.7071 10.7071C13.8946 10.5196 14 10.2652 14 10V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H6ZM6 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V10C15 10.5304 14.7893 11.0391 14.4142 11.4142C14.0391 11.7893 13.5304 12 13 12H6C5.46957 12 4.96086 11.7893 4.58579 11.4142C4.21071 11.0391 4 10.5304 4 10V3C4 2.46957 4.21071 1.96086 4.58579 1.58579C4.96086 1.21071 5.46957 1 6 1V1Z"
                fill="#5B626E"
              />
            </svg>
          </span>
        </div>
      ),
    },
    {
      title: () => t("Type"),
      dataIndex: "type",
      align: "center",
      render: (value) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 2,
            justifyContent: "center",
          }}
        >
          {value === transactionTypes.Deposit ? (
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.91663 12.6346C4.91663 12.2204 4.58084 11.8846 4.16663 11.8846C3.75241 11.8846 3.41663 12.2204 3.41663 12.6346H4.91663ZM4.16663 13.4769H3.41663H4.16663ZM16.5833 12.6346C16.5833 12.2204 16.2475 11.8846 15.8333 11.8846C15.4191 11.8846 15.0833 12.2204 15.0833 12.6346H16.5833ZM9.41187 13.0115C9.15481 13.3363 9.20971 13.808 9.5345 14.065C9.85929 14.3221 10.331 14.2672 10.588 13.9424L9.41187 13.0115ZM13.9214 9.73085C14.1784 9.40606 14.1235 8.93437 13.7988 8.6773C13.474 8.42024 13.0023 8.47514 12.7452 8.79993L13.9214 9.73085ZM9.41187 13.9424C9.66894 14.2672 10.1406 14.3221 10.4654 14.065C10.7902 13.808 10.8451 13.3363 10.588 13.0115L9.41187 13.9424ZM7.25472 8.79993C6.99765 8.47514 6.52596 8.42024 6.20117 8.6773C5.87638 8.93437 5.82147 9.40606 6.07854 9.73085L7.25472 8.79993ZM9.24996 13.4769C9.24996 13.8911 9.58575 14.2269 9.99996 14.2269C10.4142 14.2269 10.75 13.8911 10.75 13.4769H9.24996ZM10.75 4.21155C10.75 3.79733 10.4142 3.46155 9.99996 3.46155C9.58575 3.46155 9.24996 3.79733 9.24996 4.21155H10.75ZM3.41663 12.6346V13.4769H4.91663V12.6346H3.41663ZM3.41663 13.4769C3.41663 15.2791 4.86415 16.7539 6.66663 16.7539V15.2539C5.70768 15.2539 4.91663 14.4659 4.91663 13.4769H3.41663ZM6.66663 16.7539H13.3333V15.2539H6.66663V16.7539ZM13.3333 16.7539C15.1358 16.7539 16.5833 15.2791 16.5833 13.4769H15.0833C15.0833 14.4659 14.2922 15.2539 13.3333 15.2539V16.7539ZM16.5833 13.4769V12.6346H15.0833V13.4769H16.5833ZM10.588 13.9424L13.9214 9.73085L12.7452 8.79993L9.41187 13.0115L10.588 13.9424ZM10.588 13.0115L7.25472 8.79993L6.07854 9.73085L9.41187 13.9424L10.588 13.0115ZM10.75 13.4769V4.21155H9.24996V13.4769H10.75Z"
                fill="#009C7B"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.91663 12.6346C4.91663 12.2204 4.58084 11.8846 4.16663 11.8846C3.75241 11.8846 3.41663 12.2204 3.41663 12.6346H4.91663ZM4.16663 13.4769H3.41663H4.16663ZM16.5833 12.6346C16.5833 12.2204 16.2475 11.8846 15.8333 11.8846C15.4191 11.8846 15.0833 12.2204 15.0833 12.6346H16.5833ZM10.588 4.67701C10.8451 4.35221 10.7902 3.88052 10.4654 3.62346C10.1406 3.36639 9.66894 3.4213 9.41187 3.74609L10.588 4.67701ZM6.07854 7.95763C5.82147 8.28242 5.87638 8.75411 6.20117 9.01117C6.52596 9.26824 6.99765 9.21334 7.25472 8.88854L6.07854 7.95763ZM10.588 3.74609C10.331 3.4213 9.85929 3.36639 9.5345 3.62346C9.20971 3.88052 9.15481 4.35221 9.41187 4.67701L10.588 3.74609ZM12.7452 8.88854C13.0023 9.21334 13.474 9.26824 13.7988 9.01117C14.1235 8.75411 14.1784 8.28242 13.9214 7.95763L12.7452 8.88854ZM10.75 4.21155C10.75 3.79733 10.4142 3.46155 9.99996 3.46155C9.58575 3.46155 9.24996 3.79733 9.24996 4.21155H10.75ZM9.24996 13.4769C9.24996 13.8911 9.58575 14.2269 9.99996 14.2269C10.4142 14.2269 10.75 13.8911 10.75 13.4769H9.24996ZM3.41663 12.6346V13.4769H4.91663V12.6346H3.41663ZM3.41663 13.4769C3.41663 15.2791 4.86415 16.7539 6.66663 16.7539V15.2539C5.70768 15.2539 4.91663 14.4659 4.91663 13.4769H3.41663ZM6.66663 16.7539H13.3333V15.2539H6.66663V16.7539ZM13.3333 16.7539C15.1358 16.7539 16.5833 15.2791 16.5833 13.4769H15.0833C15.0833 14.4659 14.2922 15.2539 13.3333 15.2539V16.7539ZM16.5833 13.4769V12.6346H15.0833V13.4769H16.5833ZM9.41187 3.74609L6.07854 7.95763L7.25472 8.88854L10.588 4.67701L9.41187 3.74609ZM9.41187 4.67701L12.7452 8.88854L13.9214 7.95763L10.588 3.74609L9.41187 4.67701ZM9.24996 4.21155V13.4769H10.75V4.21155H9.24996Z"
                fill="#D22600"
              />
            </svg>
          )}

          <p
            style={{
              marginBottom: 0,
            }}
          >
            {t(Utils.getKeyByValue(transactionTypes, value))}
          </p>
        </div>
      ),
    },
    {
      title: () => t("Status"),
      dataIndex: "status",
      align: "center",

      render: (value) => (
        <p
          style={{
            color:
              value === transactionStatusTypes.ConfirmedByNetwork
                ? "#009C7B"
                : "#FA7609",
          }}
        >
          {t(Utils.getKeyByValue(transactionStatusTypes, value))}
        </p>
      ),
    },
    {
      title: () => t("Date"),
      dataIndex: "date",
      align: "center",

      render: (value) => (
        <>
          <span
            style={{
              fontWeight: 600,
            }}
          >
            {new Date(value).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <p
            style={{
              color: "#5B626E",
            }}
          >
            {new Date(value).toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </p>
        </>
      ),
    },
    {
      title: () => t("Actions"),
      dataIndex: ["transactionId", "txId"],
      width: 100,
      align: "center",

      render: (text, row) => (
        <>
          <span
            onClick={() => props.onOpenDetail(row["transactionId"])}
            style={{
              marginLeft: 2,
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10H15V11H8V10ZM8 12H15V13H8V12ZM8 14H11.5V15H8V14Z"
                fill="#372DB0"
              />
              <path
                d="M7 13H2V3H5.585L7.295 4.705L7.585 5H14V9H15V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4H8L6.295 2.295C6.20197 2.20142 6.09134 2.12717 5.96948 2.07654C5.84763 2.02591 5.71696 1.9999 5.585 2H2C1.73478 2 1.48043 2.10536 1.29289 2.29289C1.10536 2.48043 1 2.73478 1 3V13C1 13.2652 1.10536 13.5196 1.29289 13.7071C1.48043 13.8946 1.73478 14 2 14H7V13Z"
                fill="#372DB0"
              />
            </svg>
          </span>
          <span
            style={{
              cursor: "pointer",
              marginLeft: 20,
            }}
          >
            <a href={row["txId"]}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7045 8.29558C11.4604 8.05151 11.0647 8.05152 10.8206 8.29561C10.5765 8.53969 10.5765 8.93542 10.8206 9.17949L11.7045 8.29558ZM11.2625 12.5242L10.8206 12.0822L10.8206 12.0823L11.2625 12.5242ZM8.73754 15.0492L9.17948 15.4911L9.17948 15.4911L8.73754 15.0492ZM4.95087 11.2625L5.39281 11.7045L5.39281 11.7045L4.95087 11.2625ZM6.65531 10.442C6.89939 10.1979 6.89939 9.80217 6.65531 9.5581C6.41123 9.31402 6.01551 9.31402 5.77143 9.5581L6.65531 10.442ZM8.29561 11.7045C8.53969 11.9486 8.93542 11.9486 9.17949 11.7045C9.42356 11.4604 9.42355 11.0647 9.17947 10.8206L8.29561 11.7045ZM8.73754 7.47587L9.17947 7.91782L9.17948 7.91781L8.73754 7.47587ZM11.2625 4.95087L11.7045 5.39281L11.7045 5.39281L11.2625 4.95087ZM15.0492 4.95087L14.6073 5.39281L14.6073 5.39281L15.0492 4.95087ZM15.0492 8.73754L15.4911 9.17948L15.4911 9.17948L15.0492 8.73754ZM13.3448 9.5581C13.1007 9.80217 13.1007 10.1979 13.3448 10.442C13.5888 10.6861 13.9846 10.6861 14.2286 10.442L13.3448 9.5581ZM10.8206 9.17949C11.2056 9.56441 11.4218 10.0865 11.4218 10.6309H12.6718C12.6718 9.75496 12.3238 8.91493 11.7045 8.29558L10.8206 9.17949ZM11.4218 10.6309C11.4218 11.1752 11.2056 11.6973 10.8206 12.0822L11.7045 12.9662C12.3238 12.3468 12.6718 11.5068 12.6718 10.6309H11.4218ZM10.8206 12.0823L8.2956 14.6073L9.17948 15.4911L11.7045 12.9661L10.8206 12.0823ZM8.2956 14.6073C7.49401 15.4088 6.19439 15.4088 5.39281 14.6073L4.50893 15.4911C5.79867 16.7809 7.88974 16.7809 9.17948 15.4911L8.2956 14.6073ZM5.39281 14.6073C4.59123 13.8057 4.59123 12.5061 5.39281 11.7045L4.50893 10.8206C3.21919 12.1103 3.21919 14.2014 4.50893 15.4911L5.39281 14.6073ZM5.39281 11.7045L6.65531 10.442L5.77143 9.5581L4.50893 10.8206L5.39281 11.7045ZM9.17947 10.8206C8.79452 10.4357 8.57826 9.91358 8.57826 9.3692H7.32826C7.32826 10.2451 7.67623 11.0851 8.29561 11.7045L9.17947 10.8206ZM8.57826 9.3692C8.57826 8.82483 8.79452 8.30275 9.17947 7.91782L8.29561 7.03392C7.67623 7.65326 7.32826 8.49329 7.32826 9.3692H8.57826ZM9.17948 7.91781L11.7045 5.39281L10.8206 4.50893L8.2956 7.03393L9.17948 7.91781ZM11.7045 5.39281C12.5061 4.59123 13.8057 4.59123 14.6073 5.39281L15.4911 4.50893C14.2014 3.21919 12.1103 3.21919 10.8206 4.50893L11.7045 5.39281ZM14.6073 5.39281C15.4088 6.19439 15.4088 7.49401 14.6073 8.2956L15.4911 9.17948C16.7809 7.88974 16.7809 5.79867 15.4911 4.50893L14.6073 5.39281ZM14.6073 8.2956L13.3448 9.5581L14.2286 10.442L15.4911 9.17948L14.6073 8.2956Z"
                  fill="#7A808B"
                />
              </svg>
            </a>
          </span>
        </>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={props.data}
        loading={props.loading}
        pageSize={props.pageSize}
        scroll={{ x: 0, y: 0 }}
      />
    </>
  );
};
export default List;
