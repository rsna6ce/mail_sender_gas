function doPost(e) {
  const SECRET_TOKEN = "your-secret-key"; 
  const ERROR_MSG = "Invalid access";

  try {
    const params = JSON.parse(e.postData.contents);
    
    const token   = params._token;
    const address = params._mailaddress;
    const title   = params._mailtitle;
    const message = params._mailmessage;

    if (token !== SECRET_TOKEN || !address || !title || !message) {
      throw new Error(ERROR_MSG);
    }

    MailApp.sendEmail({
      to: address,
      subject: title,
      body: message
    });

    return ContentService.createTextOutput(JSON.stringify({ "result": "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    throw new Error(ERROR_MSG);
  }
}
