import { Col, Row, Card, Segmented, Input, Button} from "antd";
import { useTranslation } from "react-i18next"; 
import EtheriumIcon from "assets/images/networks/etherium.svg"; 

const WithdrawForm = () => {
	const { t } = useTranslation();
	return (
		<Card style={{ width: '100%' }} className="withdraw-card">
			<p className="withdraw-network">
				Withdraw via network
			</p>
			<Segmented
				block
				options={[
					{
						label: (
							<img src={EtheriumIcon} alt="EtheriumIcon" />
						),
						value: 'etherium',
					},
					{

					},
					{

					},
					{

					},
				]}
			/>
			<Row gutter={[24, 16]} style={{ marginTop: 30 }}>
				<Col xs={24} md={24} lg={24} style={{ marginBottom: '40px' }}>
					<label className="withdraw-label">{`${t("walleteAddress")}:`}</label>
					<Input className="ant-input-holder" />
				</Col>
				{/*<Col xs={24} md={24} lg={24} style={{ marginTop: 20 }}>*/}
				{/*    <Alert message="You do not have wallete address" />*/}
				{/*</Col>*/}
				<Col xs={24} md={24} lg={24}>
					<label className="withdraw-label">{`${t("withdrawalAmount")}:`}</label>
					<button className="withdraw-btn-max">Max</button>
					<p className="withdraw-amount"> Available withdrawal amount:<span className="withdraw-maxamount">{`${"1,254"}`}</span>AVN </p>
					<Input addonAfter={<span>AVN</span>} />
					<p className="withdraw-fee">Withdrrawal fees : <span>{`${"1,1"}`}</span> USDT  </p>
				</Col>
				<Col xs={24} md={24} lg={24}>
					<Button className="withdraw-button" style={{ marginTop: 20 }}>
						{t("Withdraw")}
					</Button>
				</Col>
			</Row>
		</Card>
	);
};
export default WithdrawForm;