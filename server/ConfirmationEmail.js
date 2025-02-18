export default function ConfirmationEmail(job) {
    function addressesRender(addressler) {
        let addreslerHTML = '';
        addressler.map((address, index) => {
            addreslerHTML += `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Address#${index + 1}:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${address}</div>
</div>
</div>`;
        });

        return addreslerHTML;
    }

    let movingSize = function() {
        let movingSizeList = {
            items: 'Items',
            studio: 'Studio',
            '1_bedroom': '1 Bedroom',
            '2_bedroom_small': '2 Bedroom (small size, few items)',
            '2_bedroom_avg': '2 Bedroom (avg. size, avg. items)',
            '2_bedroom_large': '2 Bedroom (large size, many items)',
            '3_bedroom_avg': '3 Bedroom (avg. size, avg. items)',
            '3_bedroom_large': '3 Bedroom (large size, many items)',
            '4_bedrooom_avg': '4 Bedroom (avg. size, avg. items)',
            '4_bedroom_large': '4 Bedroom (large size, many items)',
            '5_bedroom_avarage': '5 Bedrooms (avarage size, avg items)',
            commercial_sml: 'Commercial (small size, few items)',
            commercial_avg: 'Commercial (avg. size, avg. items)',
            commercial_large: 'Commercial (large size, many items)',
            long_distance_moves: 'Long Distance Moves'
        };

        return movingSizeList[job.movingSize];
    };

    let additionalContacts =
        job.additionalContacts && job.additionalContacts.length > 0
            ? job.additionalContacts.map(contact => {
                  return `
                <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Additional Contact Name:</div>
<div style="width: 49%; display: inline-block; text-align: left;"> ${contact.firstName} ${contact.lastName}</div>
</div>
</div>
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Contact Main No:</div>
<div style="width: 49%; display: inline-block; text-align: left;"> ${contact.phoneNumber || '-'}</div>
</div>
</div>
                ${
                    contact.additionalPhoneNumber !== null &&
                    contact.additionalPhoneNumber !== undefined &&
                    contact.additionalPhoneNumber !== ''
                        ? `
        <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Contact Secondary No:</div>
<div style="width: 49%; display: inline-block; text-align: left;"> ${contact.additionalPhoneNumber}</div>
</div>
</div>`
                        : ''
                }
                `;
              })
            : '';

    let additionalPhoneNumber =
        job.phoneAdditional !== null && job.phoneAdditional !== undefined && job.phoneAdditional !== 'null'
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Customer Secondary No:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.phoneAdditional}</div>
</div>
</div>`
            : '';

    let totalTrucks = 0;
    job.trucksTemp && job.trucksTemp.length > 0
        ? job.trucksTemp
              .map(truck => {
                  totalTrucks += Number(truck.qty);
              })
              .join('')
        : '';

    let numberOfTrucks =
        job.trucksTemp && job.trucksTemp.length > 0
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Number of trucks:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${totalTrucks} fully equipped</div>
</div>
</div>
            `
            : '';

    let trucksList =
        job.trucksTemp && job.trucksTemp.length > 0
            ? job.trucksTemp
                  .map(truck => {
                      let render = '';
                      let i = 0;
                      for (i = 0; i < Number(truck.qty); i++) {
                          render += `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
                        <div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Truck Size:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${truck.size}</div>
</div>
</div>
                `;
                      }
                      return render;
                  })
                  .join('')
            : '';

    let arrivalWindow =
        job.workMustBeginTime[0] === '04:00 am' && job.workMustBeginTime[0] === '04:00 am'
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Arrival Window:</div>
<div style="width: 49%; display: inline-block; text-align: left;">Morning & Afternoon</div>
</div>
</div>
        `
            : `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Arrival Window:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.workMustBeginTime[0]} - ${job.workMustBeginTime[1]}</div>
</div>
</div>`;

    function laborTime() {
        return job.laborTime
            ? `
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Minimum Labor Time:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.laborTime} hours</div>
</div>
</div>`
            : '';
    }

    function flatRate() {
        return job.flatRate && job.flatRate[0].isTrue
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Flat Rate Up to ${job.laborTime} hours</div>
<div style="width: 49%; display: inline-block; text-align: left;">cash $${job.flatRate[0].cashAmount}, card $${job.flatRate[0].cardAmount}</div>
</div>
</div>`
            : '';
    }

    function hourlyRate() {
        return job.flatRate && job.flatRate[0].isTrue && job.hourlyRatesCard > 0 && job.hourlyRatesCash > 0
            ? `
        <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Hourly Rate After ${job.laborTime} hours</div>
<div style="width: 49%; display: inline-block; text-align: left;">cash $${job.hourlyRatesCash}/hr, card $${job.hourlyRatesCard}/hr </div>
</div>
</div> 
        `
            : '';
    }

    function cardRate() {
        return job.hourlyRatesCash && job.hourlyRatesCard > 0
            ? `
                <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Card Regular Rate p/hour:</div>
<div style="width: 49%; display: inline-block; text-align: left;">$${job.hourlyRatesCard}</div>
</div>
</div>`
            : '';
    }

    function cashRate() {
        return job.hourlyRatesCash && job.hourlyRatesCash > 0
            ? `
                <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Cash Discount Rate p/hour:</div>
<div style="width: 49%; display: inline-block; text-align: left;">$${job.hourlyRatesCash}</div>
</div>
</div>
                `
            : '';
    }

    function gasFee() {
        return !isNaN(Number(job.gasFee)) && Number(job.gasFee) > 0
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Travel Fee (one time):</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.gasFee < 0 ? 'Not Sure' : '$' + job.gasFee}</div>
</div>
</div>`
            : '';
    }

    function doubleDrive() {
        return job.doubleDrive === 'yes'
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Double Drive Time:</div>
<div style="width: 49%; display: inline-block; text-align: left;">Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2019/02/DDT.pdf" download="http://www.moverslegion.com/wp-content/uploads/2019/02/DDT.pdf" target="_blank" rel="noopener noreferrer">learn more</a></div>
</div>
</div>`
            : '';
    }

    function smallItemPacking() {
        return job.smallItemPacking < 0 || job.smallItemPacking > 0
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Small Item Packing:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${
                  job.smallItemPacking < 0
                      ? 'Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf" target="_blank" rel="noopener noreferrer">learn more</a>'
                      : '$' + job.smallItemPacking
              }</div>
</div>
</div>`
            : '';
    }

    function largeItemFee() {
        return job.largeItemFee && job.largeItemFee > 0
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Extra Large Item Handling:</div>
<div style="width: 49%; display: inline-block; text-align: left;">$${job.largeItemFee}</div>
</div>
</div>`
            : '';
    }

    function stairsFee() {
        return job.stairsFee && job.stairsFee > 0
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Stairs Fee:</div>
<div style="width: 49%; display: inline-block; text-align: left;">$${job.stairsFee}</div>
</div>
</div>`
            : '';
    }

    function deposit() {
        return job.deposit && job.deposit > 0
            ? `
            <div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Deposit required to lock the spot:</div>
<div style="width: 49%; display: inline-block; text-align: left;">+$${job.deposit} (to be applied as a credit toward this move’s bill)</div>
</div>
</div>`
            : '';
    }

    function noteForYourMove() {
        return job.noteForYourMove;
    }

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
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
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

			.video-block {
				max-width: none !important;
			}

			.mobile_hide {
				min-height: 0px;
				max-height: 0px;
				max-width: 0px;
				display: none;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide {
				display: block !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #fff;">
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
<table bgcolor="#fff" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; border-collapse: collapse;" valign="top">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#fff"><![endif]-->
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #D4D9DF;;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#D4D9DF;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#D4D9DF"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#D4D9DF;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
<div style="color:#000000;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 12px; line-height: 14px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; color: #000000;">
<p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"><span style="color: #4d4d4d; font-size: 14px; line-height: 16px;"><strong><span style="font-size: 14px; line-height: 16px;">Hello ${
        job.clientFirstName
    }!</span></strong></span><br/><span style="color: #4d4d4d; font-size: 14px; line-height: 16px;"><strong><span style="font-size: 14px; line-height: 16px;">Thank you for confirming your move with ${
        job.companyInfo.name
    }!</span></strong></span><br/><span style="color: #4d4d4d; font-size: 14px; line-height: 16px;"><strong><span style="font-size: 14px; line-height: 16px;">Please review your Moving Confirmation below to ensure accuracy:</span></strong></span></p>
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
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #D4D9DF;;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#D4D9DF;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#D4D9DF"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#D4D9DF;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
<!--<![endif]-->
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Customer Name:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.clientFirstName} ${job.clientLastName || ''}</div>
</div>
</div>
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Customer Main No:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.phoneNumber || ''}</div>
</div>
</div>
${additionalPhoneNumber}
${additionalContacts}
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Your Job Number:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.jobNumber}</div>
</div>
</div>
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Moving Date:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.workDate}</div>
</div>
</div>
${arrivalWindow}
${addressesRender(job.addresses)}
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Moving Size:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${movingSize()}</div>
</div>
</div>
<div style="font-size:16px;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
<div  style="font-size: 13px; margin-bottom: 5px; border-bottom: 1px solid #BBBEC3">
<div style="width: 49%; display: inline-block; text-align: left;">Number of Movers:</div>
<div style="width: 49%; display: inline-block; text-align: left;">${job.numberOfWorkers} men crew</div>
</div>
</div>
${numberOfTrucks}
${trucksList}
${laborTime()}
${job.flatRate && job.flatRate[0].isTrue ? flatRate() : ''}
${job.flatRate && job.flatRate[0].isTrue ? hourlyRate() : ''}
${job.flatRate && job.flatRate[0].isTrue ? '' : cashRate()}
${job.flatRate && job.flatRate[0].isTrue ? '' : cardRate()}
${gasFee()}
${doubleDrive()}
${smallItemPacking()}
${largeItemFee()}
${stairsFee()}
${deposit()}
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
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #D4D9DF;;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#D4D9DF;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#D4D9DF"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#D4D9DF;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<div style="font-size:16px;border:1px solid #BBBEC2;text-align:center;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif">
${
    job.noteForYourMove && job.noteForYourMove.trim() !== ''
        ? `<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
Note For Your Move <br/>
<div>${noteForYourMove()}</div><br/>
<hr/>
</div>`
        : ''
}
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    <input checked disabled type="checkbox"> I have read, understand and agree to the contents of the <i><a href="https://www.moverslegion.com/wp-content/uploads/2019/01/included.pdf" download="https://www.moverslegion.com/wp-content/uploads/2019/01/included.pdf" target="_blank" style="color: #4698de; font-weight: 600;">&quot;What&apos;s Included&quot; Section.</a></i>
</div>
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    <input checked disabled type="checkbox"> I have read, understand and agree to the contents of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2019/01/not-included.pdf" download="http://www.moverslegion.com/wp-content/uploads/2019/01/not-included.pdf" target="_blank" style="color: #4698de; font-weight: 600;">&quot;What&apos;s Not Included&quot; Section.</a></i>
</div>
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    <input checked disabled type="checkbox"> I have read, understand and agree to the contents of the <i><a href="https://www.moverslegion.com/wp-content/uploads/2019/06/for-you-1.pdf" download="https://www.moverslegion.com/wp-content/uploads/2019/06/for-you-1.pdf" target="_blank" style="color: #4698de; font-weight: 600;">&quot;For Your Information&quot; Section.</a></i>
</div>
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    <input checked disabled type="checkbox"> I have recieved a copy of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/important.pdf" target="_blank" style="color: #4698de; font-weight: 600;">CPUC &quot;Important Information About Your Move&quot; booklet.</a></i>
</div>
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    <input checked disabled type="checkbox"> I have recieved a copy of the <i><a href="http://www.moverslegion.com/wp-content/uploads/2018/12/Hazard.pdf" download="http://www.moverslegion.com/wp-content/uploads/2018/12/Hazard.pdf" target="_blank" style="color: #4698de; font-weight: 600;">CPUC Hazardous Material List</a></i> and I agree not to pack any of the<br>
                    items listed for transportation by the moving company.
</div>
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    <input checked disabled type="checkbox"> I understand and agree that I will have Cash or Card Payment ready on the day of my move.
</div>
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    <input checked disabled type="checkbox"> Yes! I have read the information above and wish to pay my Moving Deposit to book this move.<br>
                    I understand that this Deposit is non-refundable and non-transferrable if I reschedule or cancel this move.
</div>
<div  style="text-align: left; padding: 5px 10px; font-size: 13px">
    **If you have any questions, please contact us as soon as possible by phone, text, or e-mail 24/7**
</div>
</div>
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
<div style="background-color:transparent;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #D4D9DF;;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#D4D9DF;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#D4D9DF"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#D4D9DF;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 12px; line-height: 14px; color: #555555; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;">
<p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;">Phone Number: ${
        job.companyInfo.phoneNumber
    } <br/>Email: ${job.companyInfo.email} <br/>Web: ${job.companyInfo.url}</p>
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
