import { Meteor } from 'meteor/meteor';

export default function supervisorEmailContent(job) {
    let addresses = function() {
        return job.addresses
            .map((address, index) => {
                return `
            <p style="font-size: 14px; line-height: 16px; margin: 0;">
            ${(job.fromTo && job.fromTo[index]) || ''}: ${address || 'there isnt any address info'}
            </p>
            `;
            })
            .join('');
    };

    let trucks = function() {
        if (Array.isArray(job.trucks) && job.trucks.length > 0) {
            let trucksList = job.trucks
                .map(truck => {
                    return '#' + truck.truck;
                })
                .join(', ');

            return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
            Truck${job.trucks.length > 1 ? 's' : ''}: ${trucksList}
            </p>`;
        }
    };

    let employees = function() {
        let workersList = job.workers
            .map(worker => {
                let workerInfo = Meteor.users.find({ _id: worker.id }).fetch()[0];

                return `${workerInfo.profile.firstName || 'problem with employee name'}`;
            })
            .join(', ');

        return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
        ${workersList}
        </p>`;
    };

    let takenBy = function() {
        let workerInfo =
            (job.takenBy && Meteor.users.find({ _id: job.takenBy }).fetch()[0]) || 'problem when fetching taken by info';

        return 'Taken By: ' + workerInfo.profile.firstName;
    };

    let notes = function() {
        return job.noteForMovers
            ? `
					<p style="font-size: 14px; line-height: 16px; margin: 0;">Notes: ${job.noteForMovers}</p>
					`
            : '';
    };

    //     let largeItemFee = function() {
    //         return job.largeItemFee
    //             ? `
    // 		<p style="font-size: 14px; line-height: 16px; margin: 0;">Large I.F: ${job.largeItemFee}</p>`
    //             : '';
    //     };

    //     let flatRate = function() {
    //         return job.flatRate[0].isTrue
    //             ? `
    // <p style="font-size: 14px; line-height: 16px; margin: 0;">${job.flatRate[0].cashAmount} / ${job.flatRate[0].cardAmount}</p>
    // 		`
    //             : '';
    //     };

    let additionalContacts = function() {
        return (
            (job.additionalContacts &&
                job.additionalContacts.length > 0 &&
                job.additionalContacts.map(addContacts => {
                    return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
                ${addContacts.firstName || ''} ${addContacts.lastName || ''}<br/>
                ${addContacts.phoneNumber || ''} / ${addContacts.additionalPhoneNumber || ''}
                </p>`;
                })) ||
            ''
        );
    };
    // ${job.movingSize}
    // $${job.flatRate[0].cashAmount || ''}/$${job.flatRate[0].cardAmount || ''} for up to ${job.laborTime || ''} hours, after $
    // ${job.hourlyRatesCash || ''}/$${job.hourlyRatesCard || ''} p/h

    let flatRateInfoDisplay = function() {
        let flatRate =
            job.laborTime > 0
                ? `<p style="font-size: 14px; line-height: 16px; margin: 0;">${job.movingSize}, $${job.flatRate[0].cashAmount ||
                      ''}/$${job.flatRate[0].cardAmount || ''} for up to ${job.laborTime || ''} hours, after $
				${job.hourlyRatesCash || ''}/$${job.hourlyRatesCard || ''} p/h</p>`
                : `<p style="font-size: 14px; line-height: 16px; margin: 0;">${job.movingSize}, $${job.flatRate[0].cashAmount ||
                      ''}/$${job.flatRate[0].cardAmount || ''}</p>`;

        return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
		${flatRate}
		${(job.doubleDrive && job.doubleDrive === 'yes' && ', + DDT') || ''}
		${job.gasFee && job.gasFee > 0 ? `, +$${job.gasFee} Gas Fee` : ''}
		${job.largeItemFee && job.largeItemFee > 0 ? `, +$${job.largeItemFee} L.I.F.` : ''}
		${job.stairsFee && job.stairsFee > 0 ? `, $${job.stairsFee} Stairs Fee` : ''}
		${job.deposit && job.deposit > 0 ? `, $${job.deposit} deposit paid` : ''}
        </p>`;
    };
    // ${job.movingSize`,`}

    // ${
    // 	job.laborTime > 0
    // 		? `Flat Rate: $${job.flatRate[0].cashAmount || ''}/$${job.flatRate[0].cardAmount || ''} for up to ${
    // 			  job.laborTime
    // 		  } hours, after $${job.hourlyRatesCash || ''}/$${job.hourlyRatesCard || ''} p/h `
    // 		: `Flat Rate: $${job.flatRate[0].cashAmount || ''}/$${job.flatRate[0].cardAmount || ''}`
    // }

    // let flatRateInfoDisplay = function() {
    //     return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
    // 		${job.movingSize`,`}
    //         ${(job.doubleDrive && job.doubleDrive === 'yes' && ', + DDT') || ''}
    //         ${job.gasFee && job.gasFee > 0 ? `, +$${job.gasFee} gas fee` : ''}
    //         ${job.largeItemFee && job.largeItemFee > 0 ? `, +$${job.largeItemFee} L.I.F.` : ''}
    //         ${job.stairsFee && job.stairsFee > 0 ? `, $${job.stairsFee} Stairs Fee` : ''}
    //         ${job.deposit && job.deposit > 0 ? `, $${job.deposit} deposit paid` : ''}
    //     </p>`;
    // };

    // let trucks = function() {
    //     if(Array.isArray(job.trucksTemp) && job.trucksTemp.length > 0){

    //     }
    // }

    let hourlyRateDisplay = function() {
        return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
            ${job.movingSize || ''}
            $${job.hourlyRatesCash || ''}/${job.hourlyRatesCard || ''} p/h 
            ${job.laborTime && job.laborTime > 0 ? `within ${job.laborTime || ''}hrs min.` : ''}
            ${(job.doubleDrive && job.doubleDrive === 'yes' && ', + DDT') || ''} 
            ${job.gasFee && job.gasFee > 0 ? `, +$${job.gasFee} gas fee` : ''} 
            ${job.largeItemFee && job.largeItemFee > 0 ? `, +$${job.largeItemFee} L.I.F.` : ''}
            ${job.stairsFee && job.stairsFee > 0 ? `, $${job.stairsFee} Stairs Fee` : ''}
            ${job.deposit && job.deposit > 0 ? `, Paid $${job.deposit} deposit` : ''}
        </p>`;
    };

    let NTE = function() {
        return job.price && `<p style="font-size: 14px; line-height: 16px; margin: 0;">NTE: $${job.price || ''}</p>`;
    };

    let mainContact = function() {
        return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
        ${job.clientFirstName || ''} ${job.clientLastName || ''}<br/>
        ${job.phoneNumber || ''}
        </p>`;
    };

    let startTime = function() {
        return `<p style="font-size: 14px; line-height: 16px; margin: 0;">
            Start window:
            <br />
            ${job.workMustBeginTime[0]} - ${job.workMustBeginTime[1]}
        </p>`;
    };

    return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width" name="viewport"/>
<!--[if !mso]><!-->
<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
<!--<![endif]-->
<title></title>
<!--[if !mso]><!-->
<!--<![endif]-->
<style type="text/css">
		body {
			margin: 0;
			padding: 0;
		}

		table,
		td,
		tr {
			vertical-align: top;
			border-collapse: collapse;
		}

		* {
			line-height: inherit;
		}

		a[x-apple-data-detectors=true] {
			color: inherit !important;
			text-decoration: none !important;
		}

		.ie-browser table {
			table-layout: fixed;
		}

		[owa] .img-container div,
		[owa] .img-container button {
			display: block !important;
		}

		[owa] .fullwidth button {
			width: 100% !important;
		}

		[owa] .block-grid .col {
			display: table-cell;
			float: none !important;
			vertical-align: top;
		}

		.ie-browser .block-grid,
		.ie-browser .num12,
		[owa] .num12,
		[owa] .block-grid {
			width: 500px !important;
		}

		.ie-browser .mixed-two-up .num4,
		[owa] .mixed-two-up .num4 {
			width: 164px !important;
		}

		.ie-browser .mixed-two-up .num8,
		[owa] .mixed-two-up .num8 {
			width: 328px !important;
		}

		.ie-browser .block-grid.two-up .col,
		[owa] .block-grid.two-up .col {
			width: 246px !important;
		}

		.ie-browser .block-grid.three-up .col,
		[owa] .block-grid.three-up .col {
			width: 246px !important;
		}

		.ie-browser .block-grid.four-up .col [owa] .block-grid.four-up .col {
			width: 123px !important;
		}

		.ie-browser .block-grid.five-up .col [owa] .block-grid.five-up .col {
			width: 100px !important;
		}

		.ie-browser .block-grid.six-up .col,
		[owa] .block-grid.six-up .col {
			width: 83px !important;
		}

		.ie-browser .block-grid.seven-up .col,
		[owa] .block-grid.seven-up .col {
			width: 71px !important;
		}

		.ie-browser .block-grid.eight-up .col,
		[owa] .block-grid.eight-up .col {
			width: 62px !important;
		}

		.ie-browser .block-grid.nine-up .col,
		[owa] .block-grid.nine-up .col {
			width: 55px !important;
		}

		.ie-browser .block-grid.ten-up .col,
		[owa] .block-grid.ten-up .col {
			width: 60px !important;
		}

		.ie-browser .block-grid.eleven-up .col,
		[owa] .block-grid.eleven-up .col {
			width: 54px !important;
		}

		.ie-browser .block-grid.twelve-up .col,
		[owa] .block-grid.twelve-up .col {
			width: 50px !important;
		}
	</style>
<style id="media-query" type="text/css">
		@media only screen and (min-width: 520px) {
			.block-grid {
				width: 500px !important;
			}

			.block-grid .col {
				vertical-align: top;
			}

			.block-grid .col.num12 {
				width: 500px !important;
			}

			.block-grid.mixed-two-up .col.num3 {
				width: 123px !important;
			}

			.block-grid.mixed-two-up .col.num4 {
				width: 164px !important;
			}

			.block-grid.mixed-two-up .col.num8 {
				width: 328px !important;
			}

			.block-grid.mixed-two-up .col.num9 {
				width: 369px !important;
			}

			.block-grid.two-up .col {
				width: 250px !important;
			}

			.block-grid.three-up .col {
				width: 166px !important;
			}

			.block-grid.four-up .col {
				width: 125px !important;
			}

			.block-grid.five-up .col {
				width: 100px !important;
			}

			.block-grid.six-up .col {
				width: 83px !important;
			}

			.block-grid.seven-up .col {
				width: 71px !important;
			}

			.block-grid.eight-up .col {
				width: 62px !important;
			}

			.block-grid.nine-up .col {
				width: 55px !important;
			}

			.block-grid.ten-up .col {
				width: 50px !important;
			}

			.block-grid.eleven-up .col {
				width: 45px !important;
			}

			.block-grid.twelve-up .col {
				width: 41px !important;
			}
		}

		@media (max-width: 520px) {

			.block-grid,
			.col {
				min-width: 320px !important;
				max-width: 100% !important;
				display: block !important;
			}

			.block-grid {
				width: 100% !important;
			}

			.col {
				width: 100% !important;
			}

			.col>div {
				margin: 0 auto;
			}

			img.fullwidth,
			img.fullwidthOnMobile {
				max-width: 100% !important;
			}

			.no-stack .col {
				min-width: 0 !important;
				display: table-cell !important;
			}

			.no-stack.two-up .col {
				width: 50% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num8 {
				width: 66% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num3 {
				width: 25% !important;
			}

			.no-stack .col.num6 {
				width: 50% !important;
			}

			.no-stack .col.num9 {
				width: 75% !important;
			}

			.mobile_hide {
				min-height: 0px;
				max-height: 0px;
				max-width: 0px;
				display: none;
				overflow: hidden;
				font-size: 0px;
			}
		}
	</style>
</head>
<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
<style id="media-query-bodytag" type="text/css">
@media (max-width: 520px) {
  .block-grid {
    min-width: 320px!important;
    max-width: 100%!important;
    width: 100%!important;
    display: block!important;
  }
  .col {
    min-width: 320px!important;
    max-width: 100%!important;
    width: 100%!important;
    display: block!important;
  }
  .col > div {
    margin: 0 auto;
  }
  img.fullwidth {
    max-width: 100%!important;
    height: auto!important;
  }
  img.fullwidthOnMobile {
    max-width: 100%!important;
    height: auto!important;
  }
  .no-stack .col {
    min-width: 0!important;
    display: table-cell!important;
  }
  .no-stack.two-up .col {
    width: 50%!important;
  }
  .no-stack.mixed-two-up .col.num4 {
    width: 33%!important;
  }
  .no-stack.mixed-two-up .col.num8 {
    width: 66%!important;
  }
  .no-stack.three-up .col.num4 {
    width: 33%!important
  }
  .no-stack.four-up .col.num3 {
    width: 25%!important
  }
}
</style>
<!--[if IE]><div class="ie-browser"><![endif]-->
<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; border-collapse: collapse;" valign="top">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:transparent;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 12px; line-height: 14px; color: #555555; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">
<p style="font-size: 14px; line-height: 16px; margin: 0;">${job.companyInfo.name || ''}</p>
<p style="font-size: 14px; line-height: 16px; margin: 0;">${'Tmrw at '}</p>
${employees()}
<br/>
${mainContact()}
${additionalContacts()}
<br/>
${startTime()}
<br/>
${addresses()}
<br/>
${job.flatRate[0].isTrue ? flatRateInfoDisplay() : hourlyRateDisplay()}
<br/>
${NTE()}
${trucks()}
${takenBy()}
<br/>
${notes()}
<br/>
----------------------------
<br/>
<p style="font-size: 14px; line-height: 16px; margin: 0;">${job.companyInfo.name}</p>
<p style="font-size: 14px; line-height: 16px; margin: 0;">${'Tmrw at '}</p>
${employees()}
<br/>
${addresses()}
<br/>
${trucks()}
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
<!--[if (IE)]></div><![endif]-->
</body>
</html>
        `;
}
