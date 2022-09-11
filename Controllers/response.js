const db = require("../Model/index");
const records = db.responses;
const nodemailer = require("nodemailer");
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;
const { log } = console;

exports.responseController = {
	recordResponse: async (req, res) => {
		try {
            const record = req.body;
            const records = await records.create(record);
            await this.sendMail(record);
            res.status(200).send({
                status: "success",
                massage: "record submitted successfully",
                data: data,
            });
		} catch (error) {
			log(error);
			return res.status(400).send({
				status: "error",
				error,
			});
		}
	},
	sendMail: async (user) => {
		try {
			const transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: myEmail,
					pass: myPassword,
				},
			});
			var mailOptions = {
				from: myEmail,
				to: user.email,
				subject: "Thank you",
				html: `
          <!doctype html>
          <html lang="en-US">
      
          <head>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <title>From Faruk</title>
              <meta name="description" content="Form completion mail.">
              <style type="text/css">
                  a:hover {text-decoration: underline !important;}
              </style>
          </head>
      
          <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
              <!--100% body table-->
              <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                  <tr>
                      <td>
                          <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                              align="center" cellpadding="0" cellspacing="0">
                              <tr>
                                  <td style="height:80px;">&nbsp;</td>
                              </tr>
                              <tr>
                              <td style="text-align:center;width: max-content;background-color: #000;padding: 5px;">
                                  <a href="${process.env.FRONT_END_DOMAIN}" title="logo" target="_blank">
                                      <p>Faruk</p>
                                  </a>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="height:20px;">&nbsp;</td>
                              </tr>
                              <tr>
                                  <td>
                                      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                          style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                          <tr>
                                              <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                          <tr>
                                              <td style="padding:0 35px;">
                                                  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Your message was sent</h1>
                                                  <span
                                                      style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                      Dear ${user.fullName}, <br> Your message has been sent, I will get back to you as soon as I can, Thank you.  
                                                  </p>
                                                  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                      Kindly click the button to access the details and save as pdf 
                                                  </p>
                                                  <a href="${process.env.FRONT_END_DOMAIN}"
                                                      style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Visit site
                                                      </a>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                      </table>
                                  </td>
                              <tr>
                                  <td style="height:20px;">&nbsp;</td>
                              </tr>
                              <tr>
                                  <td style="text-align:center;">
                                      <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>${process.env.FRONT_END_DOMAIN}</strong></p>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="height:80px;">&nbsp;</td>
                              </tr>
                          </table>
                      </td>
                  </tr>
              </table>
              <!--/100% body table-->
          </body>
          </html>
                    `,
			};

			transporter.sendMail(mailOptions, async function (error, info) {
				if (error) {
					log(error);
					return;
				}
				log("Email sent: " + info.response);
				return;
			});
		} catch (error) {
			log(error);
			return;
		}
	},
};
