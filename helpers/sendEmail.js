import 'dotenv/config';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (data) => {
  const email = { ...data, from: 'anastasiia.kushch02@gmail.com' };
  await sgMail.send(email);
};
