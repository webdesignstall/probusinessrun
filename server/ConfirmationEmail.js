export default function ConfirmationEmail(job) {

    function addressesRender(addressler) {
        let addreslerHTML = ''
        addressler.map((address, index) => {
            addreslerHTML += (
                `<tr>
                    <td>
                        Address#${index + 1 }:
                </td>
                    <td>
                        ${address }
                    </td>
                </tr>`
            );
        })

        return addreslerHTML;
    }

    let movingSize = function () {
        let movingSizeList = {
            'items': 'Items',
            'studio': 'Studio',
            '1_bedroom': '1 Bedroom',
            '2_bedroom_small': '2 Bedroom (small size, few items)',
            '2_bedroom_avg': '2 Bedroom (avg. size, avg. items)',
            '2_bedroom_large': '2 Bedroom (large size, many items)',
            '3_bedroom_avg': '3 Bedroom (avg. size, avg. items)',
            '3_bedroom_large': '3 Bedroom (large size, many items)',
            '4_bedrooom_avg': '4 Bedroom (avg. size, avg. items)',
            '4_bedroom_large': '4 Bedroom (large size, many items)',
            'commercial_avg': 'Commercial (avg. size, avg. items)',
            'commercial_large': 'Commercial (large size, many items)'
        }

        return movingSizeList[job.movingSize];
    }

    return (
        `
        <!DOCTYPE html>

<head>
	<title>Confirmation</title>

</head>

<body style="background-color: #d3d9e0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 13px; padding: 5px;">
	<div class="email-content" style="max-width: 550px">
		<p class="head" style="text-align: center;"><b>Hello ${job.clientFirstName }!</b><br>
			<b>Thank you for confirming your move with chat Movers Los Angeles!</b><br>
			<b>Please review your Moving Confirmation below to ensure accuracy:</b>
		</p>
		<p></p>
		<table class="info-table" style="width: 100%;" width="100%">
			<tbody>
				<tr>
					<td style="width: 49%;" width="49%">
						Your Job Number:
					</td>
					<td style="width: 49%;" width="49%">
						${job.jobNumber }
					</td>
				</tr>

				<tr>
					<td style="width: 49%;" width="49%">
						Moving Date:
					</td>
					<td style="width: 49%;" width="49%">
						${job.workDate }
					</td>
				</tr>

				<tr>
					<td style="width: 49%;" width="49%">
						Arrival Window:
					</td>
					<td style="width: 49%;" width="49%">
						${job.workMustBeginTime }
					</td>
				</tr>

				${addressesRender(job.addresses) }

				<tr>
					<td style="width: 49%;" width="49%">
						Moving Size:
					</td>
					<td style="width: 49%;" width="49%">
						${movingSize() }
					</td>
				</tr>

				<tr>
					<td style="width: 49%;" width="49%">
						Number of Movers:
					</td>
					<td style="width: 49%;" width="49%">
						${job.numberOfWorkers } movers
					</td>
				</tr>

				${ job.laborTime ? `
				<tr>
					<td style="width: 49%;" width="49%">
						Minimum Labor Time:
					</td>
					<td style="width: 49%;" width="49%">
						${job.laborTime } hours
					</td>
                </tr>` : '' } 
                ${ job.flatRate && job.flatRate[0].isTrue ? `
				<tr>
					<td style="width: 49%;" width="49%">
						Cash Discount Flat Rate:
					</td>
					<td style="width: 49%;" width="49%">
						${job.flatRate[0].cashAmount }
					</td>
				</tr>
				<tr>
					<td style="width: 49%;" width="49%">
						Card Flat Rate:
					</td>
					<td style="width: 49%;" width="49%">
						${job.flatRate[0].cardAmount }
					</td>
                </tr>` : '' } 
                ${ job.hourlyRatesCash && job.hourlyRatesCash > 0 ? `
				<tr>
					<td style="width: 49%;" width="49%">
						Cash Discount Rate p/hour:
					</td>
					<td style="width: 49%;" width="49%">
						${job.hourlyRatesCash } per hour
					</td>
				</tr>
                ` : '' } 
                ${ job.hourlyRatesCard && job.hourlyRatesCard > 0 ? `
				<tr>
					<td style="width: 49%;" width="49%">
						Card Regular Rate p/hour:
					</td>
					<td style="width: 49%;" width="49%">
						${job.hourlyRatesCard } per hour
					</td>
                </tr>` : '' } 
                ${ !isNaN(Number(job.gasFee)) && Number(job.gasFee) > 0 ? (`
				<tr>
					<td style="width: 49%;" width="49%">
						Gas Fee (one time):
					</td>
					<td style="width: 49%;" width="49%">
						${job.gasFee }
					</td>
                </tr>` ) : '' } 
                ${ job.doubleDrive === 'yes' ? (`
				<tr>
					<td style="width: 49%;" width="49%">
						Double Drive Time:
					</td>
					<td style="width: 49%;" width="49%">
						Yes, <a href="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" target="_blank" style="color: #4698de; font-weight: 600;">learn more</a>
					</td>
                </tr>` ) : '' } 
                ${ job.smallItemPacking < 0 || job.smallItemPacking > 0 ? (`
					<tr>
						<td style="width: 49%;" width="49%">
							Small Item Packing:
						</td>
						<td style="width: 49%;" width="49%">
							${ job.smallItemPacking < 0 ? (
                'Yes, <a href="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" target="_blank" style="color: #4698de; font-weight: 600;">learn more</a>') : '$' + job.smallItemPacking } </td>
                    </tr>` ) : '' } 
                    ${ job.largeItemFee && job.largeItemFee > 0 ? `
					<tr>
						<td style="width: 49%;" width="49%">
							Extra Large Item Handling:
						</td>
						<td style="width: 49%;" width="49%">
							{job.largeItemFee}
						</td>
					</tr>` : '' }
			</tbody>
		</table>
		<div classname="sola-cekme">
			<p>
				<input classname="secilib" checked disabled type="checkbox"> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/included.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/included.pdf" target="_blank" style="color: #4698de; font-weight: 600;">&quot;What&apos;s Included&quot; Section.</a></i>
                </p>
                <p>
                    <input classname="secilib" checked disabled type="checkbox"> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/not-included.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/not-included.pdf" target="_blank" style="color: #4698de; font-weight: 600;">&quot;What&apos;s Not Included&quot; Section.</a></i>
                </p>
                <p>
                    <input classname="secilib" checked disabled type="checkbox"> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf" target="_blank" style="color: #4698de; font-weight: 600;">&quot;For Your Information&quot; Section.</a></i>
                </p>
                <p>
                    <input classname="secilib" checked disabled type="checkbox"> I have recieved a copy of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" target="_blank" style="color: #4698de; font-weight: 600;">CPUC &quot;Important Information About Your Move&quot; booklet.</a></i>
                </p>
                <p>
                    <input classname="secilib" checked disabled type="checkbox"> I have recieved a copy of the <i><a href="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" target="_blank" style="color: #4698de; font-weight: 600;">CPUC Hazardous Material List</a></i> and I agree not to pack any of the<br>
                    items listed for transportation by Cheap Movers Los Angeles.
                                    </p>
                <p>
                    <input classname="secilib" checked disabled type="checkbox"> I understand and agree that I will have Cash or Card Payment ready on the day of my move.
                                    </p>
                <p>
                    <input classname="secilib" checked disabled type="checkbox"> Yes! I have read the information above and wish to pay my Moving Deposit to book this move.<br>
                    I understand that this Deposit in non-refundable and non-transferrable if I reschedule or cancel this move.
                                    </p>
                <p>
                    **If you have any questions, please contact us soon as possible by phone, text, or e-mail 24/7**
                                    </p>
            </div>
        </div>
    </body>
    `
    );
}
