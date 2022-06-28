const nodemailer = require('nodemailer');
//HACK: creds hardcoded - big red flag! - remove and use api endpoint
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 465,
  secure: true,
  auth: {
    user: 'sarang@loopnotluck.com',
    pass: '0MU6cxAR5wYsvZFD',
  },
});

//Utility function to send email
//TODO: move html to config db or a lightweight cms
exports.sendEmail = ({ to, from, subject, message, firstName }) => {
  const mailOptions = {
    to,
    from,
    subject,
    html: `<html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
  
      <title>Loop Not Luck</title>
    </head>
  
    <body>
      <div text="#3b3f44" link="#0092ff">
        <table
          cellspacing="0"
          cellpadding="0"
          border="0"
          role="presentation"
          width="100%"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  role="presentation"
                  width="300"
                  style="table-layout: fixed; width: 600px"
                >
                  <tbody>
                    <tr>
                      <td valign="top">
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          role="presentation"
                        >
                          <tbody>
                            <tr>
                              <td align="center">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  role="presentation"
                                  width="100%"
                                  style="table-layout: fixed; width: 100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="background-color: #ffffff">
                                        <table
                                          width="100%"
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                        >
                                          <tbody>
                                            <tr>
                                              <th width="100%" valign="top">
                                                <table
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  border="0"
                                                  role="presentation"
                                                  width="100%"
                                                  style="
                                                    table-layout: fixed;
                                                    width: 100%;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                      <td valign="top">
                                                        <table
                                                          width="100%"
                                                          cellspacing="0"
                                                          cellpadding="0"
                                                          border="0"
                                                          role="presentation"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td align="center">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="347"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 347px;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        style="
                                                                          font-size: 0px;
                                                                          line-height: 0px;
                                                                        "
                                                                      >
                                                                      
                                                                        <div
                                                                          class="a6S"
                                                                          dir="ltr"
                                                                          style="
                                                                            opacity: 0.01;
                                                                     
                                                                          "
                                                                        >
                                                                          <div
                                                                            id=":15x"
                                                                            class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                                                                            role="button"
                                                                            tabindex="0"
                                                                            aria-label="Download attachment "
                                                                            data-tooltip-class="a1V"
                                                                            data-tooltip="Download"
                                                                          >
                                                                            <div
                                                                              class="akn"
                                                                            >
                                                                              <div
                                                                                class="aSK J-J5-Ji aYr"
                                                                              ></div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </th>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  role="presentation"
                                  width="100%"
                                  style="table-layout: fixed; width: 100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="background-color: #ffffff">
                                        <table
                                          width="100%"
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                        >
                                          <tbody>
                                            <tr>
                                              <th width="100%" valign="top">
                                                <table
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  border="0"
                                                  role="presentation"
                                                  width="100%"
                                                  style="
                                                    table-layout: fixed;
                                                    width: 100%;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                      <td valign="top">
                                                        <table
                                                          width="100%"
                                                          cellspacing="0"
                                                          cellpadding="0"
                                                          border="0"
                                                          role="presentation"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td align="center">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="285"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 285px;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="left">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        align="center"
                                                                        valign="top"
                                                                        style="
                                                                          color: #3b3f44;
                                                                          font-family: 'Poppins', sans-serif;
                                                                          font-size: 16px;
                                                                          line-height: 1.5;
                                                                          text-align: center;
                                                                        "
                                                                      >
                                                                        <div>
                                                                          <h1
                                                                            style="
                                                                              margin: 0;
                                                                              color: #1f2d3d;
                                                                              font-family: 'Poppins', sans-serif;
                                                                              font-size: 36px;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #ee2844;
                                                                                font-family: 'Poppins', sans-serif,
                                                                                  helvetica,
                                                                                  sans-serif;
                                                                              "
                                                                              >Welcome
                                                                              to
                                                                              Loop
                                                                              Not
                                                                              Luck!</span
                                                                            >
                                                                          </h1>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="left">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        align="center"
                                                                        valign="top"
                                                                        style="
                                                                          color: #3b3f44;
                                                                          font-family: 'Poppins', sans-serif;
                                                                          font-size: 16px;
                                                                          line-height: 1.5;
                                                                          text-align: center;
                                                                        "
                                                                      >
                                                                        <div>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #000000;
                                                                                font-family: 'Poppins', sans-serif;
                                                                                font-size: 17px;
                                                                              "
                                                                              >Hey
                                                                              ${firstName}, We are so excited to connect you to personalise career opportunities. Please click the button below to verify your email address.
                                                                             </span
                                                                            >
                                                                          </p>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="center">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="285"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 285px;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        height="23"
                                                                        align="center"
                                                                        valign="top"
                                                                        style="
                                                                          color: #3b3f44;
                                                                          font-family: 'Poppins', sans-serif;
                                                                          font-size: 16px;
                                                                          line-height: 1.5;
                                                                        "
                                                                      >
                                                                        <a
                                                                          style="
                                                                            font-style: normal;
                                                                            font-weight: normal;
                                                                            line-height: 1.15;
                                                                            text-decoration: none;
                                                                            border-style: solid;
                                                                            display: inline-block;
                                                                            background-color: #ee2844;
                                                                            border-color: #ee2844;
                                                                            border-radius: 4px;
                                                                            border-width: 0px;
                                                                            color: #ffffff;
                                                                            font-family: 'Poppins', sans-serif;
                                                                            font-size: 16px;
                                                                            height: 23px;
                                                                            padding-bottom: 12px;
                                                                            padding-left: 5px;
                                                                            padding-right: 5px;
                                                                            padding-top: 12px;
                                                                            width: 275px;
                                                                          "
                                                                          href=${message}
                                                                          ><p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                font-size: 20px;
                                                                              "
                                                                              ><strong
                                                                                >VERIFY
                                                                                YOUR
                                                                                EMAIL</strong
                                                                              ></span
                                                                            >
                                                                          </p></a
                                                                        >
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </th>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  role="presentation"
                                  width="100%"
                                  style="table-layout: fixed; width: 100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="background-color: #ffffff">
                                        <table
                                          width="100%"
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                        >
                                          <tbody>
                                            <tr>
                                              <th width="100%" valign="top">
                                                <table
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  border="0"
                                                  role="presentation"
                                                  width="100%"
                                                  style="
                                                    table-layout: fixed;
                                                    width: 100%;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        width="10"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                      <td valign="top">
                                                        <table
                                                          width="100%"
                                                          cellspacing="0"
                                                          cellpadding="0"
                                                          border="0"
                                                          role="presentation"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td align="left">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        align="center"
                                                                        valign="top"
                                                                        style="
                                                                          color: #3b3f44;
                                                                          font-family: 'Poppins', sans-serif;
                                                                          font-size: 16px;
                                                                          line-height: 1.5;
                                                                          text-align: center;
                                                                        "
                                                                      >
                                                                        <div>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #000000;
                                                                                font-family: 'Poppins', sans-serif;
                                                                                font-size: 17px;
                                                                              "
                                                                              >If the link above doesn't work, please copy and paste the following URL in to your browser:</span>
                                                                          </p>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #000000;
                                                                                font-family: 'Poppins', sans-serif;
                                                                                font-size: 17px;
                                                                              "
                                                                              >${message}</span
                                                                            >
                                                                          </p>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            &nbsp;
                                                                          </p>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                color: #000000;
                                                                                font-family: 'Poppins', sans-serif;
                                                                                font-size: 17px;
                                                                              "
                                                                              >If
                                                                              you
                                                                              have
                                                                              any
                                                                              questions,
                                                                              just
                                                                              reply
                                                                              to
                                                                              this
                                                                              email — we're
                                                                              always
                                                                              happy
                                                                              to
                                                                              help
                                                                              out.</span
                                                                            >
                                                                          </p>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            &nbsp;
                                                                          </p>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                font-family: 'Poppins', sans-serif;
                                                                                font-size: 17px;
                                                                              "
                                                                              >Best,</span
                                                                            >
                                                                          </p>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                font-family: 'Poppins', sans-serif;
                                                                                font-size: 17px;
                                                                              "
                                                                              >Loop
                                                                              Not
                                                                              Luck
                                                                              Team&nbsp;</span
                                                                            >
                                                                          </p>



                                                                          <table
                                                                          width="100%"
                                                                          cellspacing="0"
                                                                          cellpadding="0"
                                                                          border="0"
                                                                          role="presentation"
                                                                        >
                                                                          <tbody>
                                                                            <tr>
                                                                          <th width="100%" valign="top">
                                                                          <table
                                                                          cellspacing="0"
                                                                          cellpadding="0"
                                                                          border="0"
                                                                          role="presentation"
                                                                          width="100%"
                                                                          style="
                                                                            table-layout: fixed;
                                                                            width: 100%;
                                                                          "
                                                                        >
                                                                          <tbody>
                                                                            <tr>
                                                                              <td
                                                                                width="15"
                                                                                style="
                                                                                  font-size: 0px;
                                                                                  line-height: 1px;
                                                                                "
                                                                              >
                                                                                ­
                                                                              </td>
                                                                          <td valign="top">
                                                                        <table
                                                                        width="100%"
                                                                        cellspacing="0"
                                                                        cellpadding="0"
                                                                        border="0"
                                                                        role="presentation"
                                                                      >
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center">
                                                                              <table
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                                border="0"
                                                                                role="presentation"
                                                                                width="108"
                                                                                style="
                                                                                  table-layout: fixed;
                                                                                  width: 108px;
                                                                                "
                                                                              >
                                                                                <tbody>
                                                                                  <tr>
                                                                                    <td
                                                                                      height="5"
                                                                                      style="
                                                                                        font-size: 5px;
                                                                                        line-height: 5px;
                                                                                      "
                                                                                    >
                                                                                      ­
                                                                                    </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                    <td
                                                                                      style="
                                                                                        font-size: 0px;
                                                                                        line-height: 0px;
                                                                                      "
                                                                                    >
                                                                                      <img
                                                                                        src="https://ci4.googleusercontent.com/proxy/g9UgwNTSr8TimvGx-Wts9wU7DE2x8BOunUzhu3ytEYuAvCCDEAn70BTuR0aJANPNgyOJqG8gx_mIM01cjHaDNOxs8NBFlLwR53krf1NLW2aQmQzwMXhUY6YzuudF9Pug6U0xzAq7gmYTe2H6xLRMuEKQzWONGCTNUw4YodVcltJIxizLMXdppZNOd13hnyF_Fu9Fhzh3ZHt5FFR5vJl7ysLJPQmOTziBI6p_2SIhWNy_3dgewUQaDtSpTMxX2qXTeAV340OiPF9U5no4-LwOdhZjSYxHBL-rGKZ_CT2HQBYPK6bx5Ta5oN1KMfd3q1KFWf_-FwSkMY33xjAq814MXgCi90Vh-Y71YorP5PddJdzvGXYK7w7R6llLsG_i-xQAkIfl2DYRPafxV1HM4szwUrv_mUcN5cTLBn4yiwt5qPnpNkMxXZcRpw7iOPas0qCS3hMXFEYcXuA2Wf4Oe0QKT3zmEpHG7fc-A4OE6dN9HLS8m9Dji5f_vRIYU14ldMlYPN8PuKaQkDzEvOhenLzCmx38ArAX_zukX7bQgy5WdBLZW-WVIfAs3FWV0HkbgA3_Yk4jXPLD_YdjDL5uivE=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/46801f527d96781bea13f092735d771a2ccc167add5598cd8292fc110dcb2684.png?e=i7SmyCngJuvp6jg1E0Nkc_Hvb26wOi91hgWGQxJAyvSJk_5HgN2oz8P7HZ6V7yiprKsrcHlCYc74hcllEUWZvMsm92UOZ2oylzSXuAcMAIMSUONzIsN-Xb6B0NaJFJFuU4mfb04DsM3JXnPtERof5NrUXk31twaCXStcyKbShD5wxWTkTX_gynqB32JdCbCh7KuH5rsipueie3eLX0-pCmKluO4UFqSHjjMRDJm0BTMGcgQUz_xZ39hZ7-IWp5mMX2FmtpYq-I-jHrENOJA_-gCDnPEBB9yHEmObGL8Aj4ZqypDUv20G"
                                                                                        width="100%"
                                                                                        border="0"
                                                                                        style="
                                                                                          display: block;
                                                                                          width: 40%;
                                                                                          padding-left: 30px;
                                                                                        "
                                                                                        class="CToWUd"
                                                                                      />
                                                                                    </td>
                                                                                  </tr>
                                                                                </tbody>
                                                                              </table>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                      </td>
                                                                      <td
                                                                        width="15"
                                                                        style="
                                                                          font-size: 0px;
                                                                          line-height: 1px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </th>
                                                            </tr>
                                                            </tbody>
                                                            </table>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                      <td
                                                        width="10"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </th>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  role="presentation"
                                  width="100%"
                                  style="table-layout: fixed; width: 100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #eff2f7;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="background-color: #eff2f7">
                                        <table
                                          width="100%"
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                        >
                                          <tbody>
                                            <tr>
                                              <th width="100%" valign="top">
                                                <table
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  border="0"
                                                  role="presentation"
                                                  width="100%"
                                                  style="
                                                    table-layout: fixed;
                                                    width: 100%;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                      <td valign="top">
                                                        <table
                                                          width="100%"
                                                          cellspacing="0"
                                                          cellpadding="0"
                                                          border="0"
                                                          role="presentation"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td align="left">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        align="center"
                                                                        valign="top"
                                                                        style="
                                                                          color: #3b3f44;
                                                                          font-family: 'Poppins', sans-serif;
                                                                          font-size: 18px;
                                                                          line-height: 1.5;
                                                                          text-align: center;
                                                                        "
                                                                      >
                                                                        <div>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                                font-family: 'Poppins', sans-serif;
                                                                                font-size: 18px;
                                                                              "
                                                                              ><strong
                                                                                >Loop
                                                                                Not
                                                                                Luck
                                                                                Limited</strong
                                                                              ></span
                                                                            >
                                                                          </p>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="left">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        align="center"
                                                                        valign="top"
                                                                        style="
                                                                          color: #3b3f44;
                                                                          font-family: 'Poppins', sans-serif;
                                                                          font-size: 18px;
                                                                          line-height: 1.5;
                                                                          text-align: center;
                                                                        "
                                                                      >
                                                                        <div>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                              font-family: 'Poppins', sans-serif;
                                                                                font-size: 12px;
                                                                              "
                                                                              ><strong
                                                                                >64
                                                                                KNIGHTSBRIDGE,
                                                                                LONDON
                                                                                SW1X
                                                                                7JF</strong
                                                                              ></span
                                                                            >
                                                                          </p>
                                                                          <p
                                                                            style="
                                                                              margin: 0;
                                                                            "
                                                                          >
                                                                            <span
                                                                              style="
                                                                              font-family: 'Poppins', sans-serif;
                                                                                font-size: 12px;
                                                                              "
                                                                              ><strong
                                                                                ><a
                                                                                  href="https://loopnotluck.com/"
                                                                                  target="_blank"
                                                                                  data-saferedirecturl="https://www.google.com/url?q=https://loopnotluck.com/&amp;source=gmail&amp;ust=1654769236841000&amp;usg=AOvVaw0YY4wLD-3JEt56rbCvue03"
                                                                                  >https://loopnotluck.com/</a
                                                                                ></strong
                                                                              ></span
                                                                            >
                                                                          </p>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="center">
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="100%"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 100%;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        valign="top"
                                                                      >
                                                                        <table
                                                                          width="100%"
                                                                          cellspacing="0"
                                                                          cellpadding="0"
                                                                          border="0"
                                                                          role="presentation"
                                                                        >
                                                                          <tbody>
                                                                            <tr>
                                                                              <td
                                                                                align="center"
                                                                              >
                                                                                <table
                                                                                  cellspacing="0"
                                                                                  cellpadding="0"
                                                                                  border="0"
                                                                                  role="presentation"
                                                                                  width="129"
                                                                                  style="
                                                                                    table-layout: fixed;
                                                                                  "
                                                                                >
                                                                                 
                                                                                </table>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                    <tr>
                                                                      <td
                                                                        height="15"
                                                                        style="
                                                                          font-size: 15px;
                                                                          line-height: 15px;
                                                                        "
                                                                      >
                                                                        ­
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </th>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #eff2f7;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td align="center">
                                <table
                                  cellspacing="0"
                                  cellpadding="0"
                                  border="0"
                                  role="presentation"
                                  width="100%"
                                  style="table-layout: fixed; width: 100%"
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="background-color: #ffffff">
                                        <table
                                          width="100%"
                                          cellspacing="0"
                                          cellpadding="0"
                                          border="0"
                                          role="presentation"
                                        >
                                          <tbody>
                                            <tr>
                                              <th width="100%" valign="top">
                                                <table
                                                  cellspacing="0"
                                                  cellpadding="0"
                                                  border="0"
                                                  role="presentation"
                                                  width="100%"
                                                  style="
                                                    table-layout: fixed;
                                                    width: 100%;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                      <td valign="top">
                                                        <table
                                                          width="100%"
                                                          cellspacing="0"
                                                          cellpadding="0"
                                                          border="0"
                                                          role="presentation"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td>
                                                                <table
                                                                  cellspacing="0"
                                                                  cellpadding="0"
                                                                  border="0"
                                                                  role="presentation"
                                                                  width="570"
                                                                  style="
                                                                    table-layout: fixed;
                                                                    width: 570px;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        valign="top"
                                                                      >
                                                                        <table
                                                                          width="100%"
                                                                          cellspacing="0"
                                                                          cellpadding="0"
                                                                          border="0"
                                                                          role="presentation"
                                                                        >
                                                                          <tbody>
                                                                            <tr>
                                                                              <td
                                                                                align="center"
                                                                                style="
                                                                                  display: inline-block;
                                                                                "
                                                                              >
                                                                                <table
                                                                                  cellspacing="0"
                                                                                  cellpadding="0"
                                                                                  border="0"
                                                                                  role="presentation"
                                                                                  width="570"
                                                                                  style="
                                                                                    table-layout: fixed;
                                                                                    width: 570px;
                                                                                  "
                                                                                >
                                                                                  <tbody>
                                                                                    <tr>
                                                                                      <td
                                                                                        height="15"
                                                                                        width="185"
                                                                                        style="
                                                                                          font-size: 15px;
                                                                                          line-height: 15px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                      <td
                                                                                        height="15"
                                                                                        style="
                                                                                          font-size: 15px;
                                                                                          line-height: 15px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                      <td
                                                                                        height="15"
                                                                                        width="185"
                                                                                        style="
                                                                                          font-size: 15px;
                                                                                          line-height: 15px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                      <td
                                                                                        width="185"
                                                                                        style="
                                                                                          font-size: 0px;
                                                                                          line-height: 1px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                      <td>
                                                                                        <table
                                                                                          width="100%"
                                                                                          cellspacing="0"
                                                                                          cellpadding="0"
                                                                                          border="0"
                                                                                          role="presentation"
                                                                                        >
                                                                                          <tbody>
                                                                                            <tr>
                                                                                              <th
                                                                                                width="40"
                                                                                                valign=""
                                                                                              >
                                                                                                <table
                                                                                                  cellspacing="0"
                                                                                                  cellpadding="0"
                                                                                                  border="0"
                                                                                                  role="presentation"
                                                                                                  width="100%"
                                                                                                  style="
                                                                                                    table-layout: fixed;
                                                                                                    width: 100%;
                                                                                                  "
                                                                                                >
                                                                                                  <tbody>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 0px;
                                                                                                        "
                                                                                                      >
                                                                                                        <a
                                                                                                          href="https://cifaiij.r.af.d.sendibt2.com/tr/cl/DkmGlsdEZ3xiQJ7TvppIUFrGkBe6CMDyJQblNr-08Io48-O7VG7AULVni-uKvmqDS-MYrKbNE9yTxpQ7bQKFxjbHDMThcMl6T1wbCXl5WkkpZKQQ9c7qEFICW3ZkZrY4uJUPa1V8ImKsrkLhP4zPDsf8kBoBqSDAqSNHyC_jmWzP2GyY0ic6rFLefftAfVKhMIX475Wk3EjIwjC8KbExzxXPR2XN9rmt6DcDdA0Aa06gY0r0OpvLsXmkHg"
                                                                                                          style="
                                                                                                            color: #0092ff;
                                                                                                            text-decoration: underline;
                                                                                                          "
                                                                                                          target="_blank"
                                                                                                          data-saferedirecturl="https://www.google.com/url?q=https://cifaiij.r.af.d.sendibt2.com/tr/cl/DkmGlsdEZ3xiQJ7TvppIUFrGkBe6CMDyJQblNr-08Io48-O7VG7AULVni-uKvmqDS-MYrKbNE9yTxpQ7bQKFxjbHDMThcMl6T1wbCXl5WkkpZKQQ9c7qEFICW3ZkZrY4uJUPa1V8ImKsrkLhP4zPDsf8kBoBqSDAqSNHyC_jmWzP2GyY0ic6rFLefftAfVKhMIX475Wk3EjIwjC8KbExzxXPR2XN9rmt6DcDdA0Aa06gY0r0OpvLsXmkHg&amp;source=gmail&amp;ust=1654769236841000&amp;usg=AOvVaw2BrWfs-1pOSvoWA7qE4-oA"
                                                                                                        >
                                                                                                          <img
                                                                                                            src="https://ci5.googleusercontent.com/proxy/k9-5iOE0P8Uq39-K3G6S0X7OWfw8xWVow9fAEkNiP0S20jBfWHaqGV0e-FF3ructnMhlw1aWOkJQiZ7dL9LAtuo4tPzFI7o6RwPblom8koO-okfBtTgeNAo6Klr-yN9Sw3c8LuVQxi-ee7TtgZ__SX7mKbDdjxkBEda1Smw83royBQ0q8w_4OPN_lDHVu7ucukHblSZRq9s2aU9Th9iQVTEB7yS_-YT84jTMF9fvPtXAuLBN9ZH2qa8EAmeKJ-tzNkZy4j4nGCNo7VZQSecpHWBUfpCMAyZ0Tk-6RGiUUBZO4s2UypdUejG5PDEOEaNOfbu7zATdklEEdJDRXN2H5K3Pj03ls6QPO_YhTxdMC-CKNxAQRSNv2DiEFpEFJMP1lCQt6jWopvQgeOpahbU5iF2TxMyi1f-S4rjqlkpLcoFvOXXa2UNwjyQp0arkuZiq2OvLq-FvWIIRnZzrMAJZ9mroziDQKN2jxhuQxJXiG0-VJy7SqjgNQ8mPQkSPJqW3tfqlmQe_Z88aCemVdsOHb4MGhsRO5Zx6SKsHA3iGjyt-zg81IrHa4genGlbFMVPjlK-owIhJidqNsj5SJh1wXLPyV3s=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/a2d5caff7e377d05111f103275c69c8f6916cb599236855b93da7cdc776148a0.png?e=hTq1i5P29UrTk-WI5Iu3z6RrtfPGriRDVceAYr-hq0y0__RBRZFIMLOJU3Jy0x7iComefqh-rmN8Gzrm3rWKTIKNScqfNLu4D0e_vTJWPDM7rA1AEAi1EHeBlFfajlxPRtaCiERcKZhdxo7-iBfz27GfwMSWx7UpTcBJSHVTUBOmk7ZA_HbFtcfs86QI9q-_6gs0XaT355Wvv0CXg1Gd8m9RWabs8zjyg5OBbUDhFwTPJm97gQ146OybUvm6jYvCptTs-DTFfBeTx5DJuSKL_e5IN0GR-6nWsOyQDAHhJy0cZLzabqLy8_4A-g"
                                                                                                            width="32"
                                                                                                            border="0"
                                                                                                            style="
                                                                                                              display: block;
                                                                                                              width: 100%;
                                                                                                            "
                                                                                                            class="CToWUd"
                                                                                                        /></a>
                                                                                                      </td>
                                                                                                      <td
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 1px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                  </tbody>
                                                                                                </table>
                                                                                              </th>
                                                                                              <th
                                                                                                width="40"
                                                                                                valign=""
                                                                                              >
                                                                                                <table
                                                                                                  cellspacing="0"
                                                                                                  cellpadding="0"
                                                                                                  border="0"
                                                                                                  role="presentation"
                                                                                                  width="100%"
                                                                                                  style="
                                                                                                    table-layout: fixed;
                                                                                                    width: 100%;
                                                                                                  "
                                                                                                >
                                                                                                  <tbody>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 0px;
                                                                                                        "
                                                                                                      >
                                                                                                        <a
                                                                                                          href="https://cifaiij.r.af.d.sendibt2.com/tr/cl/p33R-72XLzS_yI01DX5VACbE00zsxr9SuZeh4DcASBlo_XIEyvPillHnp49J3Ii66kyoPD9ReTSZachMce9PRerBEYe_-HbTMyQoB7QG9XY5AzGeQfWK9FJlrkfV6HZfWhNjKqzisyNMjnEza9XtdGfSiQKSi7B1YuzSs7Mtzzto3zZcT5i6r05oni4pHPd_766EJal2SVm0NclAEk54kuzqwoWn867fcw85BIzdSx3ceCP3h51UeK9Fd2LjrZJLHqplng"
                                                                                                          style="
                                                                                                            color: #0092ff;
                                                                                                            text-decoration: underline;
                                                                                                          "
                                                                                                          target="_blank"
                                                                                                          data-saferedirecturl="https://www.google.com/url?q=https://cifaiij.r.af.d.sendibt2.com/tr/cl/p33R-72XLzS_yI01DX5VACbE00zsxr9SuZeh4DcASBlo_XIEyvPillHnp49J3Ii66kyoPD9ReTSZachMce9PRerBEYe_-HbTMyQoB7QG9XY5AzGeQfWK9FJlrkfV6HZfWhNjKqzisyNMjnEza9XtdGfSiQKSi7B1YuzSs7Mtzzto3zZcT5i6r05oni4pHPd_766EJal2SVm0NclAEk54kuzqwoWn867fcw85BIzdSx3ceCP3h51UeK9Fd2LjrZJLHqplng&amp;source=gmail&amp;ust=1654769236842000&amp;usg=AOvVaw0MUD2U_E6CPySdk3-RMVG2"
                                                                                                        >
                                                                                                          <img
                                                                                                            src="https://ci4.googleusercontent.com/proxy/2cTt7QvPE16FzFxy6XPQOyJRTxBH7sGMmHpL7IoEXEAVUaom1nhYbfVEi5DnU0JjxM2n-fflrdjxagFy59IMG6v0EW33YJHI17iEA6HqK_mPX6NkEqCMX-1kmNRQUOro5bX4dhwqEf_OOMkYjkIVunbiRrcIsmTbgQdSKg8bfmtM6O7YyL1uAF8CfyvcvVGNKmdIlcGkyeSgl2mpIVtxMSm781BZslWeIBPDqFaLrxuovOBoL37IIRA6SpO4wPVZqD3Pbn4CjATc1yA0HfuzPOvlYSAO40Pb9v9mbWFo880DcLFxjDEZWwqqU6SEh7FBGzaOVd9jNNZQ0ccuXXr4DAm5MYglBpimSAd7M-1x-IT0uFAHl2U62qp4OQnbXro0JAY0sVbkeyKmVdUN1JLlwHRDH2NvgapPPVbZDCIrJmQv6MYMumj005QhJHvcsCqUdtCBUoVEHMGSgZE3LN2QC0i3I8rfXUi2c-inHYGN7mDFgyJtacNL9l18IW-GCXkIT6eJS4PYrKtAL0pP3f7hsXGxhX6LVKS6mTngyuLnL_Bjre6mPZ9-GwKeU0fY5fgAkQHP1bf548mimm2Q-xKz-u6U=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/63cf2dabbe7ba6fd26c2e23680b2ff93027553816a8d4d3908d53a3fbe9d2c8b.png?e=FOPo2iYEh_vhknI0r5kCJw0p3Ot8q_Rv_XXeparUX34qxJTEdHY3Gbbs-5nPUezkpXiEdaZ33MaxFkwSfn2RZzJSds0hMGwnxVHdyhab5imytW3MRYQ8g1606pDOMIz3uD8MaO3VmmYxFg5-CLg7BuJg8USkjYVGytK2r5suzeKBl1ceJHGyFrCoS2j58pNGEfCf0YkxolBBzywUgDoiraQbbWAKCXfPbbKmq-zgHfTsAnNM2x-p_0d3yxOw21C09QV9ecnA3Y2mKHwPtYIJJ8z6cH_QIX3drcZIxOxlx_g4Ga1WrZD1zL17"
                                                                                                            width="32"
                                                                                                            border="0"
                                                                                                            style="
                                                                                                              display: block;
                                                                                                              width: 100%;
                                                                                                            "
                                                                                                            class="CToWUd"
                                                                                                        /></a>
                                                                                                      </td>
                                                                                                      <td
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 1px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                  </tbody>
                                                                                                </table>
                                                                                              </th>
                                                                                              <th
                                                                                                width="40"
                                                                                                valign=""
                                                                                              >
                                                                                                <table
                                                                                                  cellspacing="0"
                                                                                                  cellpadding="0"
                                                                                                  border="0"
                                                                                                  role="presentation"
                                                                                                  width="100%"
                                                                                                  style="
                                                                                                    table-layout: fixed;
                                                                                                    width: 100%;
                                                                                                  "
                                                                                                >
                                                                                                  <tbody>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 0px;
                                                                                                        "
                                                                                                      >
                                                                                                        <a
                                                                                                          href="https://cifaiij.r.af.d.sendibt2.com/tr/cl/sjKrtUV1dF5Ms1byEQCsxi36EM7p3jX9BZ2olI3OO8d33Z4-4OSHluy41o4XMnZj8RTV11VzqGvbg7GwKmAQy76-JltPgNBkFidwmKQCKSRucfCKLtiwiWrZ8ym6suvX-v2oAR1eEkV55lgaGf0B7fzOCAX3DmtN4l_Z-IQWndTjFnGXUOsLj3Xl6Slv8aMK2ZMXq9UJni-cr8qV-dU39yJQ8wrsOcOEu9y9VvX3xJJGrA"
                                                                                                          style="
                                                                                                            color: #0092ff;
                                                                                                            text-decoration: underline;
                                                                                                          "
                                                                                                          target="_blank"
                                                                                                          data-saferedirecturl="https://www.google.com/url?q=https://cifaiij.r.af.d.sendibt2.com/tr/cl/sjKrtUV1dF5Ms1byEQCsxi36EM7p3jX9BZ2olI3OO8d33Z4-4OSHluy41o4XMnZj8RTV11VzqGvbg7GwKmAQy76-JltPgNBkFidwmKQCKSRucfCKLtiwiWrZ8ym6suvX-v2oAR1eEkV55lgaGf0B7fzOCAX3DmtN4l_Z-IQWndTjFnGXUOsLj3Xl6Slv8aMK2ZMXq9UJni-cr8qV-dU39yJQ8wrsOcOEu9y9VvX3xJJGrA&amp;source=gmail&amp;ust=1654769236842000&amp;usg=AOvVaw0FkIboCd8Md9pRgNa4yobm"
                                                                                                        >
                                                                                                          <img
                                                                                                            src="https://ci5.googleusercontent.com/proxy/c4sBVFLQc2TvneiQjmCVx_6yyBX8fTh6EUieS3eyvpPl8T05rncUpmT24M8g-5gy31NI4NHTNom37QPfCSuXU_qldfwarEuvkA-drbv8cNm0JLLcSYNeyOuVyhxXi1DfwrfTGfHXEPjnuyuk3QNtcnWGy30etotkl42N2H-ZwmcgVow7oZjwZRCcbTQmCNpQ1utVu8mtX8UmeQWhnmntIogDjvSttiIa43xaP6w5wog7D0xqo9HHTYO6OOBYfkDlC6G__1brvpV7Pp-PyV-Ga6s1fpIol6mT12Fe3Ca04WMoIsQy1zMmkqoM3XMCmRMJ9UhLPzc8maXFR3rHXRIiPsmhEr9ERtZxXBvkobCFdxQJi9xUP41AWuDtkFNv3iwjrTZ_Hkpr1q6TSM_HYV4iy9qTrmOpEF5AOefWIm78cbCp0yJipz-U8j1YY5OAgmNgMNvTNCw89VonKSHR-QwEY7daunxHslHUrE0B7QZKrdscWX8mXUoKm_mNg5_ln1aZi49LVRDRFvZJ8iQD5_FNP2g6IUDLWLdghXUcWIPn5UcohbVSL9D561GAXDNtDXpH5y3cbXT-wh6rhspyuXzm__c=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/0f1ede85808ede41fa5156c912b4cc3299878645005cc9f839215bdfaea977a4.png?e=4SXEq481nFRsHV65QcG4bfw2uERu4_SuOGpHkf09ZzLpfClQiT5ZDhYnvC1MfFsrTgoyE51kq6bWVfV_JQ4hXzmA6vXawWXFNNKX2-Fg0-3Ur6eFi0NEp2WDKo8egiSwNBA-Lh0Sqe06SMhwV_DxgCKC-63NPM7etzH4qK0HfStV6mho672tFOuzmekT3oE2ppHCTt6hy2-2cV-pskCeEct44Oo9ZROu_NrFkqhWVEirR3kw3LvqBMZ5qdMwxZPSxCojR3GVTEj1smp8ZZNwv9xX4h7A94KtwXhaW_u4UhqPWVlx8gBnyco"
                                                                                                            width="32"
                                                                                                            border="0"
                                                                                                            style="
                                                                                                              display: block;
                                                                                                              width: 100%;
                                                                                                            "
                                                                                                            class="CToWUd"
                                                                                                        /></a>
                                                                                                      </td>
                                                                                                      <td
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 1px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                  </tbody>
                                                                                                </table>
                                                                                              </th>
                                                                                              <th
                                                                                                width="40"
                                                                                                valign=""
                                                                                              >
                                                                                                <table
                                                                                                  cellspacing="0"
                                                                                                  cellpadding="0"
                                                                                                  border="0"
                                                                                                  role="presentation"
                                                                                                  width="100%"
                                                                                                  style="
                                                                                                    table-layout: fixed;
                                                                                                    width: 100%;
                                                                                                  "
                                                                                                >
                                                                                                  <tbody>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 0px;
                                                                                                        "
                                                                                                      >
                                                                                                        <a
                                                                                                          href="https://cifaiij.r.af.d.sendibt2.com/tr/cl/_z-JzA19cvQDFlNa-vbHRx3K4NCyDoxL8-OJL3A2CCq4w2iBiXRyBRplySKpso6ZWUwTArl8nEbH0qIE9DasMLp1ja2ms5X03BaU0aTTU7cpXA9yMfAra4SvhnnIkJQHwm8apyo_b3FToeZH3yfFuIRTp9gLcIZTD5SQW5XS3bHC_kIxuKUPhaK3dGYYD0ka8e_BBbI9KVlewmkmIS-F5cZ1a_KchksBIvIEKLptfyoN1aKSFlLWkUsw"
                                                                                                          style="
                                                                                                            color: #0092ff;
                                                                                                            text-decoration: underline;
                                                                                                          "
                                                                                                          target="_blank"
                                                                                                          data-saferedirecturl="https://www.google.com/url?q=https://cifaiij.r.af.d.sendibt2.com/tr/cl/_z-JzA19cvQDFlNa-vbHRx3K4NCyDoxL8-OJL3A2CCq4w2iBiXRyBRplySKpso6ZWUwTArl8nEbH0qIE9DasMLp1ja2ms5X03BaU0aTTU7cpXA9yMfAra4SvhnnIkJQHwm8apyo_b3FToeZH3yfFuIRTp9gLcIZTD5SQW5XS3bHC_kIxuKUPhaK3dGYYD0ka8e_BBbI9KVlewmkmIS-F5cZ1a_KchksBIvIEKLptfyoN1aKSFlLWkUsw&amp;source=gmail&amp;ust=1654769236842000&amp;usg=AOvVaw3KoSfBtZB1R3ZDKAckwDSc"
                                                                                                        >
                                                                                                          <img
                                                                                                            src="https://ci6.googleusercontent.com/proxy/SyeRvA_cAZTIeN-8ITtcgZ8NstVyGBy-Rj9E48P449L27Dpfubr0P4X1rbdbvU2Cqsoq7yznSywgwG6SqMxWUXVa8Ozm3UcSTwsYBaBQW5L5Jgx3IOafJV-i9A4VlHN1W6-002_GhiRiZE-hOr-FKPRJpENU6iaAFGgNssOJSdd8ML9TBR7WsZwnbv3HIgwAkFj1OiDVVzgNnzUF3EUnCcKJ5Ys-XWeu-WyMV7GOs8PRSHpJQe-nUW1BD-yhSsh0-1nIxECT7trCjzV4bwSFQ0Ve2_t5EnK5aYlothKx83FfLl3oqCGaNgZMQVBzsHO2jnXdwIRoCo-mG8BFL8ePGzoZiqF6lztseibflF1zdv3rkmXGBThdgyi8EwMt3SO1DbCSAybDpw7yMR1e9OblES-zHyb_oaCv4fIB0Mm8zbo-WHHRGIRxmPdextuerwUieeDA1VHNZd13Dm_SbQKh_fF85Qe_VUElf-8UOKsqMEe1m8onQxiel07OCjtSRceXCq-MeIAcK5YCRicLcx8lSX3IQCff7WQqxOAgoiQIOviUrGUJ9nRfUB6Yimr9dsDaK7cQYgdFvEGFDKOGU81XkqIG=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/5e5e1e9e21cb2d5359434d35457ee2a338c8511599d99d8f1fe1c9d1080fab19.png?e=O2AzPMmkvCX-Wfkc2D3rVF6U3tySCwMxo29f516V0Dq7nGpCFyWodqqMxUOapW8YtgYBtsWbZU5ElyCG3Ka-f4ds2F5GjPOo0cSJdmBepxAcEkFlOnXjZkaQdAoj_537oMu7SNFAYVCyGRSyRV0fly7KNKqo-x9IY56Ek1aLFaQpk2s2Q0-c6UMHSlc8076WsiaW3g6nQ4sj2-jVQcWnhQvzVt98CG61iNxDRWQIfYR4C7PMydqmx0K63YeWbO3tHQEy41suvHtWjAt0FsmK-QZ7JXDLpVaJO45NtMkGxQpPZ9GcNUdvsV4a"
                                                                                                            width="32"
                                                                                                            border="0"
                                                                                                            style="
                                                                                                              display: block;
                                                                                                              width: 100%;
                                                                                                            "
                                                                                                            class="CToWUd"
                                                                                                        /></a>
                                                                                                      </td>
                                                                                                      <td
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 1px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                  </tbody>
                                                                                                </table>
                                                                                              </th>
                                                                                              <th
                                                                                                width="40"
                                                                                                valign=""
                                                                                              >
                                                                                                <table
                                                                                                  cellspacing="0"
                                                                                                  cellpadding="0"
                                                                                                  border="0"
                                                                                                  role="presentation"
                                                                                                  width="100%"
                                                                                                  style="
                                                                                                    table-layout: fixed;
                                                                                                    width: 100%;
                                                                                                  "
                                                                                                >
                                                                                                  <tbody>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 0px;
                                                                                                        "
                                                                                                      >
                                                                                                        <a
                                                                                                          href="https://cifaiij.r.af.d.sendibt2.com/tr/cl/bp5YBPO1iwWJ68_JGeXygsk1C0s2bSDxNk_YL-F424qEzIpPPA_XHjZ4l1Higm48Mj2QmBdSEz9jAh-Lxuw9wHn0VlLjjFs7_72RCF8KgOljIaYK9uwm1ceThjXxRd-dEKbwD0HQrxm5MXm8N2ZIZhx_Koz7AiEQTSzIOqDGoLsXqf7fCRza9YZ2ABTAqsqQ50BdgmFFW1WUxXgMPkKpA3MCcYkSQb6eqFtEsPvzPi24Sc4nw0KYiw"
                                                                                                          style="
                                                                                                            color: #0092ff;
                                                                                                            text-decoration: underline;
                                                                                                          "
                                                                                                          target="_blank"
                                                                                                          data-saferedirecturl="https://www.google.com/url?q=https://cifaiij.r.af.d.sendibt2.com/tr/cl/bp5YBPO1iwWJ68_JGeXygsk1C0s2bSDxNk_YL-F424qEzIpPPA_XHjZ4l1Higm48Mj2QmBdSEz9jAh-Lxuw9wHn0VlLjjFs7_72RCF8KgOljIaYK9uwm1ceThjXxRd-dEKbwD0HQrxm5MXm8N2ZIZhx_Koz7AiEQTSzIOqDGoLsXqf7fCRza9YZ2ABTAqsqQ50BdgmFFW1WUxXgMPkKpA3MCcYkSQb6eqFtEsPvzPi24Sc4nw0KYiw&amp;source=gmail&amp;ust=1654769236842000&amp;usg=AOvVaw0TLXGX1xRnOVm16H3d5zuX"
                                                                                                        >
                                                                                                          <img
                                                                                                            src="https://ci3.googleusercontent.com/proxy/kz-kex_ReEaGwefA9qIR3uDMNbhpQFKl8N_IeEPXfzai-ooh651275j_cy57HdtslOXi4yp6O6VUk3uDIWFfekmCdWpel1DbLIsSeDnhQDI9GtVXeSvLthnVMISMpYcMZE_QtlAS3ujVMqB4wzItLXwDn7w4PxJbgV0fTbc_REVoId47hz2g3e12F3e-4jy_rTEOc5apl2oY9yXQu-DFf7Fn7j3o_XRLsICdxRIbskc74Tzk7mw8kdbuuL0Tyvq62hhGbRzNrWSV6LhGGUZxG1LAOhFOxzAcVHqEPCbQ2cChtH4LJnA69nGn-FMifzDCbZrWEsaAgFXeBwcKIt0kfBC4hyIs_sXJmy0xnkWKqJyoZSpnsux7XGql6Bia87_N7QyvdSVOOTYTZPVUtwCj8YpjWfaBMzJx7F7ftQsmrliZIdVPQg-LVpLj43eqcKZIyFft26ID4CkYkXVm4KI8lPD7gaKf3EKi9Tm7LAYUrTqHm-qVQIf4hJ15RtGtqfzSi_hlX35v9lM5gTXcI9jbpZxr3mTllzMTCIBEORFnARasU9h1fLkAHy_UTZhAl_BAFRuaiIL0ZK2PtihXo6cmwQ=s0-d-e1-ft#https://4swyx.img.bh.d.sendibt3.com/im/2850889/d89706b2c58dd898e441f665d1f7cf35f38b7d4ca791afc6c652a9fe5995c0c5.png?e=ynHE-c08hiO-VF2OJTOk6wzfoRJ4AL_OXDf1VuTqUbPMLtf2QpGkt8Fi0BY36Lk3l-0mx3WNplBz8bLDQOT7nDiX1PxvpR9JJxlplFv6D6PAyjuULfb60uoUL2_4c5mX_nKbGNn0JdftuwlxdLwyJHa6eOWlLcFaQtDuDJIZ5GbtIiJdefjgWkYECoKBnvbCAJxOPkQ6Q7RP54lx4lehmxNfRFr_noIeahtbRx-EOq7fYyEVHpI74YvhzNCQE2dO4yTvJOGk1Z9QKilBLRe6oqir0m_39f5ZFrc82q7cIKw8fFztw580hg"
                                                                                                            width="32"
                                                                                                            border="0"
                                                                                                            style="
                                                                                                              display: block;
                                                                                                              width: 100%;
                                                                                                            "
                                                                                                            class="CToWUd"
                                                                                                        /></a>
                                                                                                      </td>
                                                                                                      <td
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 0px;
                                                                                                          line-height: 1px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                      <td
                                                                                                        height="5"
                                                                                                        width="8"
                                                                                                        style="
                                                                                                          font-size: 5px;
                                                                                                          line-height: 5px;
                                                                                                        "
                                                                                                      >
                                                                                                        ­
                                                                                                      </td>
                                                                                                    </tr>
                                                                                                  </tbody>
                                                                                                </table>
                                                                                              </th>
                                                                                            </tr>
                                                                                          </tbody>
                                                                                        </table>
                                                                                      </td>
                                                                                      <td
                                                                                        width="185"
                                                                                        style="
                                                                                          font-size: 0px;
                                                                                          line-height: 1px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                      <td
                                                                                        height="15"
                                                                                        width="185"
                                                                                        style="
                                                                                          font-size: 15px;
                                                                                          line-height: 15px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                      <td
                                                                                        height="15"
                                                                                        style="
                                                                                          font-size: 15px;
                                                                                          line-height: 15px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                      <td
                                                                                        height="15"
                                                                                        width="185"
                                                                                        style="
                                                                                          font-size: 15px;
                                                                                          line-height: 15px;
                                                                                        "
                                                                                      >
                                                                                        ­
                                                                                      </td>
                                                                                    </tr>
                                                                                  </tbody>
                                                                                </table>
                                                                              </td>
                                                                            </tr>
                                                                          </tbody>
                                                                        </table>
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                      <td
                                                        width="15"
                                                        style="
                                                          font-size: 0px;
                                                          line-height: 1px;
                                                        "
                                                      >
                                                        ­
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </th>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        height="20"
                                        style="
                                          font-size: 20px;
                                          line-height: 20px;
                                          background-color: #ffffff;
                                        "
                                      >
                                        ­
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <img
          width="1"
          height="1"
          src="https://ci3.googleusercontent.com/proxy/QQO8EHE3HC3-CJp5I7ChvVVCVgtC0InUuChb2vFWRk_cWgyaPw0VdvyYz32-ekwvd0-jlAM4EvnilenYxwoY-88dQVAPP2OcYWdTfcqTGPmQC4Z6IV3rXZmlrmwDRBNiSNcO8vvVC1yc8TzTgGvZVlt9E2pb7HZEbWRlDNfntFoXxq6kjh7IgXqEVcEl29_KYXgDOO2QmNlLW6mM0lqs800ml71ibZRwrt91DWO4Uybs5f4ilmRoxQpry4jZG27d-eLFHyDVesGZQdq2CKwmaNRP02Nns8oba0geIwbxxONKFrRlrBJx0dEF=s0-d-e1-ft#https://cifaiij.r.af.d.sendibt2.com/tr/op/J--XIZ7ScoGSTBtdv6yVyiS2BTOJ8ujgaDvuXxnOY3oiioKVyblFRWLvDb32nSk1bMM712hdrOOsYxQGDJbdg3pXKA0V9Xa5l_G8KJ6s9vFjWIL8a5lquVMWFVNKxDnD1GoytdCMly85JTHZLt0mqn3Xwp3r1ijf5vdEen3B3B2U"
          alt=""
          class="CToWUd"
        />
      </div>
    </body>
  </html>
  `,
    // text: message,
  };

  return transporter.sendMail(mailOptions);
};
