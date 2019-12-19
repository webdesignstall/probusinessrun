export default function EmailContent(job) {
    let additionalPhoneNumber = job.phoneAdditional
        ? `
        <div
          style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
        >
          <table
            style="width: 100%; text-align: left; font-size: 13px"
          >
            <tr
              style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
            >
              <td
                style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
              >
              Customer Secondary No:
              </td>
              <td
                style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
              >
                ${job.phoneAdditional}
              </td>
            </tr>
          </table>
        </div>`
        : '';

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

    let movingAddresesRenderHTML = '';

    job.addresses
        .map((address, index) => {
            movingAddresesRenderHTML += `
            <div
              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
              <table
                style="width: 100%; text-align: left; font-size: 13px"
              >
                <tr
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                  <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                  >
                  Address #${index + 1}:
                  </td>
                  <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                  >
                    ${address}
                  </td>
                </tr>
              </table>
            </div>
            `;
        })
        .join('');

    function rateInFlatDisplay() {
        return job.flatRate &&
            job.flatRate[0] &&
            job.flatRate[0].isTrue &&
            job.laborTime &&
            job.hourlyRatesCash > 0 &&
            job.hourlyRatesCard
            ? `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
          >
            <table
              style="width: 100%; text-align: left; font-size: 13px"
            >
              <tr
                style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
              >
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                Hourly Rate After ${job.laborTime} hours
                </td>
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                Cash $${job.hourlyRatesCash}/hr, Card $${job.hourlyRatesCard}/hr
                </td>
              </tr>
            </table>
          </div>
          `
            : '';
    }

    let rateDisplay =
        job.hourlyRatesCash > 0 && job.hourlyRatesCard > 0 && !job.flatRate[0].isTrue
            ? `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
          >
            <table
              style="width: 100%; text-align: left; font-size: 13px"
            >
              <tr
                style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
              >
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                Cash Discounted Rate p/hour:
                </td>
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                $${job.hourlyRatesCash}
                </td>
              </tr>
            </table>
          </div>
          <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
          >
            <table
              style="width: 100%; text-align: left; font-size: 13px"
            >
              <tr
                style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
              >
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                Card Regular Rate p/hour:
                </td>
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                $${job.hourlyRatesCard}
                </td>
              </tr>
            </table>
          </div>
        `
            : '';

    let flatRate =
        job.flatRate && job.flatRate[0] && job.flatRate[0].isTrue
            ? `
        <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
          >
            <table
              style="width: 100%; text-align: left; font-size: 13px"
            >
              <tr
                style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
              >
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                Flat Rate: ${job.laborTime && job.laborTime > 0 ? `Up to ${job.laborTime} hours` : ''}
                </td>
                <td
                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                >
                Cash $${job.flatRate[0].cashAmount}, Card $${job.flatRate[0].cardAmount}
                </td>
              </tr>
            </table>
          </div>
        `
            : '';

    let laborTime =
        job.laborTime && job.laborTime > 0
            ? `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Minimum Labor Time:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${job.laborTime} hour(s)
                    </td>
                </tr>
                </table>
            </div>
        `
            : '';

    let gasFee =
        job.gasFee && job.gasFee > 0
            ? `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Travel Fee (one time fee):
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    $${job.gasFee}
                    </td>
                </tr>
                </table>
            </div>
        `
            : job.gasFee === '' || job.gasFee === 0 || job.gasFee === undefined
                ? `
                <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Travel Fee (one time fee):
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Waived
                    </td>
                </tr>
                </table>
            </div>
            `
                : '';

    let doubleDrive =
        job.doubleDrive && job.doubleDrive === 'yes'
            ? `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Double Drive Time:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2019/02/DDT.pdf">learn more</a>
                    </td>
                </tr>
                </table>
            </div>
        `
            : job.doubleDrive && job.doubleDrive === 'waived'
                ? `
                <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Double Drive Time:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Waived
                    </td>
                </tr>
                </table>
            </div>
            `
                : '';

    let smallItemPacking =
        job.smallItemPacking && job.smallItemPacking !== 0
            ? `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Small Item Packing:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${
    job.smallItemPacking < 0
        ? 'Yes, <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf">learn more</a>'
        : '$' + job.smallItemPacking
}
                    </td>
                </tr>
                </table>
            </div>
        `
            : '';

    let doubleDriveAdditional =
        job.doubleDrive && job.doubleDrive === 'notSure'
            ? `
            <div
            style="padding: 3px 0 3px 10px;font-size:13px;text-align:left;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
            Double Drive Time, <a href="http://www.moverslegion.com/wp-content/uploads/2019/02/DDT.pdf">learn more</a>
            </div>
        `
            : '';

    let gasFeeAdditional =
        job.gasFee && job.gasFee < 0
            ? `
            <div
            style="padding: 3px 0 3px 10px;font-size:13px;text-align:left;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
            Travel Fee (one time fee)
            </div>
        `
            : '';

    let extraLargeItemPacking =
        job.largeItemFee && job.largeItemFee > 0
            ? `
            <div
            style="font-size:13px;text-align:left;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Extra-Large Item Handling Fee
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    $${job.largeItemFee}
                    </td>
                </tr>
                </table>
            </div>
        `
            : '';

    let additionalContacts =
        job.additionalContacts && job.additionalContacts.length > 0
            ? job.additionalContacts
                .map(contact => {
                    return `
                    <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Additional Contact Name:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${contact.firstName || ''} ${contact.lastName || ''}
                    </td>
                </tr>
                </table>
            </div>
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Contact Main No:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${contact.phoneNumber}
                    </td>
                </tr>
                </table>
            </div>
                ${
    contact.additionalPhoneNumber !== null &&
                    contact.additionalPhoneNumber !== undefined &&
                    contact.additionalPhoneNumber !== ''
        ? `
        <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Contact Secondary No:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${contact.additionalPhoneNumber}
                    </td>
                </tr>
                </table>
            </div>`
        : ''
}`;
                })
                .join('')
            : '';

    let arrivalWindow =
        job.workMustBeginTime[0] === '04:00 am' && job.workMustBeginTime[0] === '04:00 am'
            ? `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Arrival Window:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Morning & Afternoon
                    </td>
                </tr>
                </table>
            </div>
        `
            : `
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Arrival Window:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${job.workMustBeginTime[0]} - ${job.workMustBeginTime[1]}
                    </td>
                </tr>
                </table>
            </div>`;

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
            <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Number of Trucks:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${totalTrucks} fully equipped
                    </td>
                </tr>
                </table>
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
                        <div
            style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
            >
                <table
                style="width: 100%; text-align: left; font-size: 13px"
                >
                <tr
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                >
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    Truck Size:
                    </td>
                    <td
                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                    >
                    ${truck.size}
                    </td>
                </tr>
                </table>
            </div>
                            `;
                    }
                    return render;
                })
                .join('')
            : '';

    function timeDisplay() {
        let time = 'hours(s)';
        let amount = 0;

        switch (job.expireHour) {
        case 24:
            (time = 'day'), (amount = 1);
            break;

        case 48:
            (time = 'days'), (amount = 2);
            break;

        case 72:
            (time = 'days'), (amount = 3);
            break;

        case 168:
            (time = 'week'), (amount = 1);
            break;

        default:
            (time = 'hour(s)'), (amount = job.expireHour);
            break;
        }

        return job.expireHour > 0 ? `in ${amount} ${time}.` : 'soon.';
    }

    function renderAdditionalInfo() {
        return job.additionalInfo
            .map(addInfo => {
                return `
        <div>✓ ${addInfo}</div>
          `;
            })
            .join('');
    }

    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

    <html
      xmlns="http://www.w3.org/1999/xhtml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <!--[if gte mso 9
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:AllowPNG /><o:PixelsPerInch
                >96</o:PixelsPerInch
              ></o:OfficeDocumentSettings
            ></xml
          ><!
        [endif]-->
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width" name="viewport" />
        <!--[if !mso]><!-->
        <meta content="IE=edge" http-equiv="X-UA-Compatible" />
        <!--<![endif]-->
        <title></title>
        <!--[if !mso]><!-->
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
          type="text/css"
        />
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
    
          a[x-apple-data-detectors="true"] {
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
    
            .col > div {
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
      <body
        class="clean-body"
        style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;"
      >
        <style id="media-query-bodytag" type="text/css">
          @media (max-width: 520px) {
            .block-grid {
              min-width: 320px !important;
              max-width: 100% !important;
              width: 100% !important;
              display: block !important;
            }
            .col {
              min-width: 320px !important;
              max-width: 100% !important;
              width: 100% !important;
              display: block !important;
            }
            .col > div {
              margin: 0 auto;
            }
            img.fullwidth {
              max-width: 100% !important;
              height: auto !important;
            }
            img.fullwidthOnMobile {
              max-width: 100% !important;
              height: auto !important;
            }
            .no-stack .col {
              min-width: 0 !important;
              display: table-cell !important;
            }
            .no-stack.two-up .col {
              width: 50% !important;
            }
            .no-stack.mixed-two-up .col.num4 {
              width: 33% !important;
            }
            .no-stack.mixed-two-up .col.num8 {
              width: 66% !important;
            }
            .no-stack.three-up .col.num4 {
              width: 33% !important;
            }
            .no-stack.four-up .col.num3 {
              width: 25% !important;
            }
          }
        </style>
        <!--[if IE]><div class="ie-browser"><![endif]-->
        <table
          bgcolor="#FFFFFF"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
          valign="top"
          width="100%"
        >
          <tbody>
            <tr style="vertical-align: top;" valign="top">
              <td
                style="word-break: break-word; vertical-align: top; border-collapse: collapse;"
                valign="top"
              >
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
                <div style="background-color:transparent;">
                  <div
                    class="block-grid"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #534C88;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#534C88;"
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#534C88"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#534C88;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:20px;"><![endif]-->
                      <div
                        class="col num12"
                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                          >
                            <!--<![endif]-->
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 20px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                            <div
                              style="color:#FFFFFF;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:20px;padding-right:10px;padding-bottom:20px;padding-left:10px;"
                            >
                              <div
                                style="font-size: 13px; line-height: 14px; color: #FFFFFF; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;"
                              >
                                <p style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;">
                                  <span style="font-size: 14px; line-height: 16px;">
                                  <strong> Hello ${job.clientFirstName || ''} ${job.clientLastName || ''}!</strong>
                                </span><br />
                                <span style="font-size: 14px; line-height: 16px;" >
                                <strong>
                                      Thank you for requesting your moving quote!
                                </strong>
                                </span>
                                <br/>
                                <span style="font-size: 14px; line-height: 16px;" >
                                <strong>
                                  Act now! This Promotional Rate expires ${timeDisplay()}</strong></span><br />
<span style="font-size: 14px; line-height: 16px;" >
                                <strong>
                                      Your quote includes:</strong></span><br/>
                                </p>
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
                  <div
                    class="block-grid two-up"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #F3F2F2;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#F3F2F2;"
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#F3F2F2"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="250" style="background-color:#F3F2F2;width:250px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                      <div
                        class="col num6"
                        style="max-width: 320px; min-width: 250px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                          >
                            <!--<![endif]-->
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                Professional, Full Time Movers
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                Use of Wardrobe Boxes
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                Large Item Packing Supplies
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                Moving Trucks &amp; Movers
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                BEARHFTI Licensed &amp; Insured
                              </div>
                            </div>
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                      <!--[if (mso)|(IE)]></td><td align="center" width="250" style="background-color:#F3F2F2;width:250px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                      <div
                        class="col num6"
                        style="max-width: 320px; min-width: 250px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"
                          >
                            <!--<![endif]-->
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                No Hidden Fees
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                Disassembling &amp; Reassembling
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                Tax Included
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 100%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px;"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                24/7 Local Support Team
                              </div>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div
                                class="half"
                                style="font-size: 13px; text-align: left; width: 49%; display: inline-block; line-height: 13px; margin: 5px 0 2px; padding: 2px 0 2px 10px; width: 100%"
                              >
                                <span style="font-size: 20px; color: green">✓</span>
                                Cash Discount Per Hour
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
                  <div
                    class="block-grid"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #F3F2F2;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#F3F2F2;"
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#F3F2F2"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#F3F2F2;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                      <div
                        class="col num12"
                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;"
                          >
                            <!--<![endif]-->
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <table
                                style="width: 100%; text-align: left; font-size: 13px"
                              >
                                <tr
                                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                                >
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    Customer Name:
                                  </td>
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    ${job.clientFirstName} ${job.clientLastName}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <table
                                style="width: 100%; text-align: left; font-size: 13px"
                              >
                                <tr
                                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                                >
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    Customer Main No:
                                  </td>
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    ${job.phoneNumber}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            ${additionalPhoneNumber} 
                            ${additionalContacts}
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <table
                                style="width: 100%; text-align: left; font-size: 13px"
                              >
                                <tr
                                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                                >
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    Job Number:
                                  </td>
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    ${job.jobNumber}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <table
                                style="width: 100%; text-align: left; font-size: 13px"
                              >
                                <tr
                                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                                >
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    Moving Date:
                                  </td>
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    ${job.workDate}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            ${arrivalWindow} ${movingAddresesRenderHTML}
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <table
                                style="width: 100%; text-align: left; font-size: 13px"
                              >
                                <tr
                                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                                >
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    Moving Size:
                                  </td>
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    ${movingSize()}
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <table
                                style="width: 100%; text-align: left; font-size: 13px"
                              >
                                <tr
                                  style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse;"
                                >
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    Number of Movers:
                                  </td>
                                  <td
                                    style="border-bottom: 1px solid #a5a5a6; border-collapse: collapse; padding: 3px 0 3px 10px; width: 50%;"
                                  >
                                    ${job.numberOfWorkers} men crew
                                  </td>
                                </tr>
                              </table>
                            </div>
                            ${numberOfTrucks} 
                            ${trucksList} 
                            ${laborTime}
                            ${flatRate}
                            ${rateInFlatDisplay()}
                            ${rateDisplay} 
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
                ${
    job.gasFee >= 0 ||
                    job.doubleDrive !== 'notSure' ||
                    job.smallItemPacking > 0 ||
                    job.smallItemPacking < 0 ||
                    job.largeItemFee > 0
        ? `
                <div style="background-color:transparent;">
                  <div
                    class="block-grid"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #4B5570;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#4B5570;"
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#4B5570"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#4B5570;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                      <div
                        class="col num12"
                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"
                          >
                            <!--<![endif]-->
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                            <div
                              style="color:#FFFFFF;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                            >
                              <div
                                style="font-size: 13px; line-height: 14px; color: #FFFFFF; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;"
                              >
                                <p
                                  style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"
                                >
                                  <span
                                    style="color: #ffffff; line-height: 16px; font-size: 14px;"
                                    >ADDITIONAL CHARGES</span
                                  >
                                </p>
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
                  <div
                    class="block-grid"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #F3F2F2;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#F3F2F2;"
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#F3F2F2"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#F3F2F2;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                      <div
                        class="col num12"
                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;"
                          >
                            <!--<![endif]-->
                            ${gasFee} ${doubleDrive} ${smallItemPacking}
                            ${extraLargeItemPacking}
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
      `
        : ''
}
                
                ${
    job.doubleDrive === 'notSure' || job.gasFee < 0
        ? `
        <div style="background-color:transparent;">
                  <div
                    class="block-grid"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #4B5570;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#4B5570;"
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#4B5570"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#4B5570;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                      <div
                        class="col num12"
                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"
                          >
                            <!--<![endif]-->
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                            <div
                              style="color:#FFFFFF;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                            >
                              <div
                                style="font-size: 13px; line-height: 14px; color: #FFFFFF; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;"
                              >
                                <p
                                  style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"
                                >
                                  <span
                                    style="color: #ffffff; font-size: 14px; line-height: 16px;"
                                    >POSSIBLE ADDITIONAL CHARGES</span
                                  >
                                </p>
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
                        <div
                          class="block-grid"
                          style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #F3F2F2;"
                        >
                          <div
                            style="border-collapse: collapse;display: table;width: 100%;background-color:#F3F2F2;"
                          >
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#F3F2F2"><![endif]-->
                            <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#F3F2F2;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                            <div
                              class="col num12"
                              style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                            >
                              <div style="width:100% !important;">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div
                                  style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;"
                                >
                                  <!--<![endif]-->
                                  ${doubleDriveAdditional} ${gasFeeAdditional}
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
                            `
        : ''
}
${
    job.noteForYourMove && job.noteForYourMove.trim() !== ''
        ? `
<div style="background-color:transparent;">
<div
class="block-grid"
style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #4B5570;"
>
<div
  style="border-collapse: collapse;display: table;width: 100%;background-color:#4B5570;"
>
  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#4B5570"><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#4B5570;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
  <div
    class="col num12"
    style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
  >
    <div style="width:100% !important;">
      <!--[if (!mso)&(!IE)]><!-->
      <div
        style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"
      >
        <!--<![endif]-->
        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
        <div
          style="color:#FFFFFF;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
        >
          <div
            style="font-size: 13px; line-height: 14px; color: #FFFFFF; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;"
          >
            <p
              style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"
            >
            NOTE FOR YOUR MOVE
            </p>
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
                <div
                  class="block-grid"
                  style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #F3F2F2;"
                >
                  <div
                    style="border-collapse: collapse;display: table;width: 100%;background-color:#F3F2F2;"
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#F3F2F2"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#F3F2F2;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                    >
                      <div style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;"
                        >
                          <!--<![endif]-->
                          <div
                          style="padding: 3px 0 3px 10px;font-size:13px;text-align:left;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                          >
                          <div 
                          style="border: none;
                          background-color: rgb(243, 242, 242);
                          min-width: 480px;
                          max-width: 480px;
                          min-height: 60px;
                          ">${job.noteForYourMove}</div>
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

`
        : ''
}
${
    job.additionalInfo && job.additionalInfo.length > 0 && Array.isArray(job.additionalInfo)
        ? `
      <div style="background-color:transparent;">
      <div
        class="block-grid"
        style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #4B5570;"
      >
        <div
          style="border-collapse: collapse;display: table;width: 100%;background-color:#4B5570;"
        >
          <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#4B5570"><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#4B5570;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
          <div
            class="col num12"
            style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
          >
            <div style="width:100% !important;">
              <!--[if (!mso)&(!IE)]><!-->
              <div
                style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"
              >
                <!--<![endif]-->
                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                <div
                  style="color:#FFFFFF;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                >
                  <div
                    style="font-size: 13px; line-height: 14px; color: #FFFFFF; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;"
                  >
                    <p
                      style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"
                    >
                      GOOD TO KNOW
                    </p>
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
                      <div
                        class="block-grid"
                        style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #F3F2F2;"
                      >
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;background-color:#F3F2F2;"
                        >
                          <!--[if (mso)|(IE)]><table max-width="500px" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#F3F2F2"><![endif]-->
                          <!--[if (mso)|(IE)]><td align="center" max-width="500px" style="background-color:#F3F2F2;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                          <div
                            class="col num12"
                            style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                          >
                            <div style="max-width: 500px !important;">
                              <!--[if (!mso)&(!IE)]><!-->
                              <div
                                style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;"
                              >
                                <!--<![endif]-->
                                <div
                                style="padding: 3px 0 3px 10px;font-size:13px;text-align:left;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                                >
                                <div 
                                style="border: none;
                                background-color: rgb(243, 242, 242);
                                min-width: 480px;
                                max-width: 480px;
                                min-height: 60px;
                                ">${renderAdditionalInfo()}</div>
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
  
    `
        : ''
}
<div style="background-color:transparent;">
                  <div
                    class="block-grid"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #4B5570;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#4B5570;"
                    >
                      <!--[if (mso)|(IE)]><table max-width="500px" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#4B5570"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="500px" style="background-color:#4B5570;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                      <div
                        class="col num12"
                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"
                          >
                            <!--<![endif]-->
                            <!--[if mso]><table max-width="500px" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                            <div
                              style="color:#FFFFFF;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                            >
                              <div
                                style="font-size: 13px; line-height: 14px; color: #FFFFFF; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;"
                              >
                                <p
                                  style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"
                                >
                                  THE PRICE DOES NOT INCLUDED
                                </p>
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
                  <div
                    class="block-grid"
                    style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #F3F2F2;"
                  >
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;background-color:#F3F2F2;"
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#F3F2F2"><![endif]-->
                      <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#F3F2F2;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top:5px; padding-bottom:10px;"><![endif]-->
                      <div
                        class="col num12"
                        style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top;"
                      >
                        <div style="width:100% !important;">
                          <!--[if (!mso)&(!IE)]><!-->
                          <div
                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:10px; padding-right: 10px; padding-left: 10px;"
                          >
                            <!--<![endif]-->
                            ${
    job.smallItemPacking === 0 || job.smallItemPacking === '' || job.smallItemPacking === undefined
        ? `
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div class="our-class">
                                <div
                                  style="text-align: left; font-size: 13px; padding: 2px 0;"
                                >
                                  <span style="font-size: 14px; color: red">✘</span>
                                  Small Item Packing Materials: (boxes, packing papers,bubble wrap.
                                  <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/small-item-pricing.pdf"> Inquire, if needed</a>
                                </div>
                              </div>
                            </div>
                            `
        : ''
}<div
style="text-align: left; font-size: 13px; padding: 2px 0;"
>
<span style="font-size: 14px; color: red">✘</span>
Customer responsible to hold the space for moving truck (if there
is any parking ticket, Customer is responsible to pay for it).
</div>
<div
style="text-align: left; font-size: 13px; padding: 2px 0;"
>
<span style="font-size: 14px; color: red">✘</span>
Full-coverage Insurance. <a href="http://www.moverslegion.com/wp-content/uploads/2018/12/Full-Insurance.pdf" >Inquire, if needed</a>
</div>${
    job.largeItemFee === 0 || job.largeItemFee === '' || job.largeItemFee === undefined
        ? `
                            <div
                              style="font-size:16px;text-align:center;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif"
                            >
                              <div class="our-class">
                                <div
                                  style="text-align: left; font-size: 13px; padding: 2px 0;"
                                >
                                  <span style="font-size: 14px; color: red">✘</span>
                                  Extra-Large Item Packing and Transportation: for example, pool
                    tables, pianos, etc. (Please ask if you need Extra-Large Item Packing and Moving).
                                </div>
                              </div>
                            </div>
                            `
        : ''
}<div
                              align="center"
                              class="button-container"
                              style="padding-top:15px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                            >
                              <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 15px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.probusinessrun.com/reserve" style="height:31.5pt; width:139.5pt; v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#534C88"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:13px"><!
                              [endif]--><a
                                href="https://www.probusinessrun.com/reserve"
                                style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #534C88; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 1px solid #534C88; border-right: 1px solid #534C88; border-bottom: 1px solid #534C88; border-left: 1px solid #534C88; padding-top: 5px; padding-bottom: 5px; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"
                                target="_blank"
                                ><span
                                  style="padding-left:25px;padding-right:25px;font-size:13px;display:inline-block;"
                                >
                                  <span style="font-size: 16px; line-height: 32px;">
                                    <span style="font-size: 13px; line-height: 26px;">
                                      <strong>RESERVE YOUR MOVE</strong>
                                    </span>
                                  </span>
                                </span>
                                </a>
                              <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                            </div>
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                            <div
                              style="color:#555555;font-family:'Roboto', Tahoma, Verdana, Segoe, sans-serif;line-height:120%;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;"
                            >
                              <div
                                style="font-size: 13px; line-height: 14px; color: #555555; font-family: 'Roboto', Tahoma, Verdana, Segoe, sans-serif;"
                              >
                                <p
                                  style="font-size: 14px; line-height: 16px; text-align: center; margin: 0;"
                                >
                                  With one click, we move it quick!<br />
                                  ${job.companyInfo.name} <br />
                                  Phone: ${job.companyInfo.phoneNumber}<br />
                                  E-mail: ${job.companyInfo.email} <br />
                                  Web:
                                  <a
                                    href="${job.companyInfo.url}"
                                    rel="noopener"
                                    style="text-decoration: underline; color: #0068A5;"
                                    target="_blank"
                                    >${job.companyInfo.url}</a
                                  ><br />
                                  License # BEARHFTI 0191555
                                </p>
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
