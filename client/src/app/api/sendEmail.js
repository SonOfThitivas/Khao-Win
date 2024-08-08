import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // หรือบริการส่งเมลอื่นๆ
      auth: {
        user: 's6601012620054@email.kmutnb.ac.th',
        pass: 'Ramet06198',
      },
    });

    const mailOptions = {
      from: email,
      to: 'rametrree@gmail.com',
      subject: `Complaint from ${name}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
