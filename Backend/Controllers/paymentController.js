import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Payment Intent Creation
export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, metadata } = req.body;
        
        // Validate amount exists and is a number
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        // Convert amount to paise and validate minimum
        const amountInPaise = Math.round(amount);
        const minimumAmount = 5000; // ₹50.00 (5000 paise)
        
        if (amountInPaise < minimumAmount) {
            return res.status(400).json({
                error: "Amount too small",
                details: `Minimum payment is ₹50.00 (received ₹${amount/100})`
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInPaise,
            currency: 'inr',
            automatic_payment_methods: { enabled: true },
            metadata: {
                userId: req.user?.userid || 'guest',
                ...metadata
            }
        });

        res.status(200).json({ 
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error("Payment intent error:", error);
        res.status(500).json({ 
            error: "Payment processing failed",
            details: error.message 
        });
    }
};

// Webhook Handler
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!', paymentIntent.id);
            break;
        case 'payment_intent.payment_failed':
            const failedIntent = event.data.object;
            console.log('Payment failed:', failedIntent.id);
            break;
        // Add more event types as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
};