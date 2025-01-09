import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
        }

        const msg = {
            to: 'khaowinreport@gmail.com',
            from: 'khaowinreport@gmail.com', // ต้องเป็นอีเมลที่ยืนยันแล้วใน SendGrid
            subject: `Complaint from ${name}, ${email}`,
            text: message,
            html: `<p>${message}</p>`,
        };

        await sgMail.send(msg);
        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error.response?.body?.errors || error.message);
        return new Response(JSON.stringify({ error: 'Failed to send email.' }), { status: 500 });
    }
}
