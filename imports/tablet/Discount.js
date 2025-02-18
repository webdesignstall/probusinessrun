import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import React from 'react';
import swal from 'sweetalert';
import Discounts from '../../common/discountData';
// components
import Signature from './Signature';

export default class Discount extends TrackerReact(React.Component) {
	constructor(props) {
		super(props);
		this.state = {
			id: new Date().getTime().toString(),
			money: 0,
			time: 0,
			percentage: 0,
			selected: 'amount',
			valueOfSelected: 'Amount',
			note: '',
			discountId: '',
			discountApproved: false,
			waiting: false
		};

		this.promoCode = React.createRef();

		this.select = this.select.bind(this);
		this.changeAmountValue = this.changeAmountValue.bind(this);
		this.resetDiscount = this.resetDiscount.bind(this);
		this.noteChange = this.noteChange.bind(this);
		this.askDiscount = this.askDiscount.bind(this);
	}

	discount(id) {
		return Discounts.find({ _id: id }).fetch();
	}

	componentDidMount() {
		this.x = Tracker.autorun(() => {
			// Meteor.subscribe('Dicsounts');
			const discount = this.discount(Session.get('discountId'))[0];
			discount
				? Session.set('discountAproved', discount.confirmed)
				: console.error('Bazadan informasi tapilamyibdir');
			this.setState({ discountApproved: Session.get('discountAproved') });
		});
	}

	componentWillUnmount() {
		this.x.stop();
	}

	componentDidUpdate() {
		this.state.discountApproved
			? swal({
					title: 'Success',
					text: 'Discount accepted',
					icon: 'success'
			  })
			: null;
	}

	select(name) {
		this.setState({
			selected: name
		});
	}

	changeAmountValue(e) {
		e.preventDefault();
		this.setState({
			valueOfSelected: e.target.value
		});
	}

	checkPromoCode(promoCode) {
		let promoCodes = Session.get('promoCodes');
		promoCodes.find(code => {
			return code === promoCode;
		})
			? this.setState({
					discountApproved: true,
					waiting: true
			  })
			: // document.getElementById('signatureForDiscount').classList.remove('hide'),
			  // document.getElementById('askDiscount').setAttribute('disabled', true)
			  (swal({
					title: 'Wrong promo code',
					text: 'You entered wrong Promo Code',
					icon: 'error'
			  }),
			  Session.set('loading', false));
	}

	askDiscount() {
		let onlineStatus = window.navigator.onLine; // Is browser connected to internet?
		this.promoCode.current.value !== '' &&
		this.promoCode.current.value !== undefined &&
		this.promoCode.current.value !== null
			? this.checkPromoCode(this.promoCode.current.value)
			: onlineStatus
			? Discounts.insert(
					{
						amount: this.state.valueOfSelected,
						note: this.state.note,
						type: this.state.selected,
						confirmed: false,
						truckNumber: Meteor.user().profile.number
					},
					(error, _id) => {
						error
							? console.error(error)
							: (this.setState({ discountId: _id }),
							  this.setState({ waiting: true }),
							  Session.set('discountId', _id),
							  setTimeout(() => {
									!this.state.discountApproved
										? (Meteor.call(
												'removeDiscount',
												this.state.discountId,
												err => (err ? console.error(err) : null)
										  ),
										  swal({
												title: "Discount doesn't accepted",
												text: 'For more info contact with the manager',
												icon: 'error'
										  }),
										  Session.set('loading', false),
										  this.setState({ waiting: false }, err =>
												err ? console.error(err) : null
										  ),
										  Session.set('discountId', ''),
										  Session.set('discountAproved', false))
										: null;
							  }, 120000));
					}
			  )
			: alert('You have not internet connection try to call to manager and get promo Code');
	}

	noteChange(e) {
		this.setState({
			note: e.target.value
		});
	}

	resetDiscount() {
		Discounts.remove({ _id: this.state.discountId }, error => {
			error ? console.error(error) : null;
		});
		Session.set('discountId', '');
		Session.set('discountAproved', false);
		this.setState(
			{
				money: 0,
				time: 0,
				percentage: 0,
				selected: 'amount',
				valueOfSelected: 'Amount',
				note: '',
				waiting: false,
				discountId: '',
				discountApproved: false
			},
			error => {
				error ? console.error(error) : this.props.unclick('discount_');
			}
		);
	}

	render() {
		this.state.discountApproved ? swal('Success', 'Discount approved!', 'success') : null;

		return (
			<div id={this.state.id} className="card__ discount row">
				<div className="cardTitle">
					<span className="left-align col s6 m6 l6" />
					<span
						className={
							this.state.selected === 'amount'
								? 'col s2 m2 l2 discountTypes activeDiscount'
								: 'col s2 m2 l2 discountTypes'
						}
						onClick={() => this.select('amount')}
					>
						$ Amount
					</span>
					<span
						className={
							this.state.selected === 'percent'
								? 'col s2 m2 l2 discountTypes activeDiscount'
								: 'col s2 m2 l2 discountTypes'
						}
						onClick={() => this.select('percent')}
					>
						% Percent
					</span>
					<span
						className={
							this.state.selected === 'time'
								? 'col s2 m2 l2 discountTypes activeDiscount'
								: 'col s2 m2 l2 discountTypes'
						}
						onClick={() => this.select('time')}
					>
						Time
					</span>
					<div className="clear" />
				</div>
				<div className="secondContent">
					<div>
						<div className="amount">
							<input
								id="valueOfAmount"
								type="number"
								placeholder={this.state.selected}
								value={this.state.valueOfSelected}
								onChange={this.changeAmountValue}
								disabled={this.state.discountApproved}
							/>
							<input
								id="promoCode"
								ref={this.promoCode}
								type="text"
								placeholder="Promo Code"
								disabled={this.state.discountApproved}
							/>
							<div className="clear margin-top" />
							<button
								id="askDiscount"
								className="btn"
								style={{
									width: '200px'
								}}
								onClick={this.askDiscount}
								disabled={this.state.waiting || this.state.note === ''}
							>
								<svg
									className={
										this.state.waiting && !this.state.discountApproved
											? 'spinner2'
											: 'hide'
									}
									width="100%"
									height="28px"
									viewBox="0 0 66 66"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										className="path"
										fill="none"
										strokeWidth="6"
										strokeLinecap="round"
										cx="33"
										cy="33"
										r="30"
									/>
								</svg>
								<span
									style={{
										color: 'green',
										width: '50px',
										fontSize: '30px'
									}}
									className={this.state.discountApproved ? '' : 'hide'}
								>
									✓
								</span>
								<span className={this.state.waiting ? 'hide' : ''}>
									Ask Discount
								</span>
							</button>
							<div className="borderRight" />
						</div>
						<div className="notes">
							<div className="cardTitle white left-align grey-text">Notes:</div>
							<div className="noteTextArea">
								<textarea
									name="discountNote"
									id="discountNote"
									cols="30"
									rows="10"
									className="card__"
									onChange={this.noteChange}
									disabled={this.state.discountApproved}
									value={this.state.note}
								/>
							</div>
						</div>
					</div>
					<div
						id="signatureForDiscount"
						className={
							this.state.discountApproved ? 'col s12 m12 l12' : 'col s12 m12 l12 hide'
						}
					>
						<Signature
							saveSignature={this.props.saveSignature}
							id={this.state.id}
							which="discount"
							extraInformation={{
								type: this.state.selected,
								amount: this.state.valueOfSelected,
								note: this.state.note
							}}
							resetDiscount={this.resetDiscount}
						/>
					</div>
				</div>
			</div>
		);
	}
}
