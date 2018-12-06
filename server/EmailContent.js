export default function EmailContent(job) {
    let additionalPhoneNumber = job.phoneAdditional
        ? `<div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
            </div>
            <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                PHONE NUMBER
            </div>
            <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                ${job.phoneAdditional }
            </div>`
        : ''

    let movingAddresesRender = job.addresses.map((address, index) => {
        return (
            `
            <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
            </div>
            <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                ADDRESS #${ index }
            </div>
            <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                ${ address }
            </div>
            `
        );
    })

    return (
        `
        <!DOCTYPE html>
        <html lang="en" style="font-family: 'Roboto', sans-serif;">

        <head>
            <meta charset="UTF-8">
            <title>Document</title>

        </head>

        <body style="font-family: 'Roboto', sans-serif;">

            <body style="font-family: 'Roboto', sans-serif;">
                <div class="content" style="font-family: 'Roboto', sans-serif; max-width: 355px; border: 1px solid #574b90; border-radius: 10px; overflow: hidden; margin: 0 auto;">
                    <div class="header" style="font-family: 'Roboto', sans-serif; text-align: center; background-color: #574b90; color: #ecf0f1; padding: 10px; border-bottom: 1px solid #574b90;">
                        Hello Parvana Aliyeva!
                        Thank you for requesting your 50% off moving quote!
                        Your quote includes:
                    </div>
                    <div class="clear margin5" style="font-family: 'Roboto', sans-serif; clear: both; margin: 10px;"></div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;Professional, full time movers
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;Use of Wardrobe Boxes
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;Large Item Packing Supplies
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;Moving Trucks & Movers
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;CPUC Licensed & Insured
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;No hidden fees
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;Disassembly and Reassembly
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;Tax Included
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;24/7 Local Support Team
                    </div>
                    <div class="half inlineBlock list" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 5px 10px; font-size: 12px;">
                        <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=46&g=204&b=113"
                            alt="check" style="font-family: 'Roboto', sans-serif;">
                        &nbsp;Cash Discount per hour
                    </div>

                    <div class="clear margin5" style="font-family: 'Roboto', sans-serif; clear: both; margin: 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        CUSTOMER NAME
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.firstName }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        JOB NUMBER
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.jobNumber }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        PHONE NUMBER
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.phone }
                    </div>
                    ${additionalPhoneNumber }
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        ARRIVAL WINDOW
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.workMustBeginTime }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        CASH DISCOUNT RATE P/HOUR
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        $${job.hourlyRatesCash && job.hourlyRatesCash == 0 ? job.hourlyRatesCash : 'waived' }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        CARD PAYMENT P/HOUR
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        $${job.hourlyRatesCard && job.hourlyRatesCard == 0 ? job.hourlyRatesCard : 'waived' }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        MOVING DATE
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.movingDateConverted }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        MOVING SIZE
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.movingDateConverted }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        # of MOVERS
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.numberOfWorkers }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        MINIMUM LABOR TIME
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        ${job.numberOfWorkers }
                    </div>
                    <div class="clear margin5s" style="font-family: 'Roboto', sans-serif; clear: both; margin: 0 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        MOVING ADDRESS #1
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        $CUSTOMER NAME
                    </div>
                    <div class="clear" style="font-family: 'Roboto', sans-serif; clear: both; margin: 2px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        MOVING ADDRESS #2
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        $CUSTOMER NAME
                    </div>
                    <div class="clear margin5" style="font-family: 'Roboto', sans-serif; clear: both; margin: 10px;">
                        <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        GAS FEE (one time)
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        $22 One-time fee
                    </div>
                    <div class="half inlineBlock list2 bordert" style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px; border-right: 1px solid #bdc3c7;">
                        DOUBLE DRIVE TIME
                    </div>
                    <div class="half inlineBlock list2 " style="font-family: 'Roboto', sans-serif; width: 40%; display: inline-block; padding: 1px 10px; font-size: 12px;">
                        yes (click for learn more)
                    </div>
                    <div class="clear margin5" style="font-family: 'Roboto', sans-serif; clear: both; margin: 10px;"></div>
                    <div class="footer" style="font-family: 'Roboto', sans-serif; background-color: #2c3e50; color: #ecf0f1; font-size: 12px; padding: 10px;">
                        <div style="font-family: 'Roboto', sans-serif;">
                            <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=255&g=0&b=0"
                                alt="" style="font-family: 'Roboto', sans-serif;">
                            Small item packing materials: (boxes, packing papers,bubble wrap. etc.)
                            <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                        </div>
                        <div style="font-family: 'Roboto', sans-serif;">
                            <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=255&g=0&b=0"
                                alt="" style="font-family: 'Roboto', sans-serif;">
                            Extra-Large Item Packing and Transportation: for example, pool tables, pianos, etc.
                            (Please ask if you need Extra-Large Item Packing and Moving.)
                            <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                        </div>
                        <div style="font-family: 'Roboto', sans-serif;">
                            <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=255&g=0&b=0"
                                alt="" style="font-family: 'Roboto', sans-serif;">
                            Customer responsible to hold the space for moving truck (if there is any parking ticket,
                            Customer is responsible to pay for it.)
                            <hr style="font-family: 'Roboto', sans-serif; border-top: none; border-color: #786fa6;">
                        </div>
                        <div style="font-family: 'Roboto', sans-serif;">
                            <img width="12" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-check-mark-1.png&r=255&g=0&b=0"
                                alt="" style="font-family: 'Roboto', sans-serif;">
                            Full-coverage insurance
                        </div>
                        <div class="clear" style="font-family: 'Roboto', sans-serif; clear: both; margin: 2px;"></div>
                    </div>
                </div>
            </body>
        </body>

        </html>
        `
    );
}
