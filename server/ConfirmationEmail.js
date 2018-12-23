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
        <body>
        <div>
            <p>Hello ${job.clientFirstName }!</p>
            <p>Thank you for confirming your move with chat Movers Los Angeles!</p>
            <p>Please review your Moving Confirmation below to ensure accuracy:</p>
            <table>
                <tbody>
                    <tr>
                        <td>
                            Your Job Number:
                        </td>
                        <td>
                            ${job.jobNumber }
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Moving Date:
                        </td>
                        <td>
                            ${job.workDate }
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Arrival Window:
                        </td>
                        <td>
                            ${job.workMustBeginTime }
                        </td>
                    </tr>

                    ${addressesRender(job.addresses) }

                    <tr>
                        <td>
                            Moving Size:
                        </td>
                        <td>
                            ${movingSize() }
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Number of Movers:
                        </td>
                        <td>
                            ${job.numberOfWorkers } movers
                        </td>
                    </tr>

                    ${
        job.laborTime
            ?
            `<tr>
                                <td>
                                    Minimum Labor Time:
                                </td>
                                <td>
                                    ${job.laborTime } hours
                                </td>
                            </tr>`
            : ''
        }

                    ${
        job.flatRate && job.flatRate[0].isTrue
            ?
            `<tr>
                                <td>
                                    Cash Discount Flat Rate:
                                </td>
                                <td>
                                    ${job.flatRate[0].cashAmount }
                                </td>
                            </tr >
                            <tr>
                                <td>
                                    Card Flat Rate:
                                </td>
                                <td>
                                    ${job.flatRate[0].cardAmount }
                                </td>
                            </tr>`
            : ''
        }

                    ${
        job.hourlyRatesCash && job.hourlyRatesCash > 0
            ?
            `
                            <tr>
                                <td>
                                    Cash Discount Rate p/hour:
                                </td>
                                <td>
                                    ${job.hourlyRatesCash } per hour
                                </td>
                            </tr >
                            `
            : ''
        }

                    ${
        job.hourlyRatesCard && job.hourlyRatesCard > 0
            ?
            `<tr>
                                <td>
                                    Card Regular Rate p/hour:
                                </td>
                                <td>
                                    ${job.hourlyRatesCard } per hour
                                </td>
                            </tr >`
            : ''
        }

                    ${
        !isNaN(Number(job.gasFee)) && Number(job.gasFee) > 0
            ? (
                `<tr>
                                    <td>
                                        Gas Fee (one time):
                                    </td>
                                    <td>
                                        ${job.gasFee }
                                    </td>
                                </tr>`
            )
            : ''
        }

                    ${
        job.doubleDrive === 'yes'
            ? (
                `<tr>
                    <td>
                        Double Drive Time:
                    </td>
                    <td>
                        Yes, <a href="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" target="_blank">learn more</a>
                    </td>
                </tr>`
            )
            : ''
        }

                    ${
        job.smallItemPacking < 0 || job.smallItemPacking > 0
            ? (
                `<tr>
                    <td>
                        Small Item Packing:
                                                    </td>
                    <td>
                        ${
                job.smallItemPacking < 0
                    ? ('Yes, <a href="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/6.pdf" target="_blank">learn more</a>')
                    : '$' + job.smallItemPacking
                }
                    </td>
                </tr>`
            )
            : ''
        }

                    ${
        job.largeItemFee && job.largeItemFee > 0
            ?
            `<tr>
                            <td>
                                Extra Large Item Handling:
                            </td>
                            <td>
                                {job.largeItemFee}
                            </td>
                        </tr>`
            : ''
        }
                </tbody >
            </table >
            <div className="sola-cekme">
                <p>
                    <input className="secilib" checked disabled type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/included.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/included.pdf" target="_blank">&quot;What&apos;s Included&quot; Section.</a></i>
                </p>
                <p>
                    <input className="secilib" checked disabled type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/not-included.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/not-included.pdf" target="_blank">&quot;What&apos;s Not Included&quot; Section.</a></i>
                </p>
                <p>
                    <input className="secilib" checked disabled type="checkbox" /> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/for-you-1.pdf" target="_blank">&quot;For Your Information&quot; Section.</a></i>
                </p>
                <p>
                    <input className="secilib" checked disabled type="checkbox" /> I have recieved a copy of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" target="_blank">CPUC &quot;Important Information About Your Move&quot; booklet.</a></i>
                </p>
                <p>
                    <input className="secilib" checked disabled type="checkbox" /> I have recieved a copy of the <i><a href="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" download="http://cheapmoversanaheim.com/ProBusinessRun/3.pdf" target="_blank">CPUC Hazardous Material List</a></i> and I agree not to pack any of the<br />
                    items listed for transportation by Cheap Movers Los Angeles.
                                    </p>
                <p>
                    <input className="secilib" checked disabled type="checkbox" /> I understand and agree that I will have <i><a href="#" onClick={() => this.mesaj('cashOrCard')}>Cash or Card Payment</a></i> ready on the day of my move.
                                    </p>
                <p>
                    <input className="secilib" checked disabled type="checkbox" /> Yes! I have read the information above and wish to pay my Moving Deposit to book this move.<br />
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
