export default function EmailContent(job) {
    let additionalPhoneNumber = job.phoneAdditional
        ? `<tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Additional Phone Number:</td>
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.phoneAdditional }</td>
            </tr>`
        : ''

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

    let movingAddresesRenderHTML = ''

    job.addresses.map((address, index) => {
        movingAddresesRenderHTML += (
            `
            <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Address #${ index + 1 }:</td>
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${ address }</td>
            </tr>
            `
        );
    })

    let rateDisplay = job.hourlyRatesCash > 0 && job.hourlyRatesCard
        ?
        `
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Cash Discounted Rate p/hour:</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">$${job.hourlyRatesCash }</td>
        </tr>
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Card Regular Rate p/hour:</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">$${job.hourlyRatesCard }</td>
        </tr>
        `
        : '';

    let flatRate = job.flatRate
        ? `
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Flat Rate Cash:</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">$${job.flatRateCash }</td>
        </tr>
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Flat Rate Card:</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">$${job.flatRateCard }</td>
        </tr>
        `
        : '';

    let laborTime = job.minimumLaborTime && job.minimumLaborTime > 0 ?
        `
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Minimum Labor Time:</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.minimumLaborTime }</td>
        </tr>
        `
        : '';

    let gasFee = job.gasFee && job.gasFee > 0
        ? `
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Gas Fee (one time fee):</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.gasFee }</td>
        </tr>
        `
        : job.gasFee || job.gasFee === '' || job.gasFee === 0
            ? `
            <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Gas Fee (one time fee)</td>
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Waived</td>
            </tr>
            `
            : 'Not Sure';

    let doubleDrive = job.doubleDrive && job.doubleDrive === 'yes'
        ? `
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Double Drive Time</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/DDT.pdf">learn more</a></td>
        </tr>
        `
        : job.doubleDrive && job.doubleDrive === 'waived'
            ? `
            <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Double Drive Time</td>
                <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Waived</td>
            </tr>
            `
            : '';

    let smallItemPacking = job.smallPackingItems && job.smallPackingItems !== 0
        ? `
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Small Item Packing:</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%"> ${job.smallPackingItems < 0 ? 'Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf">learn more</a>' : '$' + job.smallPackingItems }</td>
        </tr>
        `
        : '';

    let doubleDriveAdditional = job.doubleDrive && job.doubleDrive === 'notSure'
        ?
        `
        <div style="margin-bottom: 5px;">Double Drive Time, <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/DDT.pdf">learn more</a></div>
        `
        : '';

    let gasFeeAdditional = job.gasFee && job.gasFee === 'notSure'
        ?
        `
        <div style="margin-bottom: 5px;">Gas Fee (one time fee)</div>
        `
        : '';

    let extraLargeItemPacking = job.largeItemFee && job.largeItemFee > 0
        ?
        `
        <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Extra-Large Item Handling Fee</td>
            <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.largeItemFee }</td>
        </tr>
        `
        : '';

    return (
        `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Quote</title>
            <meta charset="UTF-8">
        </head>

        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 13px; background-color: #f3f2f2; letter-spacing: 0.5px; padding: 0; margin: 0;">
            <div class="container" style="max-width: 560px; background-color: #f3f2f2; width: 100%; margin: 0 auto;">
            <div class="header" style="background-color: #554b8c; color: white; padding: 20px; font-size: 16px; line-height: 25px; text-align: center;">
                <b>
                Hello ${job.firstName } ${ job.lastName }!<br>
                Thank you for requesting your moving quote! Your quote includes:
                </b>
            </div>
            <div class="included-list" style="padding: 10px;">
                <div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">Professional, Full Time Movers
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">No Hidden Fees
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">Use of Wardrobe Boxes
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">Disassembling & Reassembling
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">Large Item Packing Supplies
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">Tax Included
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">Moving Trucks & Movers
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">24/7 Local Support Team
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">BEARHFTI Licensed & Insured
                </div>
                <div class="half" style="width: 49%; display: inline-block; line-height: 13px; margin-bottom: 5px; min-width: 250px;">
                    <img src="http://wonder56.com/static/img/index/cg.png" height="13px" style="margin-right: 5px;">Cash Discount Per Hour
                </div>
                </div>
            </div>
            <div class="job-info" style="padding: 10px;">
                <table style="width: 100%;" width="100%">
                    <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Customer Name:</td>
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.firstName } ${ job.lastName }</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Phone Number:</td>
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.phone }</td>
                    </tr>
                    ${ additionalPhoneNumber }
                    <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Job Number:</td>
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.jobNumber }</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Moving Date:</td>
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.movingDateConverted }</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Arrival Window:</td>
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.workMustBeginTime }</td>
                    </tr>
                    ${movingAddresesRenderHTML }
                    <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Moving Size:</td>
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${movingSize() }</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px;">
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">Number of Movers:</td>
                        <td style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px; width: 50%;" width="50%">${job.numberOfWorkers }</td>
                    </tr>
                    ${laborTime }
                    ${rateDisplay }
                    ${flatRate }
                </table>
            </div>
            <div class="additional-charges">
                <div class="additional-charges--header" style="text-align: center; color: white; background-color: #495572; padding: 5px;">ADDITIONAL CHARGES</div>
                <div class="additional-charges--list" style="padding: 10px;">
                <table style="width: 100%;" width="100%">
                    ${gasFee }
                    ${doubleDrive }
                    ${smallItemPacking }
                    ${extraLargeItemPacking }
                </table>
                </div>
            </div>
            ${
        job.doubleDrive === 'notSure' || job.gasFee === 'notSure'
            ?
            `
            <div class="additional-charges">
                <div class="additional-charges--header" style="text-align: center; color: white; background-color: #495572; padding: 5px;">
                POSSIBLE ADDITIONAL CHARGES
                </div>
                <div class="additional-charges--list" style="padding: 10px;">
                ${doubleDriveAdditional }
                ${gasFeeAdditional }
                </div>
            </div>
            `
            : ''
        }
            <div class="additional-charges">
                <div class="additional-charges--header" style="text-align: center; color: white; background-color: #495572; padding: 5px;">
                THE PRICE DOES NOT INCLUDED
                </div>
                <div class="additional-charges--list" style="padding: 10px;">
                ${
        job.largeItemFee === 0 || job.largeItemFee === ''
            ?
            `
            <div style="margin-bottom: 5px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png" height="13px" style="margin-right: 5px;">Extra-Large Item Packing and Transportation: for example, pool
                tables, pianos, etc. (Please ask if you need Extra-Large Item
                Packing and Moving).
            </div>
            `: ''
        }
                <div style="margin-bottom: 5px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png" height="13px" style="margin-right: 5px;">Small Item Packing Materials: (boxes, packing papers,bubble wrap.
                    etc.) <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf">Require, if needed</a>
                </div>
                ${job.largeItemFee || job.largeItemFee === 0 || job.largeItemFee === ''
            ? ''
            : `
            <div style="margin-bottom: 5px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png" height="13px" style="margin-right: 5px;">Extra-Large Item Packing and Transportation: for example, pool
                tables, pianos, etc. (Please ask if you need Extra-Large Item
                Packing and Moving).
            </div>
            `
        }
                <div style="margin-bottom: 5px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png" height="13px" style="margin-right: 5px;">Customer responsible to hold the space for moving truck (if there
                    is any parking ticket, Customer is responsible to pay for it).
                </div>
                <div style="margin-bottom: 5px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/White_X_in_red_background.svg/2000px-White_X_in_red_background.svg.png" height="13px" style="margin-right: 5px;">Full-coverage Insurance. <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/Full-Insurance.pdf" >Require, if needed</a>
                </div>
                </div>
            </div>
            <div class="reserve" style="padding: 5px; text-align: center;">
                <a href="https://www.probusinessrun.com/reserve" style="padding: 15px 15px; background-color: #554b8c; color: white; font-size: 14px; border: none;"><b>RESERVE YOUR MOVE</b></a>
            </div>
            </div>
        </body>
        </html>
        `
    );
}
