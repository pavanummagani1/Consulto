import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
    try {
        const { amount, metadata } = req.body;
        
        // Validate input
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount), 
            currency: 'inr',
            automatic_payment_methods: {
                enabled: true,
            },
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

export default createPaymentIntent;